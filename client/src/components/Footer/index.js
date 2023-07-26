import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-content">
        {location.pathname !== '/' && (
          <button onClick={() => navigate(-1)} className="go-back-btn">
            &larr; Go Back
          </button>
        )}
        <h4 className="footer-text">&copy; {new Date().getFullYear()} - Version 1.0.0</h4>
      </div>
    </footer>
  );
};

export default Footer;
