import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaArrowLeft,
  FaBriefcase,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaStar,
  FaChartLine,
  FaUsers,
  FaGraduationCap,
  FaClock,
  FaBuilding,
  FaLaptop,
  FaChartLine as FaTrendingUp,
  FaCheckCircle,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { searchData } from '../data/searchData';

const CareerDetailContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 80px;
`;

const CareerHeader = styled.div`
  background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
  color: white;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
  }
`;

const CareerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CareerSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CareerMetrics = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;

  svg {
    font-size: 1rem;
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      color: #38a169;
      font-size: 1.2rem;
    }
  }

  p {
    color: #4a5568;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const SkillItem = styled.div`
  background: #f0fff4;
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid #38a169;
  text-align: center;

  .skill-name {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }

  .skill-level {
    font-size: 0.85rem;
    color: #38a169;
  }
`;

const CompanyList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const CompanyItem = styled.div`
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #38a169;
  }

  .company-name {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  .company-type {
    font-size: 0.85rem;
    color: #718096;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #38a169;
    }
  }
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f7fafc;

  &:last-child {
    border-bottom: none;
  }

  .label {
    color: #718096;
    font-size: 0.9rem;
  }

  .value {
    color: #2d3748;
    font-weight: 600;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(56, 161, 105, 0.3);
  }

  &.secondary {
    background: white;
    color: #38a169;
    border: 2px solid #38a169;

    &:hover {
      background: #f0fff4;
    }
  }
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: #e6fffa;
  color: #2d3748;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #38a169;
`;

const GrowthIndicator = styled.div`
  background: ${props => props.positive ? '#f0fff4' : '#fef5e7'};
  color: ${props => props.positive ? '#38a169' : '#d69e2e'};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const CareerDetail = () => {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find career in search data
    const allCareers = searchData.careers;
    const foundCareer = allCareers.find(c => c.id === careerId);
    
    setCareer(foundCareer);
    setLoading(false);
  }, [careerId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleExploreJobs = () => {
    // In a real app, this would redirect to job search
    alert('Job search feature coming soon!');
  };

  if (loading) {
    return (
      <CareerDetailContainer>
        <MainContent>
          <div>Loading...</div>
        </MainContent>
      </CareerDetailContainer>
    );
  }

  if (!career) {
    return (
      <CareerDetailContainer>
        <MainContent>
          <div>
            <h2>Career Not Found</h2>
            <p>The career you're looking for doesn't exist.</p>
            <ActionButton onClick={handleBack}>
              <FaArrowLeft />
              Go Back
            </ActionButton>
          </div>
        </MainContent>
      </CareerDetailContainer>
    );
  }

  // Parse growth rate
  const growthMatch = career.growth?.match(/(\d+)%/);
  const growthRate = growthMatch ? parseInt(growthMatch[1]) : 0;
  const isPositiveGrowth = growthRate > 0;

  return (
    <CareerDetailContainer>
      <CareerHeader>
        <HeaderContent>
          <BackButton onClick={handleBack}>
            <FaArrowLeft />
            Back to Search
          </BackButton>
          
          <CareerTitle>{career.title}</CareerTitle>
          <CareerSubtitle>{career.description}</CareerSubtitle>
          
          <CareerMetrics>
            <Metric>
              <FaRupeeSign />
              {career.salary}
            </Metric>
            <Metric>
              <FaMapMarkerAlt />
              {career.location}
            </Metric>
            <Metric>
              <FaClock />
              {career.duration}
            </Metric>
            <Metric>
              <FaStar />
              {career.rating}/5
            </Metric>
            {career.growth && (
              <Metric>
                <FaTrendingUp />
                {career.growth}
              </Metric>
            )}
          </CareerMetrics>
        </HeaderContent>
      </CareerHeader>

      <MainContent>
        <div>
          <ContentSection>
            <h2>
              <FaBriefcase />
              Career Overview
            </h2>
            <p>{career.description}</p>
            <p>
              This career path offers excellent opportunities for growth and development in the {career.category.toLowerCase()} sector. 
              Professionals in this field are in high demand and can expect competitive compensation packages.
            </p>
            
            <TagsList>
              {career.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsList>

            {career.growth && (
              <GrowthIndicator positive={isPositiveGrowth}>
                <FaTrendingUp />
                {career.growth}
              </GrowthIndicator>
            )}
          </ContentSection>

          <ContentSection>
            <h2>
              <FaLaptop />
              Required Skills
            </h2>
            <p>Key skills and competencies needed for success in this career:</p>
            <SkillsList>
              {career.skills?.map((skill, index) => (
                <SkillItem key={index}>
                  <div className="skill-name">{skill}</div>
                  <div className="skill-level">Essential</div>
                </SkillItem>
              )) || (
                <SkillItem>
                  <div className="skill-name">Professional Skills</div>
                  <div className="skill-level">Required</div>
                </SkillItem>
              )}
            </SkillsList>
          </ContentSection>

          <ContentSection>
            <h2>
              <FaBuilding />
              Top Employers
            </h2>
            <p>Leading companies that hire for this role:</p>
            <CompanyList>
              {career.companies?.map((company, index) => (
                <CompanyItem key={index}>
                  <div className="company-name">{company}</div>
                  <div className="company-type">Top Employer</div>
                </CompanyItem>
              )) || (
                <CompanyItem>
                  <div className="company-name">Leading Companies</div>
                  <div className="company-type">Various Industries</div>
                </CompanyItem>
              )}
            </CompanyList>
          </ContentSection>
        </div>

        <Sidebar>
          <InfoCard>
            <h3>
              <FaChartLine />
              Career Information
            </h3>
            <InfoItem>
              <span className="label">Salary Range</span>
              <span className="value">{career.salary}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Work Type</span>
              <span className="value">{career.duration}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Category</span>
              <span className="value">{career.category}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Stream</span>
              <span className="value">{career.stream}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Rating</span>
              <span className="value">{career.rating}/5 ⭐</span>
            </InfoItem>
            {career.growth && (
              <InfoItem>
                <span className="label">Job Growth</span>
                <span className="value">{career.growth}</span>
              </InfoItem>
            )}
          </InfoCard>

          <InfoCard>
            <h3>
              <FaGraduationCap />
              Education Requirements
            </h3>
            <InfoItem>
              <span className="label">Minimum Education</span>
              <span className="value">Bachelor's Degree</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Preferred Stream</span>
              <span className="value">{career.stream}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Experience</span>
              <span className="value">0-2 years (Entry Level)</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Certifications</span>
              <span className="value">Industry Specific</span>
            </InfoItem>
          </InfoCard>

          <div>
            <ActionButton onClick={handleExploreJobs}>
              <FaExternalLinkAlt />
              Explore Job Opportunities
            </ActionButton>
            <ActionButton className="secondary" onClick={() => navigate('/assessment')}>
              <FaCheckCircle />
              Take Career Assessment
            </ActionButton>
          </div>
        </Sidebar>
      </MainContent>
    </CareerDetailContainer>
  );
};

export default CareerDetail;
