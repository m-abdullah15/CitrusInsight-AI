import gradio as gr
import tensorflow as tf
import numpy as np
from fastapi import FastAPI
from PIL import Image
import os
import uvicorn

# Disable GPU to avoid compatibility issues
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# Load the trained model
MODEL_PATH = "citrus_disease_model_densenet.keras"
model = tf.keras.models.load_model(MODEL_PATH)
# Warm up the model with a dummy input
dummy_input = np.zeros((1, 224, 224, 3))
_ = model.predict(dummy_input)

# Define class labels
CLASS_LABELS = [
    "Citrus canker", "Citrus greening", "Citrus mealybugs",
    "Die back", "Foliage damaged", "Healthy leaf",
    "Powdery mildew", "Shot hole", "Spiny whitefly", "Yellow leaves"
]

# Function to preprocess images
def preprocess_image(image):
    """Ensure image is in PIL format, resize, normalize, and add batch dimension."""
    if isinstance(image, np.ndarray):  
        image = Image.fromarray(image)  # Convert NumPy array to PIL image

    image = image.resize((224, 224))  # Resize image
    image = np.array(image) / 255.0  # Normalize pixel values (0-1)
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

# Function to make predictions
def predict(image):
    """Predict disease from image input and return confidence."""
    processed_image = preprocess_image(image)  
    prediction = model.predict(processed_image)[0]  # Get prediction probabilities
    predicted_index = np.argmax(prediction)  # Get highest probability index
    predicted_class = CLASS_LABELS[predicted_index]  # Get corresponding class label
    confidence = float(prediction[predicted_index]) * 100  # Convert to percentage
    confidence = round(confidence, 2)  # ✅ Rounds to 2 decimal places
    return predicted_class, confidence

# Create Gradio UI
iface = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil"),  # Accepts image input
    outputs=[gr.Textbox(label="Predicted Class"), gr.Textbox(label="Confidence Score")],
    title="🍊 Citrus Disease Detection",
    description="Upload an image of a citrus leaf to detect diseases."
)

app = FastAPI()
app = gr.mount_gradio_app(app, iface, path="/")

# Run the FastAPI app using uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)