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

const InformationTechnology = () => {
  return (
    <GuideContainer>
      <GuideHero>
        <h1><i className="fas fa-server"></i> Information Technology</h1>
        <p>Complete guide to Information Technology careers</p>
      </GuideHero>

      <Section>
        <SectionTitle>Career Opportunities</SectionTitle>
        <Grid>
          <Card>
            <h3>System Administration</h3>
            <p>Manage IT infrastructure and server systems.</p>
            <SalaryInfo>Salary: ₹3-20 LPA</SalaryInfo>
          </Card>
          <Card>
            <h3>Network Engineering</h3>
            <p>Design and maintain network systems.</p>
            <SalaryInfo>Salary: ₹4-25 LPA</SalaryInfo>
          </Card>
          <Card>
            <h3>Cloud Computing</h3>
            <p>Work with cloud platforms and services.</p>
            <SalaryInfo>Salary: ₹5-35 LPA</SalaryInfo>
          </Card>
        </Grid>
      </Section>
    </GuideContainer>
  );
};

export default InformationTechnology; 