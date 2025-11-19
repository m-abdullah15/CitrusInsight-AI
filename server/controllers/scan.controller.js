import Scan from '../models/Scan.js';
import { uploadImage } from '../services/cloudinary.service.js';
import { predict } from '../services/huggingface.service.js';
import { getTreatment } from '../services/treatment.service.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Upload and predict citrus disease from image
 * @route POST /api/scans/upload
 * @access Private
 */
export const uploadAndPredict = async (req, res) => {
  let tempFilePath = null;
  
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided. Please upload an image.',
      });
    }

    // Create temporary file from buffer for Cloudinary upload
    const tempDir = os.tmpdir();
    const tempFileName = `citrus-${Date.now()}-${req.file.originalname}`;
    tempFilePath = path.join(tempDir, tempFileName);
    
    // Write buffer to temporary file
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Step 1: Upload image to Cloudinary
    const cloudinaryResult = await uploadImage(tempFilePath, {
      folder: 'citrus-scans',
    });

    if (!cloudinaryResult.success) {
      throw new Error('Failed to upload image to cloud storage');
    }

    const imageUrl = cloudinaryResult.url;

    // Step 2: Call Hugging Face API for prediction
    const predictionResult = await predict(imageUrl);

    if (!predictionResult.success) {
      throw new Error('Failed to get disease prediction');
    }

    const { predictedClass, confidence } = predictionResult;

    // Step 3: Retrieve treatment information
    const treatmentInfo = getTreatment(predictedClass);
    
    let treatmentText = '';
    if (treatmentInfo) {
      treatmentText = `${treatmentInfo.description}\n\nTreatment:\n${treatmentInfo.treatment.join('\n')}\n\nPrevention: ${treatmentInfo.prevention}`;
    } else {
      treatmentText = 'Treatment information not available for this disease.';
    }

    // Step 4: Create Scan record in database
    const scan = await Scan.create({
      userId: req.user._id,
      imageUrl: imageUrl,
      predictedDisease: predictedClass,
      confidence: confidence,
      treatment: treatmentText,
    });

    // Step 5: Return scan result to frontend
    return res.status(201).json({
      success: true,
      message: 'Scan completed successfully',
      data: {
        scan: {
          _id: scan._id,
          imageUrl: scan.imageUrl,
          predictedDisease: scan.predictedDisease,
          confidence: scan.confidence,
          treatment: scan.treatment,
          createdAt: scan.createdAt,
        },
      },
    });

  } catch (error) {
    console.error('Upload and predict error:', error);
    
    // Handle specific external service errors
    if (error.message.includes('Cloudinary')) {
      return res.status(503).json({
        success: false,
        message: 'Image upload service is currently unavailable. Please try again later.',
      });
    }
    
    if (error.message.includes('Hugging Face')) {
      return res.status(503).json({
        success: false,
        message: 'Disease prediction service is currently unavailable. Please try again later.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your scan. Please try again.',
    });
  } finally {
    // Clean up temporary file
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (cleanupError) {
        console.error('Failed to clean up temporary file:', cleanupError);
      }
    }
  }
};

/**
 * Get all scans for authenticated user with pagination
 * @route GET /api/scans
 * @access Private
 */
export const getUserScans = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const scans = await Scan.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Scan.countDocuments({ userId: req.user._id });

    return res.status(200).json({
      success: true,
      data: {
        scans,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get scans error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve scans',
    });
  }
};

/**
 * Get single scan by ID
 * @route GET /api/scans/:id
 * @access Private
 */
export const getScanById = async (req, res) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).select('-__v');

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: { scan },
    });
  } catch (error) {
    console.error('Get scan by ID error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid scan ID format',
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve scan',
    });
  }
};

/**
 * Delete scan by ID with ownership verification
 * @route DELETE /api/scans/:id
 * @access Private
 */
export const deleteScan = async (req, res) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    await scan.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Scan deleted successfully',
    });
  } catch (error) {
    console.error('Delete scan error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid scan ID format',
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Failed to delete scan',
    });
  }
};

/**
 * Get dashboard statistics for authenticated user
 * @route GET /api/scans/stats
 * @access Private
 */
export const getScanStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total scans count
    const totalScans = await Scan.countDocuments({ userId });

    // Disease distribution
    const diseaseDistribution = await Scan.aggregate([
      { $match: { userId } },
      { $group: { _id: '$predictedDisease', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Recent scans (last 5)
    const recentScans = await Scan.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('predictedDisease confidence createdAt');

    // Average confidence
    const avgConfidenceResult = await Scan.aggregate([
      { $match: { userId } },
      { $group: { _id: null, avgConfidence: { $avg: '$confidence' } } },
    ]);

    const avgConfidence = avgConfidenceResult.length > 0 
      ? Math.round(avgConfidenceResult[0].avgConfidence * 100) / 100 
      : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalScans,
        avgConfidence,
        diseaseDistribution: diseaseDistribution.map(item => ({
          disease: item._id,
          count: item.count,
        })),
        recentScans,
      },
    });
  } catch (error) {
    console.error('Get scan stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve scan statistics',
    });
  }
};
