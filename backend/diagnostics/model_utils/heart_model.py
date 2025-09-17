import joblib
import pandas as pd
from pathlib import Path

# Load model from correct location
BASE_DIR = Path(__file__).resolve().parents[2]
model_path = BASE_DIR / 'ml_models' / 'heart_model.pkl'

# Load the trained model
try:
    model = joblib.load(model_path)
except Exception as e:
    print("Model load error:", e)
    model = None

# Ensure these match your training columns
columns = [
    "age", "sex", "cp", "trestbps", "chol", "fbs",
    "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"
]

def predict_heart(data_dict):
    try:
        # Construct a DataFrame with exact column names
        df = pd.DataFrame([data_dict], columns=columns)

        # Convert to correct types (important)
        df = df.astype({
            "age": float, "sex": int, "cp": int, "trestbps": float,
            "chol": float, "fbs": int, "restecg": int, "thalach": float,
            "exang": int, "oldpeak": float, "slope": int, "ca": int, "thal": int,
        })
  
        print(df)
        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[0][1] * 100
        print("Prediction:", prediction)
        print("Probability:", probability)

        if prediction == 1:
            return f"High risk - ({probability:.2f}%) chance that you have heart disease"
        else:
            return f"Low risk - ({probability:.2f}%) chance that you have heart disease"

    except Exception as e:
        print("Prediction error:", e)
        return "Unknown"
