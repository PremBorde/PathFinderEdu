import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  padding: 100px 20px;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 30px;
  }
`;

const CareerSection = styled.section`
  padding: 80px 20px;
  background: white;
`;

const CareerGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const CareerCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;

  i {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 20px;
  }

  h3 {
    margin: 15px 0;
    color: #2c3e50;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <h1>Navigate Your Career Path</h1>
          <p>Find the perfect career that matches your skills and interests</p>
          <Link to="/scholarships" className="cta-button">Explore Scholarships</Link>
        </HeroContent>
      </HeroSection>

      <CareerSection>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Popular Career Paths</h2>
        <CareerGrid>
          <CareerCard>
            <i className="fas fa-flask"></i>
            <h3>Science</h3>
            <p>Physics, Chemistry, Biology, Mathematics</p>
          </CareerCard>
          <CareerCard>
            <i className="fas fa-chart-line"></i>
            <h3>Commerce</h3>
            <p>Accountancy, Business Studies, Economics</p>
          </CareerCard>
          <CareerCard>
            <i className="fas fa-palette"></i>
            <h3>Arts</h3>
            <p>History, Geography, Political Science</p>
          </CareerCard>
        </CareerGrid>
      </CareerSection>
    </HomeContainer>
  );
};

export default Home; 