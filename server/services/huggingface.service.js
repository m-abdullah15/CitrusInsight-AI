/**
 * Hugging Face API Service
 * Connects to Hugging Face Gradio space for citrus disease prediction
 */
import { Client } from "@gradio/client";
const HUGGINGFACE_SPACE_URL = process.env.HUGGINGFACE_API_URL || 'abdjutt777/Citrus-demo';
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

/**
 * Delay helper for retry logic
 * @param {number} ms - Milliseconds to delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Predict citrus disease from image URL
 * @param {string} imageUrl - URL of the image to analyze
 * @returns {Promise<Object>} Prediction result with predictedClass and confidence
 */
export const predict = async (imageUrl) => {
  // Check if we should use mock data (for testing when API is unavailable)
  const useMockData = process.env.USE_MOCK_PREDICTION === 'true';
  
  if (useMockData) {
    console.log('Using mock prediction data (Hugging Face API unavailable)');
    
    // Return mock prediction for testing
    const mockDiseases = [
      'Citrus Canker',
      'Citrus Greening',
      'Citrus Black Spot',
      'Healthy',
      'Melanose',
      'Citrus Scab'
    ];
    
    const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
    const randomConfidence = 75 + Math.random() * 20; // 75-95% confidence
    
    // Simulate API delay
    await delay(1000);
    
    return {
      success: true,
      predictedClass: randomDisease,
      confidence: Math.round(randomConfidence * 100) / 100
    };
  }
  
  // Try to use real Hugging Face API
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // Dynamic import of Gradio client
      
      
      // Connect to Hugging Face space endpoint
      const client = await Client.connect(HUGGINGFACE_SPACE_URL);
      
      // Call /predict with image URL parameter
      const result = await client.predict('/predict', { 
        image: imageUrl 
      });
      
      // Extract predictedClass and confidence from response
      const predictedClass = result.data[0];
      const confidence = parseFloat(result.data[1]);
      
      return {
        success: true,
        predictedClass,
        confidence: Math.round(confidence * 100) / 100 // Round to 2 decimal places
      };
      
    } catch (error) {
      lastError = error;
      console.error(`Hugging Face API attempt ${attempt + 1} failed:`, error.message);
      
      // If not the last attempt, wait before retrying
      if (attempt < MAX_RETRIES - 1) {
        await delay(RETRY_DELAY);
      }
    }
  }
  
  // All retries failed
  throw new Error(`Hugging Face API failed after ${MAX_RETRIES} attempts: ${lastError.message}`);
};
