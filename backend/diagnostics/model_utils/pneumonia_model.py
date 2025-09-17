from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from pathlib import Path
import numpy as np

from PIL import Image

# Load model once during module import
BASE_DIR = Path(__file__).resolve().parent.parent.parent
model_path = BASE_DIR / 'ml_models' / 'our_model.h5'
model = load_model(model_path)
#FRONTEND
def predict_pneumonia(pil_image):
    # Convert InMemoryUploadedFile to PIL Image
    img = Image.open(pil_image).convert("RGB")
    # img = pil_image.convert("RGB")
    
    # Resize and preprocess the image
    img = img.resize((224, 224))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predict using model
    prediction = model.predict(img_array)[0]

    pneumonia_prob = prediction[1] * 100  # Softmax index 1 = PNEUMONIA

    if pneumonia_prob > 50:
        return f"person is pneumonia positive ({pneumonia_prob:.2f}%)"
    else:
        return f"person is pneumonia negative ({pneumonia_prob:.2f}%)"
