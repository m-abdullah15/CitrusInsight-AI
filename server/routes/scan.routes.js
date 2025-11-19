import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.middleware.js';
import {
  uploadAndPredict,
  getUserScans,
  getScanById,
  deleteScan,
  getScanStats,
} from '../controllers/scan.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// POST /api/scans/upload - Upload image and get prediction
router.post('/upload', uploadSingle, handleUploadError, uploadAndPredict);

// GET /api/scans/stats - Get dashboard statistics (must be before /:id route)
router.get('/stats', getScanStats);

// GET /api/scans - Get all scans with pagination
router.get('/', getUserScans);

// GET /api/scans/:id - Get single scan by ID
router.get('/:id', getScanById);

// DELETE /api/scans/:id - Delete scan with ownership verification
router.delete('/:id', deleteScan);

export default router;
