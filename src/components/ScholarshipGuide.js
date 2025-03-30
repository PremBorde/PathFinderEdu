import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScholarshipSection = styled.section`
  padding: 80px 20px;
  background: #f5f7fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const ScholarshipFilters = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

const FilterGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #2c3e50;
`;

const ScholarshipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ScholarshipCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const CardHeader = styled.div`
  background: #3498db;
  color: white;
  padding: 15px 20px;
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const CardBody = styled.div`
  padding: 20px;
`;

const ScholarshipInfo = styled.div`
  margin: 15px 0;
  
  p {
    margin: 8px 0;
    display: flex;
    align-items: center;
    
    i {
      margin-right: 10px;
      color: #3498db;
    }
  }
`;

const ApplyButton = styled.a`
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

const ScholarshipGuide = () => {
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState('');

  const scholarships = [
    {
      title: "Post Matric Scholarship",
      department: "Social Justice and Special Assistance Department",
      deadline: "31st March 2025",
      eligibility: "SC/ST/OBC Students",
      benefits: ["Tuition Fee", "Maintenance Allowance", "Exam Fee"],
      link: "https://mahadbt.maharashtra.gov.in"
    },
    {
      title: "Merit-cum-Means Scholarship",
      department: "Minority Development Department",
      deadline: "31st March 2025",
      eligibility: "Minority Students",
      benefits: ["Tuition Fee", "Maintenance Allowance"],
      link: "https://mahadbt.maharashtra.gov.in"
    }
    // Add more scholarships as needed
  ];

  return (
    <ScholarshipSection>
      <Container>
        <Header>
          <h1>Scholarship Guide</h1>
          <p>Find and apply for scholarships that match your profile</p>
        </Header>

        <ScholarshipFilters>
          <FilterGroup>
            <Select 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="social">Social Justice Department</option>
              <option value="tribal">Tribal Development Department</option>
              <option value="minority">Minority Development Department</option>
            </Select>

            <Select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="obc">OBC</option>
              <option value="minority">Minority</option>
            </Select>
          </FilterGroup>
        </ScholarshipFilters>

        <ScholarshipGrid>
          {scholarships.map((scholarship, index) => (
            <ScholarshipCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CardHeader>
                <h3>{scholarship.title}</h3>
              </CardHeader>
              <CardBody>
                <ScholarshipInfo>
                  <p><i className="fas fa-building"></i> {scholarship.department}</p>
                  <p><i className="fas fa-calendar"></i> Deadline: {scholarship.deadline}</p>
                  <p><i className="fas fa-user-check"></i> Eligibility: {scholarship.eligibility}</p>
                  <div className="benefits">
                    <p><i className="fas fa-check-circle"></i> Benefits:</p>
                    <ul>
                      {scholarship.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </ScholarshipInfo>
                <ApplyButton href={scholarship.link} target="_blank">
                  Apply Now
                </ApplyButton>
              </CardBody>
            </ScholarshipCard>
          ))}
        </ScholarshipGrid>
      </Container>
    </ScholarshipSection>
  );
};

export default ScholarshipGuide; 