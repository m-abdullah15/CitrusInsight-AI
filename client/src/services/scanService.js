import api from './api.js';

/**
 * Upload image for disease detection
 * @param {File} imageFile - The image file to upload
 * @returns {Promise} - Scan result data
 */
export const uploadImage = async (imageFile) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('image', imageFile);

    // Call backend upload endpoint with multipart/form-data
    const response = await api.post('/scans/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    // Handle upload errors
    const errorMessage = error.response?.data?.message || 'Failed to upload image';
    throw new Error(errorMessage);
  }
};

/**
 * Get all scans for current user
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of scans per page
 * @returns {Promise} - Scan list data
 */
export const getUserScans = async (page = 1, limit = 20) => {
  try {
    const response = await api.get('/scans', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch scans';
    throw new Error(errorMessage);
  }
};

/**
 * Get single scan by ID
 * @param {string} scanId - The scan ID
 * @returns {Promise} - Scan details
 */
export const getScanById = async (scanId) => {
  try {
    const response = await api.get(`/scans/${scanId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch scan details';
    throw new Error(errorMessage);
  }
};

/**
 * Delete a scan
 * @param {string} scanId - The scan ID to delete
 * @returns {Promise} - Success message
 */
export const deleteScan = async (scanId) => {
  try {
    const response = await api.delete(`/scans/${scanId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete scan';
    throw new Error(errorMessage);
  }
};

/**
 * Get scan statistics
 * @returns {Promise} - Scan statistics
 */
export const getScanStats = async () => {
  try {
    const response = await api.get('/scans/stats');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch scan statistics';
    throw new Error(errorMessage);
  }
};
