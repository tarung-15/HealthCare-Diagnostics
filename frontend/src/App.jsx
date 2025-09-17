import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PneumoniaForm from './pages/PneumoniaForm';
import RetinopathyForm from './pages/RetinopathyForm';
import HeartDiseaseForm from './pages/HeartDiseaseForm';
import ServicesPage from './components/ServicesPage';
import Login from './pages/Login';        
import Signup from './pages/Signup';  
import About from './components/About';
import Contact from './components/contact';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pneumonia" element={<PneumoniaForm />} />
        <Route path="/retinopathy" element={<RetinopathyForm />} />
        <Route path="/heart" element={<HeartDiseaseForm />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<Login />} />          {/* ✅ */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/About" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        {/* You can add login, signup, about, etc., later */}
      </Routes>
    </Router>
  );
}

export default App;
