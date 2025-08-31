import React from 'react';
import styled from 'styled-components';

const GuideContainer = styled.main`
  padding: 2rem 4rem;
`;

const GuideHero = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  h3 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
  }
`;

const SalaryInfo = styled.div`
    font-weight: bold;
    color: ${({ theme }) => theme.link};
    margin-top: 1rem;
`;

const MechanicalEngineering = () => {
  return (
    <GuideContainer>
      <GuideHero>
        <h1><i className="fas fa-cogs"></i> Mechanical Engineering</h1>
        <p>Complete guide to Mechanical Engineering careers</p>
      </GuideHero>

      <Section>
        <SectionTitle>Career Opportunities</SectionTitle>
        <Grid>
          <Card>
            <h3>Automotive Engineering</h3>
            <p>Design and develop vehicles and automotive systems.</p>
            <SalaryInfo>Salary: ₹4-25 LPA</SalaryInfo>
          </Card>
          <Card>
            <h3>Manufacturing</h3>
            <p>Production engineering and manufacturing processes.</p>
            <SalaryInfo>Salary: ₹3-20 LPA</SalaryInfo>
          </Card>
          <Card>
            <h3>Robotics</h3>
            <p>Design and develop robotic systems and automation.</p>
            <SalaryInfo>Salary: ₹5-30 LPA</SalaryInfo>
          </Card>
        </Grid>
      </Section>
    </GuideContainer>
  );
};

export default MechanicalEngineering; 