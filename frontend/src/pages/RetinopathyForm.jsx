import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RetinopathyForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");

    const payload = new FormData();
    payload.append("image", file);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/predict/retinopathy/",
        payload
      );
      setResult(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <div
        className="bg-white shadow rounded-4 px-4 py-5"
        style={{ maxWidth: "520px", width: "100%" }}
      >
        <h3 className="text-center mb-4" style={{ color: "#0d6efd", fontWeight: "700" }}>
          Retinopathy Detection
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fileUpload" className="form-label fw-semibold">
              Upload Eye Image:
            </label>
            <input
              type="file"
              className="form-control"
              id="fileUpload"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ padding: "0.5rem 0", fontWeight: "600" }}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {result && (
          <div className="alert alert-info mt-4 text-center">
            {result.error ? (
              <div className="text-danger">
                <strong>Error:</strong> {result.error}
              </div>
            ) : (
              <div>
                <h5 className="text-success mb-2">Prediction Result</h5>
                <p><strong>Detection:</strong> {result.detection || "N/A"}</p>
                <p><strong>Stage:</strong> {result.stage || "N/A"}</p>
                <p><strong>Confidence:</strong> {result.confidence || "N/A"}</p>
                {result.class_probabilities && (
                  <div className="mt-2 text-start">
                    <strong>Class Probabilities:</strong>
                    <ul className="ps-3">
                      {Object.entries(result.class_probabilities).map(
                        ([cls, prob], idx) => (
                          <li key={idx}>
                            {cls}: {(prob).toFixed(2)}%
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 d-flex justify-content-between gap-2">
          <button
            className="btn btn-outline-dark flex-grow-1"
            onClick={() => navigate("/services")}
            style={{ padding: "0.5rem 0", fontWeight: "600" }}
          >
            Contact Doctor
          </button>
          <button
            className="btn btn-outline-dark flex-grow-1"
            onClick={() => navigate("/")}
            style={{ padding: "0.5rem 0", fontWeight: "600" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetinopathyForm;
