import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaArrowLeft,
  FaGraduationCap,
  FaClock,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaStar,
  FaUsers,
  FaChartLine,
  FaBook,
  FaBriefcase,
  FaUniversity,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaDownload,
  FaPlay
} from 'react-icons/fa';
import { searchData } from '../data/searchData';

const CourseDetailContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 80px;
`;

const CourseHeader = styled.div`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
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
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
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

const CourseTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CourseSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CourseMetrics = styled.div`
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
      color: #4299e1;
      font-size: 1.2rem;
    }
  }

  p {
    color: #4a5568;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
`;

const SubjectsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const SubjectItem = styled.div`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid #4299e1;

  .subject-name {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }

  .subject-desc {
    font-size: 0.85rem;
    color: #718096;
  }
`;

const CareersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const CareerItem = styled.div`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
  }

  .career-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .career-salary {
    font-size: 0.9rem;
    opacity: 0.9;
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
      color: #4299e1;
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
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
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
    box-shadow: 0 8px 20px rgba(66, 153, 225, 0.3);
  }

  &.secondary {
    background: white;
    color: #4299e1;
    border: 2px solid #4299e1;

    &:hover {
      background: #f7fafc;
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
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  .icon {
    font-size: 4rem;
    color: #e2e8f0;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  p {
    color: #718096;
    margin-bottom: 2rem;
  }
`;

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find course in search data
    const allCourses = searchData.courses;
    const foundCourse = allCourses.find(c => c.id === courseId);
    
    setCourse(foundCourse);
    setLoading(false);
  }, [courseId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleApplyNow = () => {
    // In a real app, this would redirect to application form
    alert('Application feature coming soon!');
  };

  const handleDownloadBrochure = () => {
    // In a real app, this would download a PDF brochure
    alert('Brochure download feature coming soon!');
  };

  if (loading) {
    return (
      <CourseDetailContainer>
        <MainContent>
          <div>Loading...</div>
        </MainContent>
      </CourseDetailContainer>
    );
  }

  if (!course) {
    return (
      <CourseDetailContainer>
        <MainContent>
          <NotFound>
            <div className="icon">
              <FaBook />
            </div>
            <h2>Course Not Found</h2>
            <p>The course you're looking for doesn't exist or has been removed.</p>
            <ActionButton onClick={handleBack}>
              <FaArrowLeft />
              Go Back
            </ActionButton>
          </NotFound>
        </MainContent>
      </CourseDetailContainer>
    );
  }

  // Mock additional data for demo
  const additionalInfo = {
    subjects: course.subjects || [
      'Mathematics',
      'Physics',
      'Chemistry',
      'English',
      'Computer Science'
    ],
    careers: course.careers || [
      'Software Engineer',
      'Data Scientist',
      'Product Manager',
      'Tech Lead'
    ],
    eligibility: '12th Science with 60%+ marks',
    admissionProcess: 'JEE Main + JEE Advanced',
    totalSeats: '120 seats',
    placement: '95% placement rate'
  };

  return (
    <CourseDetailContainer>
      <CourseHeader>
        <HeaderContent>
          <BackButton onClick={handleBack}>
            <FaArrowLeft />
            Back to Search
          </BackButton>
          
          <CourseTitle>{course.title}</CourseTitle>
          <CourseSubtitle>{course.description}</CourseSubtitle>
          
          <CourseMetrics>
            <Metric>
              <FaClock />
              {course.duration}
            </Metric>
            <Metric>
              <FaRupeeSign />
              {course.fees}
            </Metric>
            <Metric>
              <FaMapMarkerAlt />
              {course.location}
            </Metric>
            <Metric>
              <FaStar />
              {course.rating}/5
            </Metric>
          </CourseMetrics>
        </HeaderContent>
      </CourseHeader>

      <MainContent>
        <div>
          <ContentSection>
            <h2>
              <FaBook />
              Course Overview
            </h2>
            <p>{course.description}</p>
            <p>
              This comprehensive program is designed to provide students with in-depth knowledge 
              and practical skills required for success in the {course.category.toLowerCase()} field. 
              Our curriculum is regularly updated to meet industry standards and emerging trends.
            </p>
            
            <TagsList>
              {course.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsList>
          </ContentSection>

          <ContentSection>
            <h2>
              <FaGraduationCap />
              Subjects & Curriculum
            </h2>
            <p>The course curriculum covers the following key subjects:</p>
            <SubjectsList>
              {additionalInfo.subjects.map((subject, index) => (
                <SubjectItem key={index}>
                  <div className="subject-name">{subject}</div>
                  <div className="subject-desc">Core subject in {course.category}</div>
                </SubjectItem>
              ))}
            </SubjectsList>
          </ContentSection>

          <ContentSection>
            <h2>
              <FaBriefcase />
              Career Opportunities
            </h2>
            <p>Graduates can pursue various career paths including:</p>
            <CareersList>
              {additionalInfo.careers.map((career, index) => (
                <CareerItem key={index}>
                  <div className="career-title">{career}</div>
                  <div className="career-salary">₹6-25 LPA</div>
                </CareerItem>
              ))}
            </CareersList>
          </ContentSection>
        </div>

        <Sidebar>
          <InfoCard>
            <h3>
              <FaUniversity />
              Course Information
            </h3>
            <InfoItem>
              <span className="label">Duration</span>
              <span className="value">{course.duration}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Fees</span>
              <span className="value">{course.fees}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Category</span>
              <span className="value">{course.category}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Stream</span>
              <span className="value">{course.stream}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Rating</span>
              <span className="value">{course.rating}/5 ⭐</span>
            </InfoItem>
          </InfoCard>

          <InfoCard>
            <h3>
              <FaCheckCircle />
              Admission Details
            </h3>
            <InfoItem>
              <span className="label">Eligibility</span>
              <span className="value">{additionalInfo.eligibility}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Admission</span>
              <span className="value">{additionalInfo.admissionProcess}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Total Seats</span>
              <span className="value">{additionalInfo.totalSeats}</span>
            </InfoItem>
            <InfoItem>
              <span className="label">Placement</span>
              <span className="value">{additionalInfo.placement}</span>
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
    </CourseDetailContainer>
  );
};

export default CourseDetail;
