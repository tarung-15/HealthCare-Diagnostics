import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const HeartDiseaseForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/predict/heart/', formData);
      setResult(response.data.result);
    } catch (err) {
      console.error(err);
      setError('Prediction failed. Please check input or server.');
    }
  };

  const fieldLabels = {
    patientName: 'Patient Name',
    age: 'Age',
    sex: 'Sex (0: Female, 1: Male)',
    cp: 'Chest Pain Type (0: Typical Angina, 1: Atypical Angina, 2: Non-anginal Pain, 3: Asymptomatic)',
    trestbps: 'Resting Blood Pressure',
    chol: 'Serum Cholesterol',
    fbs: 'Fasting Blood Sugar > 120 mg/dl (0: False, 1: True)',
    restecg: 'Resting ECG Results (0: Normal, 1: ST-T Abnormality, 2: Left Ventricular Hypertrophy)',
    thalach: 'Maximum Heart Rate Achieved',
    exang: 'Exercise Induced Angina (0: No, 1: Yes)',
    oldpeak: 'ST Depression Induced by Exercise',
    slope: 'Slope of Peak Exercise ST Segment (0: Upsloping, 1: Flat, 2: Downsloping)',
    ca: 'Number of Major Vessels Colored by Fluoroscopy',
    thal: 'Thalassemia (1: Normal, 2: Fixed Defect, 3: Reversible Defect)'
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Heart Disease Prediction Report', 20, 20);
    doc.setFontSize(12);

    let y = 30;
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        doc.text(`${fieldLabels[key]}: ${value}`, 20, y);
        y += 10;
      }
    });

    doc.setFontSize(14);
    doc.text(`Prediction Result: ${result || 'Not available'}`, 20, y + 10);
    doc.save('heart_report.pdf');
  };

  return (
    <div className="container mt-4 mb-5">
      {/* <h2 className="text-center mb-0 font-weight-bold">Heart Disease Risk Prediction</h2> */}
      <h2 className="text-center mb-0 font-weight-bold" style={{ color: "#0d6efd" }}> Heart Disease Risk Prediction</h2>

      <p className="text-center"><a href="/" className="text-primary"> Back to Home</a></p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><strong>Patient Name</strong></label>
          <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label><strong>Age</strong></label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label><strong>Sex</strong></label>
          <select name="sex" value={formData.sex} onChange={handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="0">Female (0)</option>
            <option value="1">Male (1)</option>
          </select>
        </div>

        <div className="form-group">
          <label><strong>Chest Pain Type</strong></label>
          <select name="cp" value={formData.cp} onChange={handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="0">Typical Angina (0)</option>
            <option value="1">Atypical Angina (1)</option>
            <option value="2">Non-anginal Pain (2)</option>
            <option value="3">Asymptomatic (3)</option>
          </select>
        </div>

        <div className="form-group">
          <label><strong>Resting Blood Pressure (trestbps)</strong></label>
          <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label><strong>Serum Cholesterol (chol)</strong></label>
          <input type="number" name="chol" value={formData.chol} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label><strong>Fasting Blood Sugar &gt; 120 mg/dl (fbs)</strong></label>
          <select name="fbs" value={formData.fbs} onChange={handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="0">False (0)</option>
            <option value="1">True (1)</option>
          </select>
        </div>

        <div className="form-group">
          <label><strong>Resting ECG Results (restecg)</strong></label>
          <select name="restecg" value={formData.restecg} onChange={handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="0">Normal (0)</option>
            <option value="1">ST-T Abnormality (1)</option>
            <option value="2">Left Ventricular Hypertrophy (2)</option>
          </select>
        </div>

        <div className="form-group">
          <label><strong>Max Heart Rate Achieved (thalach)</strong></label>
          <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label><strong>Exercise Induced Angina (exang)</strong></label>
          <select name="exang" value={formData.exang} onChange={handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="0">No (0)</option>
            <option value="1">Yes (1)</option>
          </select>
        </div>

        <div className="form-group">
          <label><strong>ST Depression Induced by Exercise (oldpeak)</strong></label>
          <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label><strong>Slope of Peak Exercise ST Segment (slope)</strong></label>
          <select name="slope" value={formData.slope} onChange={handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="0">Upsloping (0)</option>
            <option value="1">Flat (1)</option>
            <option value="2">Downsloping (2)</option>
          </select>
        </div>

        <div className="form-group">
          <label><strong>Number of Major Vessels Colored by Fluoroscopy (ca)</strong></label>
          <select name="ca" value={formData.ca} onChange={handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="form-group">
          <label><strong>Thalassemia (thal)</strong></label>
          <select name="thal" value={formData.thal} onChange={handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="1">Normal (1)</option>
            <option value="2">Fixed Defect (2)</option>
            <option value="3">Reversible Defect (3)</option>
          </select>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <button type="submit" className="btn btn-primary">Predict</button>
          <button type="button" onClick={generatePDF} className="btn btn-primary">Download PDF</button>
          <a href="/services" className="btn btn-primary">Contact Doctor</a>
        </div>
      </form>

      {result && (
        <div className="alert alert-success mt-4">
          <strong>Prediction Result:</strong> {result}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default HeartDiseaseForm;


