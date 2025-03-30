import React from 'react';

const IntroSection = ({ onStart }) => (
    <div className="assessment-section active">
        <h2>AI Career Assessment</h2>
        <p>Discover your ideal career path through our AI-powered assessment</p>
        
        <div className="assessment-info-cards">
            <InfoCard
                icon="clock"
                title="20 Minutes"
                description="Complete assessment time"
            />
            <InfoCard
                icon="list-check"
                title="4 Sections"
                description="Comprehensive evaluation"
            />
            <InfoCard
                icon="robot"
                title="AI Analysis"
                description="Data-driven recommendations"
            />
        </div>

        <button className="primary-button" onClick={onStart}>
            Begin Assessment
        </button>
    </div>
);

const InfoCard = ({ icon, title, description }) => (
    <div className="info-card">
        <i className={`fas fa-${icon}`}></i>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

export default IntroSection; 