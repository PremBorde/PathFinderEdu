import React from 'react';

const Instructions = () => {
  return (
    <main className="instructions-content">
      <section className="hero">
        <div className="hero-content">
          <h1>Instructions</h1>
          <p>How to use the PathFinderEdu platform</p>
        </div>
      </section>
      
      <section className="instructions-section">
        <div className="container">
          <div className="instruction-item">
            <h3>1. Take the Assessment</h3>
            <p>Start with our AI-powered career assessment to understand your interests and aptitudes</p>
          </div>
          
          <div className="instruction-item">
            <h3>2. Explore Stream Options</h3>
            <p>Browse through Science, Commerce, and Arts streams to find suitable career paths</p>
          </div>
          
          <div className="instruction-item">
            <h3>3. Review Detailed Guides</h3>
            <p>Access comprehensive guides for each career option with entrance exams and requirements</p>
          </div>
          
          <div className="instruction-item">
            <h3>4. Plan Your Path</h3>
            <p>Create a personalized roadmap based on your chosen career direction</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Instructions; 