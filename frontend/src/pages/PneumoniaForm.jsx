import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PneumoniaForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload an X-ray image.');

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/predict/pneumonia/', formData);
      setResult(res.data?.result ?? 'Unknown');
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="pneumonia-card shadow-lg p-4 rounded-4 w-100" style={{ maxWidth: '520px' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Pneumonia Detection</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fileUpload" className="form-label fw-semibold">Upload Chest X-ray:</label>
            <input
              type="file"
              className="form-control"
              id="fileUpload"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-semibold shadow-sm custom-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>

        {result && (
          <div className="alert alert-success mt-4 text-center">
            <strong>Prediction Result:</strong><br />
            <span className="text-dark">{result}</span>
          </div>
        )}

        <div className="mt-4 d-flex justify-content-between gap-2">
          <button
            className="btn btn-outline-dark w-50 fw-semibold"
            onClick={() => navigate('/services')}
          >
            Contact Doctor
          </button>
          <button
            className="btn btn-outline-dark w-50 fw-semibold"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PneumoniaForm;


