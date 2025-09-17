import React from "react";
import "./Contact.css";
import img2 from "../assets/img2.jpg";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">
        CONTACT <span>US</span>
      </h2>

      <div className="contact-main">
        <img src={img2} alt="Doctor with patient" className="contact-image" />

        <div className="contact-details">
          <h4>OUR OFFICE</h4>
          <p>
            TG Diagnostics
            <br />
            AECS Layout, Marathahalli, Bengaluru, Karnataka 560037
          </p>
          <p>
            Tel: 09999988888 <br />
            Email: tarungali1526@gmail.com
          </p>
        </div>
      </div>

      <footer className="contact-footer">
        <div className="footer-branding">
          <h3>
            <span className="logo-icon">📩</span> TG Diagnostics
          </h3>
          <p>
            Simplifying healthcare management with advanced tools and a seamless
            experience. Trusted by patients and professionals alike.
          </p>
        </div>

        <div className="footer-links">
          <h4>COMPANY</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About us</a>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>GET IN TOUCH</h4>
          <p>+91 9999988888</p>
          <p>tarungali1526@gmail.com</p>
        </div>
      </footer>

      <div className="footer-bottom">
        <hr />
        <p>Copyright 2025 © TG Diagnostics.com - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Contact;
