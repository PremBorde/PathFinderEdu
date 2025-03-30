import React, { useState } from 'react';
import Assessment from '../components/Assessment/Assessment';

const CareerGuidance = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="career-guidance-page">
      {!showAssessment ? (
        <div className="assessment-intro">
          <h1>Career Guidance Assessment</h1>
          <p>Take our AI-powered assessment to discover your ideal career path</p>
          <button 
            className="start-button"
            onClick={() => setShowAssessment(true)}
          >
            Take Assessment
          </button>
        </div>
      ) : (
        <Assessment />
      )}
    </div>
  );
};

export default CareerGuidance; 