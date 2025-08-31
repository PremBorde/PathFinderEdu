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

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const EducationPath = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const PathStep = styled.div`
    background: ${({ theme }) => theme.cardBackground};
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.shadow};
    h4 {
        margin-bottom: 0.5rem;
    }
`;

const ComputerEngineering = () => {
  return (
    <GuideContainer>
      <GuideHero>
        <h1><i className="fas fa-laptop-code"></i> Computer Engineering</h1>
        <p>Complete guide to Computer Science and Engineering careers</p>
      </GuideHero>

      <Section>
        <SectionTitle>Career Opportunities</SectionTitle>
        <Grid>
          <Card>
            <h3>Software Development</h3>
            <p>Build applications, websites, and software systems.</p>
            <SalaryInfo>Salary: ₹4-40 LPA</SalaryInfo>
          </Card>
          <Card>
            <h3>Data Science & AI</h3>
            <p>Work with big data, machine learning, and artificial intelligence.</p>
            <SalaryInfo>Salary: ₹6-50 LPA</SalaryInfo>
          </Card>
          <Card>
            <h3>Cybersecurity</h3>
            <p>Protect systems and data from security threats.</p>
            <SalaryInfo>Salary: ₹5-30 LPA</SalaryInfo>
          </Card>
           <Card>
            <h3>Web Development</h3>
            <p>Create modern web applications and interfaces.</p>
            <SalaryInfo>Salary: ₹3-25 LPA</SalaryInfo>
          </Card>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Skills Required</SectionTitle>
        <SkillsGrid>
            <Card>
              <h3>Technical Skills</h3>
              <ul>
                <li>Programming (Python, Java, C++)</li>
                <li>Data Structures & Algorithms</li>
                <li>Database Management</li>
                <li>Web Technologies (React, Node.js)</li>
              </ul>
            </Card>
            <Card>
              <h3>Soft Skills</h3>
              <ul>
                <li>Problem Solving</li>
                <li>Logical Thinking</li>
                <li>Team Collaboration</li>
                <li>Continuous Learning</li>
              </ul>
            </Card>
        </SkillsGrid>
      </Section>

      <Section>
        <SectionTitle>Educational Path</SectionTitle>
        <EducationPath>
            <PathStep>
              <h4>12th Grade (PCM)</h4>
              <p>Physics, Chemistry, Mathematics with Computer Science</p>
            </PathStep>
            <PathStep>
              <h4>Entrance Exams</h4>
              <p>JEE Main, JEE Advanced, BITSAT, State CETs</p>
            </PathStep>
            <PathStep>
              <h4>Bachelor's Degree</h4>
              <p>B.Tech/B.E. in Computer Science or related field (4 years)</p>
            </PathStep>
        </EducationPath>
      </Section>
    </GuideContainer>
  );
};

export default ComputerEngineering; 