/**
 * Disease Treatment Database Service
 * Provides treatment information and recommendations for citrus diseases
 */

const DISEASE_TREATMENTS = {
  "Citrus Canker": {
    description: "Bacterial disease causing lesions on leaves, stems, and fruit",
    treatment: [
      "Remove and destroy infected plant parts immediately",
      "Apply copper-based bactericides during the growing season",
      "Maintain proper spacing between trees for air circulation",
      "Avoid overhead irrigation to reduce leaf wetness"
    ],
    prevention: "Use disease-free planting material, practice good sanitation, and implement windbreaks to reduce disease spread"
  },
  
  "Citrus Greening": {
    description: "Bacterial disease (Huanglongbing) spread by Asian citrus psyllid, one of the most devastating citrus diseases",
    treatment: [
      "No cure available - focus on prevention and management",
      "Remove and destroy infected trees to prevent spread",
      "Control psyllid populations with systemic insecticides",
      "Use certified disease-free nursery stock only",
      "Apply nutritional sprays to support tree health"
    ],
    prevention: "Regular monitoring and early detection are critical. Implement integrated pest management for psyllid control"
  },
  
  "Citrus Black Spot": {
    description: "Fungal disease causing dark spots on fruit and leaves, affecting fruit quality",
    treatment: [
      "Apply copper-based fungicides during fruit development",
      "Remove fallen leaves and fruit to reduce inoculum",
      "Prune trees to improve air circulation and light penetration",
      "Apply protective fungicides before rainy periods"
    ],
    prevention: "Maintain tree vigor through proper nutrition and irrigation. Remove dead wood and debris regularly"
  },
  
  "Melanose": {
    description: "Fungal disease causing raised brown lesions on young fruit, leaves, and twigs",
    treatment: [
      "Apply copper fungicides during early fruit development",
      "Prune out dead wood which harbors the fungus",
      "Remove infected fruit and plant debris",
      "Time fungicide applications with spring flush growth"
    ],
    prevention: "Proper pruning to remove dead wood, maintain tree health, and apply preventive fungicides during vulnerable periods"
  },
  
  "Healthy": {
    description: "No disease detected - plant appears healthy",
    treatment: [
      "Continue regular monitoring for early disease detection",
      "Maintain proper nutrition and irrigation schedules",
      "Practice good sanitation and remove plant debris",
      "Monitor for pest activity regularly"
    ],
    prevention: "Keep trees healthy through proper cultural practices, balanced fertilization, and integrated pest management"
  }
};

/**
 * Get treatment information for a specific disease
 * @param {string} diseaseName - Name of the disease
 * @returns {Object|null} Treatment information or null if disease not found
 */
export const getTreatment = (diseaseName) => {
  if (!diseaseName) {
    return null;
  }
  
  // Normalize disease name for lookup (case-insensitive, trim whitespace)
  const normalizedName = diseaseName.trim();
  
  // Try exact match first
  if (DISEASE_TREATMENTS[normalizedName]) {
    return {
      disease: normalizedName,
      ...DISEASE_TREATMENTS[normalizedName]
    };
  }
  
  // Try case-insensitive match
  const diseaseKey = Object.keys(DISEASE_TREATMENTS).find(
    key => key.toLowerCase() === normalizedName.toLowerCase()
  );
  
  if (diseaseKey) {
    return {
      disease: diseaseKey,
      ...DISEASE_TREATMENTS[diseaseKey]
    };
  }
  
  // Disease not found in database
  return null;
};

/**
 * Get all available diseases in the database
 * @returns {Array<string>} List of disease names
 */
export const getAllDiseases = () => {
  return Object.keys(DISEASE_TREATMENTS);
};

/**
 * Check if a disease exists in the database
 * @param {string} diseaseName - Name of the disease
 * @returns {boolean} True if disease exists
 */
export const diseaseExists = (diseaseName) => {
  return getTreatment(diseaseName) !== null;
};
