import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../assets/img3.jpg'; // your uploaded image path

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    setUsername('');
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#f4faff', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>TG Diagnostics</div>
        <div style={styles.navLinks}>
          <Link to="/services" style={styles.link}>Services</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </div>
        <div style={styles.authSection}>
          {username ? (
            <>
              <span style={{ fontWeight: 'bold', color: '#0d47a1' }}>Welcome, {username}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.authLink}>Login</Link>
              <Link to="/signup" style={styles.authLink}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.mainSection}>
        <h1 style={styles.heading}>Welcome to TG Diagnostics</h1>
        <p style={styles.subText}>Empowering Smarter Health Decisions with AI.</p>

        <div style={styles.imageWrapper}>
          <img
            src={heroImg}
            alt="AI Health Hero"
            style={styles.heroImage}
          />
        </div>

        <button
          onClick={() => navigate('/services')}
          style={styles.ctaButton}
        >
          Choose a Diagnosis
        </button>
      </div>
    </div>
  );
};

export default HomePage;

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 50px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#1976d2',
  },
  navLinks: {
    display: 'flex',
    gap: '25px',
    fontWeight: '500',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
  },
  authSection: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  authLink: {
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  logoutBtn: {
    padding: '6px 14px',
    backgroundColor: '#ff5252',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  mainSection: {
    textAlign: 'center',
    padding: '80px 20px 60px',
  },
  heading: {
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: '20px',
  },
  subText: {
    fontSize: '18px',
    color: '#555',
    maxWidth: '650px',
    margin: '0 auto 40px',
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  heroImage: {
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  ctaButton: {
    padding: '16px 30px',
    backgroundColor: '#1976d2',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '8px',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
};
