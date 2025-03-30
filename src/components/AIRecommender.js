import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
`;

const AIRecommender = () => {
  const [isAssessing, setIsAssessing] = useState(false);

  const startAssessment = () => {
    setIsAssessing(true);
    Swal.fire({
      title: 'Start AI Career Assessment',
      html: `
        <p>This assessment will help us understand your:</p>
        <ul style="text-align: left; margin-top: 1em;">
          <li>Personality traits</li>
          <li>Skills and competencies</li>
          <li>Interests and preferences</li>
        </ul>
        <p style="margin-top: 1em;">Duration: 20 minutes</p>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Start Assessment',
      cancelButtonText: 'Maybe Later',
      confirmButtonColor: '#4a90e2'
    }).then((result) => {
      if (result.isConfirmed) {
        loadQuestions();
      }
      setIsAssessing(false);
    });
  };

  const loadQuestions = () => {
    // Add your assessment questions logic here
  };

  return (
    <Section>
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Career Path Recommender
        </motion.h2>
        <FeatureGrid>
          <FeatureCard
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Personality Assessment</h3>
            <p>Based on Big Five personality traits</p>
          </FeatureCard>
          {/* Add more feature cards */}
        </FeatureGrid>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startAssessment}
          disabled={isAssessing}
        >
          Start AI Assessment
        </motion.button>
      </Container>
    </Section>
  );
};

export default AIRecommender; 