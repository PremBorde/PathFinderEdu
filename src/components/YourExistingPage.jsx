import React from 'react';
import { Link } from 'react-router-dom';

const CareerGuidance = () => {
  return (
    <div className="career-guidance">
      <div className="assessment-cta">
        <h2>Take Our AI Career Assessment</h2>
        <p>Discover your ideal career path with our advanced AI-powered assessment tool</p>
        <Link to="/assessment" className="assessment-button">
          Start Assessment
        </Link>
      </div>
    </div>
  );
};

export default CareerGuidance; 