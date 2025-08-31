import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  transform: scale(1);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagText};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Stat = styled.div`
  text-align: center;
  
  .label {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textSecondary};
  }
  
  .value {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }
`;

const CareerCard = ({ 
  title, 
  description, 
  tags = [], 
  averageSalary = "Not specified",
  jobGrowth = "N/A",
  onClick 
}) => {
  return (
    <Card onClick={onClick}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      
      <Stats>
        <Stat>
          <div className="label">Avg. Salary</div>
          <div className="value">{averageSalary}</div>
        </Stat>
        <Stat>
          <div className="label">Job Growth</div>
          <div className="value">{jobGrowth}</div>
        </Stat>
      </Stats>
    </Card>
  );
};

export default CareerCard; 