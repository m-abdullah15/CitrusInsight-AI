import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    predictedDisease: {
      type: String,
      required: [true, 'Predicted disease is required'],
    },
    confidence: {
      type: Number,
      required: [true, 'Confidence score is required'],
      min: [0, 'Confidence must be at least 0'],
      max: [100, 'Confidence cannot exceed 100'],
    },
    treatment: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient queries
scanSchema.index({ userId: 1 });
scanSchema.index({ createdAt: -1 });

// Virtual field for confidence percentage
scanSchema.virtual('confidencePercentage').get(function () {
  return `${this.confidence.toFixed(2)}%`;
});

// Ensure virtuals are included when converting to JSON
scanSchema.set('toJSON', { virtuals: true });
scanSchema.set('toObject', { virtuals: true });

const Scan = mongoose.model('Scan', scanSchema);

export default Scan;
