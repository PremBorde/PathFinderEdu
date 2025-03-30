import React from 'react';
import './Careers.css';

const Careers = () => {
  return (
    <div className="careers-section">
      <h2>Career Paths</h2>
      <div className="career-streams">
        <div className="stream-card">
          <h3>Science Stream</h3>
          <ul>
            <li>Engineering</li>
            <li>Medical Sciences</li>
            <li>Research & Development</li>
            <li>Information Technology</li>
          </ul>
        </div>
        <div className="stream-card">
          <h3>Commerce Stream</h3>
          <ul>
            <li>Chartered Accountancy</li>
            <li>Business Management</li>
            <li>Banking & Finance</li>
            <li>Economics</li>
          </ul>
        </div>
        <div className="stream-card">
          <h3>Arts Stream</h3>
          <ul>
            <li>Mass Communication</li>
            <li>Psychology</li>
            <li>Liberal Arts</li>
            <li>Design & Fine Arts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Careers; 