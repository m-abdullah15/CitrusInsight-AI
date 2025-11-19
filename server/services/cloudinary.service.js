import cloudinary from '../config/cloudinary.config.js';

/**
 * Upload an image to Cloudinary
 * @param {string} filePath - Path to the file to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Upload result with secure_url
 */
export const uploadImage = async (filePath, options = {}) => {
  try {
    const uploadOptions = {
      folder: options.folder || 'citrus-insight',
      resource_type: options.resource_type || 'image',
      transformation: options.transformation || [
        { width: 1000, height: 1000, crop: 'limit' }
      ],
      ...options
    };

    const result = await cloudinary.uploader.upload(filePath, uploadOptions);
    
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} Deletion result
 */
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === 'ok',
      result: result.result
    };
  } catch (error) {
    throw new Error(`Cloudinary deletion failed: ${error.message}`);
  }
};
