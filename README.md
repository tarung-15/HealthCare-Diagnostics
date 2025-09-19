# Medical Diagnosis System
An end-to-end medical diagnostic web application powered by Machine Learning, Django, and ReactJS. Built with a scalable Django REST API backend and a modern ReactJS frontend. The system enables doctors and patients to upload medical data (X-ray images, retinal scans, and clinical parameters) to get predictions for:
- Pneumonia Detection (CNN model on chest X-rays)
- Diabetic Retinopathy Detection (CNN model on retinal images)
- Heart Disease Prediction (ML model on patient health data)

##  Comparison of All Models

| Task                   | Model          | Algorithm               | Input Type              | Output Classes              |
|------------------------|----------------|-------------------------|-------------------------|-----------------------------|
| Diabetic Retinopathy   | EfficientNetB0 | CNN (Transfer Learning) | Fundus Images (224×224) | 5 DR Stages (0–4)           | 
| Chest X-ray Pneumonia  | VGG16          | CNN (Transfer Learning) | X-ray Images (224×224)  | Pneumonia / Normal (2)      | 
| Heart Disease          | RandomForest   | Ensemble (Trees)        | Tabular CSV Data        | 0 = No Disease, 1 = Disease |

---
