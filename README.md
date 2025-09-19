# Medical Diagnosis System
An end-to-end medical diagnostic web application powered by Machine Learning, Django, and ReactJS. Built with a scalable Django REST API backend and a modern ReactJS frontend. The system enables doctors and patients to upload medical data (X-ray images, retinal scans, and clinical parameters) to get predictions for:
- Pneumonia Detection (CNN model on chest X-rays)
- Diabetic Retinopathy Detection (CNN model on retinal images)
- Heart Disease Prediction (ML model on patient health data)

##  Brief of All Models

| Task                   | Model          | Algorithm               | Input Type              | Output Classes              |
|------------------------|----------------|-------------------------|-------------------------|-----------------------------|
| Diabetic Retinopathy   | EfficientNetB0 | CNN (Transfer Learning) | Fundus Images (224×224) | 5 DR Stages (0–4)           | 
| Chest X-ray Pneumonia  | VGG16          | CNN (Transfer Learning) | X-ray Images (224×224)  | Pneumonia / Normal (2)      | 
| Heart Disease          | RandomForest   | Ensemble (Trees)        | Tabular CSV Data        | 0 = No Disease, 1 = Disease |

---

## Features

- User Authentication: Secure login & signup with JWT.

- Pneumonia Detection: Upload chest X-ray and get real-time prediction.

- Diabetic Retinopathy Detection: Upload retinal scan and view disease stage with confidence score.

- Heart Disease Prediction: Fill patient parameters (age, cholesterol, BP, etc.) and get risk prediction.

- Prediction Reports: Download diagnosis as PDF.

- Doctor Support: Contact doctor button for urgent cases.

- Modern UI: Responsive React frontend
