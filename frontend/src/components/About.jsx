import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/img1.webp';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">

      <h2 className="about-title">ABOUT <span>US</span></h2>

      <div className="about-section">
        <div className="about-image">
          <img src={img1} alt="About Us" />
        </div>
        <div className="about-content">
        <p>
        At <strong>TG Diagnostics</strong>, we’re redefining the healthcare experience. We understand that managing your health can be complex, so we’ve designed a platform that makes it simple and intuitive. From scheduling appointments to tracking your medical history, we are here to support you at every step.
        </p>
          <p>
We are continuously innovating and enhancing our platform to provide the most advanced, user-friendly healthcare solutions. By integrating cutting-edge tools and AI-powered diagnostics, we aim to simplify the process of managing your health. Whether you're booking your first appointment or staying on top of ongoing care, TG Diagnostics is dedicated to offering seamless, reliable support at every step.          </p>
          <h3>Our Vision</h3>
          <p>
          Our mission is to leverage the power of AI and smart technology to provide fast, accurate diagnostics that are accessible and reliable. Whether you’re looking to book your first consultation or stay on top of ongoing care, TG Diagnostics ensures that your health is always in the best hands.          </p>
        </div>
      </div>

      <h3 className="choose-title">WHY <span>CHOOSE US</span></h3>

      <div className="choose-cards">
        <div className="choose-card">
          <h4>EFFICIENCY:</h4>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="choose-card">
          <h4>CONVENIENCE:</h4>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="choose-card">
          <h4>PERSONALIZATION:</h4>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

      {/* <div className="back-home">
        <Link to="/">← Back to Home</Link>
      </div> */}
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
  <Link to="/" className="back-to-home-link">Back to Home</Link>
</div>
    </div>
  );
};

export default About;
