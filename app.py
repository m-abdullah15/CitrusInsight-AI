import gradio as gr
import tensorflow as tf
import numpy as np
from PIL import Image
import os

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

MODEL_PATH = "citrus_disease_model_densenet.keras"
model = tf.keras.models.load_model(MODEL_PATH)

CLASS_LABELS = [
    "Citrus canker", "Citrus greening", "Citrus mealybugs",
    "Die back", "Foliage damaged", "Healthy leaf",
    "Powdery mildew", "Shot hole", "Spiny whitefly", "Yellow leaves"
]

def preprocess_image(image):
    if isinstance(image, np.ndarray):  
        image = Image.fromarray(image)  

    image = image.resize((224, 224))  
    image = np.array(image) / 255.0  
    image = np.expand_dims(image, axis=0)  
    return image

def predict(image):   
    processed_image = preprocess_image(image)  
    prediction = model.predict(processed_image)[0]  
    predicted_index = np.argmax(prediction)  
    predicted_class = CLASS_LABELS[predicted_index]  
    confidence = float(prediction[predicted_index]) * 100  
    confidence = round(confidence, 2)  
    return predicted_class, confidence

iface = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil"),  
    outputs=[gr.Textbox(label="Predicted Class"), gr.Textbox(label="Confidence Score")],
    title="🍊 Citrus Disease Detection",
    description="Upload an image of a citrus leaf to detect diseases."
)

if __name__ == "__main__":
    iface.launch(share=True)  