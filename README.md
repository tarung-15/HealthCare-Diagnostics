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

## Tech Stack
1. Frontend
- React.js – User interface
- React Router – Navigation and routing
- Axios – API communication
  
2. Backend
- Django – Web framework
- Django REST Framework (DRF) – API development
- SimpleJWT – Authentication & authorization (JWT-based)
  
3. Machine Learning 
- TensorFlow / Keras – Deep learning models for Pneumonia & Retinopathy
- Scikit-learn – ML model for Heart Disease prediction
- NumPy / Pandas – Data processing
- OpenCV / Pillow – Image preprocessing (if used for X-ray/retina scans)

4. Other Tools
- Python Virtual Environment (venv) – Dependency management
- npm / Node.js – Frontend package management

##  Setup Instructions  
Follow the steps below to set up the project on your local machine.
```bash
git clone https://github.com/tarung-15/Medical-Diagnostics.git
cd medical_diagnosis
cd backend
python -m venv .venv
.venv\Scripts\activate #(windows)
# source .venv/bin/activate (Linux/Mac)
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
# Backend API will be running at:
# http://127.0.0.1:8000/api/
# frontend(install node, npm)
cd ../frontend
npm install
npm run dev
# Configure Environment Variables
# Backend (backend/.env)
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=*
# Frontend (frontend/.env)
VITE_API_BASE_URL=http://127.0.0.1:8000/api
# Accessing the System
# Open frontend: http://localhost:5173
```
## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
