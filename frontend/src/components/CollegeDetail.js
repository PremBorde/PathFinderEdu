import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaArrowLeft,
  FaUniversity,
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaTrophy,
  FaUsers,
  FaGraduationCap,
  FaBriefcase,
  FaRupeeSign,
  FaBook,
  FaChartLine,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaDownload
} from 'react-icons/fa';
import { searchData } from '../data/searchData';

const CollegeDetailContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 80px;
`;

const CollegeHeader = styled.div`
  background: linear-gradient(135deg, #805ad5 0%, #6b46c1 100%);
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

const CollegeTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CollegeSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CollegeMetrics = styled.div`
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
      color: #805ad5;
      font-size: 1.2rem;
    }
  }

  p {
    color: #4a5568;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
`;

const CoursesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const CourseItem = styled.div`
  background: #faf5ff;
  padding: 1.5rem;
  border-radius: 15px;
  border-left: 4px solid #805ad5;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(128, 90, 213, 0.2);
  }

  .course-name {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  .course-details {
    font-size: 0.85rem;
    color: #805ad5;
    margin-bottom: 0.5rem;
  }

  .course-seats {
    font-size: 0.8rem;
    color: #718096;
  }
`;

const FacilitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const FacilityItem = styled.div`
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .facility-icon {
    font-size: 2rem;
    color: #805ad5;
    margin-bottom: 1rem;
  }

  .facility-name {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  .facility-desc {
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
      color: #805ad5;
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
  background: linear-gradient(135deg, #805ad5 0%, #6b46c1 100%);
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
    box-shadow: 0 8px 20px rgba(128, 90, 213, 0.3);
  }

  &.secondary {
    background: white;
    color: #805ad5;
    border: 2px solid #805ad5;

    &:hover {
      background: #faf5ff;
    }
  }
`;

const RankingBadge = styled.div`
  background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const PlacementStats = styled.div`
  background: #f0fff4;
  border: 2px solid #68d391;
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1rem;
  text-align: center;

  .stats-title {
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-item {
    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #38a169;
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: #718096;
    }
  }
`;

const CollegeDetail = () => {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find college in search data
    const allColleges = searchData.colleges;
    const foundCollege = allColleges.find(c => c.id === collegeId);
    
    setCollege(foundCollege);
    setLoading(false);
  }, [collegeId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleApplyNow = () => {
    alert('Application feature coming soon!');
  };

  const handleDownloadBrochure = () => {
    alert('Brochure download feature coming soon!');
  };

  if (loading) {
    return (
      <CollegeDetailContainer>
        <MainContent>
          <div>Loading...</div>
        </MainContent>
      </CollegeDetailContainer>
    );
  }

  if (!college) {
    return (
      <CollegeDetailContainer>
        <MainContent>
          <div>
            <h2>College Not Found</h2>
            <p>The college you're looking for doesn't exist.</p>
            <ActionButton onClick={handleBack}>
              <FaArrowLeft />
              Go Back
            </ActionButton>
          </div>
        </MainContent>
      </CollegeDetailContainer>
    );
  }

  // Mock additional data
  const additionalInfo = {
    courses: college.courses || ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
    facilities: [
      { name: 'Library', desc: '24/7 Digital Library', icon: '📚' },
      { name: 'Labs', desc: 'State-of-art Labs', icon: '🔬' },
      { name: 'Hostel', desc: 'On-campus Housing', icon: '🏠' },
      { name: 'Sports', desc: 'Sports Complex', icon: '⚽' }
    ],
    placementRate: '95%',
    averagePackage: college.placements || '₹12 LPA',
    topRecruiter: 'Google, Microsoft, Amazon'
  };

  return (
    <CollegeDetailContainer>
      <CollegeHeader>
        <HeaderContent>
          <BackButton onClick={handleBack}>
            <FaArrowLeft />
            Back to Search
          </BackButton>
          
          <CollegeTitle>{college.title}</CollegeTitle>
          <CollegeSubtitle>{college.description}</CollegeSubtitle>
          
          <CollegeMetrics>
            <Metric>
              <FaMapMarkerAlt />
              {college.location}
            </Metric>
            <Metric>
              <FaCalendarAlt />
              Est. {college.established}
            </Metric>
            <Metric>
              <FaStar />
              {college.rating}/5
            </Metric>
            {college.ranking && (
              <Metric>
                <FaTrophy />
                {college.ranking}
              </Metric>
            )}
          </CollegeMetrics>
        </HeaderContent>
      </CollegeHeader>

      <MainContent>
        <div>
          <ContentSection>
            <h2>
              <FaUniversity />
              About College
            </h2>
            <p>{college.description}</p>
            <p>
              This prestigious institution has been a leader in {college.category.toLowerCase()} education 
              since {college.established}. With a strong focus on academic excellence, research, and 
              industry partnerships, we prepare students for successful careers in their chosen fields.
            </p>

            {college.ranking && (
              <RankingBadge>
                <FaTrophy />
                {college.ranking}
              </RankingBadge>
            )}
          </ContentSection>

          <ContentSection>
            <h2>
              <FaGraduationCap />
              Courses Offered
            </h2>
            <p>We offer a comprehensive range of programs:</p>
            <CoursesList>
              {additionalInfo.courses.map((course, index) => (
                <CourseItem key={index}>
                  <div className="course-name">{course}</div>
                  <div className="course-details">4 Years • Full Time</div>
                  <div className="course-seats">120 seats available</div>
                </CourseItem>
              ))}
            </CoursesList>
          </ContentSection>

          <ContentSection>
            <h2>
              <FaBook />
              Facilities & Infrastructure
            </h2>
            <p>World-class facilities to support your academic journey:</p>
            <FacilitiesList>
              {additionalInfo.facilities.map((facility, index) => (
                <FacilityItem key={index}>
                  <div className="facility-icon">{facility.icon}</div>
                  <div className="facility-name">{facility.name}</div>
                  <div className="facility-desc">{facility.desc}</div>
                </FacilityItem>
              ))}
            </FacilitiesList>
          </ContentSection>
        </div>

        <Sidebar>
          <InfoCard>
            <h3>
              <FaUniversity />
              College Information
            </h3>
            <InfoItem>
              <span className="label">Location</span>
              <span className="value">{college.location}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Established</span>
              <span className="value">{college.established}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Category</span>
              <span className="value">{college.category}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Type</span>
              <span className="value">Government</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Rating</span>
              <span className="value">{college.rating}/5 ⭐</span>
            </InfoItem>
            {college.ranking && (
              <InfoItem>
                <span className="label">Ranking</span>
                <span className="value">{college.ranking}</span>
              </InfoItem>
            )}
          </InfoCard>

          <InfoCard>
            <h3>
              <FaBriefcase />
              Placement Statistics
            </h3>
            <PlacementStats>
              <div className="stats-title">2023 Placement Highlights</div>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{additionalInfo.placementRate}</div>
                  <div className="stat-label">Placement Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{additionalInfo.averagePackage}</div>
                  <div className="stat-label">Average Package</div>
                </div>
              </div>
            </PlacementStats>
            <InfoItem>
              <span className="label">Top Recruiters</span>
              <span className="value">MNCs</span>
            </InfoItem>
          </InfoCard>

          <div>
            <ActionButton onClick={handleApplyNow}>
              <FaExternalLinkAlt />
              Apply Now
            </ActionButton>
            <ActionButton className="secondary" onClick={handleDownloadBrochure}>
              <FaDownload />
              Download Brochure
            </ActionButton>
          </div>
        </Sidebar>
      </MainContent>
    </CollegeDetailContainer>
  );
};

export default CollegeDetail;
