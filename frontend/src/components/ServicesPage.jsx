import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css'; 

const services = [
  {
    title: "Heart Disease",
    desc: "Detect early symptoms and risks of heart disease.",
    icon: "🫀",
    path: "/heart"
  },
  {
    title: "Pneumonia Detection",
    desc: "Analyze chest scans for signs of pneumonia.",
    icon: "🫁",
    path: "/pneumonia"
  },
  {
    title: "Retinopathy Analysis",
    desc: "Analyze retina scans for signs of diabetic retinopathy.",
    icon: "👁️",
    path: "/retinopathy"
  },
  {
    title: "Contact Doctor",
    desc: "Connect with a medical expert for guidance and support.",
    icon: "👨‍⚕️",
    alert: true
  }
];

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleClick = (service) => {
    if (service.alert) {
      alert("Doctor contact functionality coming soon!");
    } else {
      navigate(service.path);
    }
  };

  return (
    <div className="services-container">
      <h2 className="services-title">Diagnostics & Care</h2>
      <p className="services-subtitle">Explore our AI-powered diagnostic tools and medical support features.</p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h4>{service.title}</h4>
            <p>{service.desc}</p>
            <button className="btn btn-primary mt-2" onClick={() => handleClick(service)}>
              {service.alert ? 'Coming Soon' : 'Start'}
            </button>
          </div>
        ))}
      </div>

      <div className="services-footer-btn">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
           Back to Home
        </button>
      </div>
    </div>
  );
};

export default ServicesPage;
