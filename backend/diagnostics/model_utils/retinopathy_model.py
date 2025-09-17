import logging
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Dropout
import os

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# -----------------------------
# Custom Layer
# -----------------------------
class FixedDropout(Dropout):
    def _get_noise_shape(self, inputs):
        return super()._get_noise_shape(inputs)

# -----------------------------
# Load trained EfficientNetB0 model
# -----------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../../../ml_models/efficientnet_retinopathy_model.h5')
model = tf.keras.models.load_model(
    MODEL_PATH,
    custom_objects={
        "swish": tf.keras.activations.swish,
        "FixedDropout": FixedDropout
    }
)
logger.info("Retinopathy model loaded successfully.")

# -----------------------------
# Preprocess image
# -----------------------------
def preprocess_image(image_file):
    """Preprocess uploaded image for EfficientNet input."""
    try:
        img = Image.open(image_file).convert("RGB")
        img = img.resize((224, 224))
        img_array = np.array(img).astype("float32") / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        logger.error(f"Error during image preprocessing: {e}")
        raise

# -----------------------------
# Predict Retinopathy
# -----------------------------
def predict_retinopathy(image_file):
    """Predict diabetic retinopathy using a 5-class softmax model."""
    try:
        img_array = preprocess_image(image_file)
        prediction = model.predict(img_array)[0]
        logger.info(f"Raw model prediction: {prediction}")

        class_names = ["Mild", "Moderate", "No_DR", "Proliferate_DR", "Severe"]
        class_probabilities = {name: float(prediction[i]) for i, name in enumerate(class_names)}

        # Compare No_DR with other DR classes
        dr_classes = {k: v for k, v in class_probabilities.items() if k != "No_DR"}
        max_dr_prob = max(dr_classes.values())
        no_dr_prob = class_probabilities["No_DR"]

        if max_dr_prob > no_dr_prob:
            detection = "Diabetic Retinopathy Detected ✅"
            stage = max(dr_classes, key=dr_classes.get)
            confidence = f"{max_dr_prob*100:.2f}%"
        else:
            detection = "Retinopathy: NOT Detected"
            stage = None
            confidence = f"{no_dr_prob*100:.2f}%"

        # Convert all probabilities to percentages
        class_probabilities_percent = {k: round(v*100, 2) for k, v in class_probabilities.items()}

        return {
            "detection": detection,
            "stage": stage,
            "confidence": confidence,
            "class_probabilities": class_probabilities_percent
        }

    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return {"error": str(e)}
