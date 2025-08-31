import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaFlask,
  FaUserMd,
  FaLaptopCode,
  FaMicroscope,
  FaDna,
  FaRobot,
  FaStethoscope,
  FaUniversity,
  FaChartBar,
  FaLandmark,
  FaHandshake,
  FaBalanceScale,
  FaCalculator,
  FaChartLine,
  FaBriefcase,
  FaPalette,
  FaPen,
  FaTheaterMasks,
  FaBook,
  FaPaintBrush,
  FaCamera,
  FaGlobe
} from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StreamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StreamCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid #e2e8f0;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.accentColor};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.accentColor}10;
    pointer-events: none;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: ${props => props.accentColor};
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      font-size: 2rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      color: #4a5568;

      svg {
        color: ${props => props.accentColor};
      }
    }
  }
`;

const StreamFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const FeatureTag = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.accentColor}15;
  color: ${props => props.accentColor};
  border-radius: 20px;
  font-size: 0.9rem;

  svg {
    font-size: 1rem;
  }
`;

const PopularExam = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.accentColor};
  margin-bottom: 1rem;

  svg {
    font-size: 1rem;
  }
`;

const CareerCount = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${props => props.accentColor}15;
  color: ${props => props.accentColor};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const streamData = [
  {
    title: 'Science',
    icon: <FaFlask />,
    accentColor: '#3182ce',
    careers: [
      { icon: <FaUserMd />, text: 'Medical Sciences' },
      { icon: <FaLaptopCode />, text: 'Engineering' },
      { icon: <FaMicroscope />, text: 'Research' }
    ],
    features: [
      { icon: <FaDna />, text: 'Biology' },
      { icon: <FaRobot />, text: 'Technology' },
      { icon: <FaStethoscope />, text: 'Healthcare' }
    ],
    examInfo: {
      icon: <FaUniversity />,
      exams: ['JEE', 'NEET', 'KVPY']
    },
    careerCount: '200+ Career Options'
  },
  {
    title: 'Commerce',
    icon: <FaChartBar />,
    accentColor: '#38a169',
    careers: [
      { icon: <FaLandmark />, text: 'Banking & Finance' },
      { icon: <FaHandshake />, text: 'Business Management' },
      { icon: <FaBalanceScale />, text: 'Chartered Accountancy' }
    ],
    features: [
      { icon: <FaCalculator />, text: 'Accounting' },
      { icon: <FaChartLine />, text: 'Economics' },
      { icon: <FaBriefcase />, text: 'Business' }
    ],
    examInfo: {
      icon: <FaUniversity />,
      exams: ['CA', 'CS', 'CAT']
    },
    careerCount: '150+ Career Options'
  },
  {
    title: 'Arts',
    icon: <FaPalette />,
    accentColor: '#805ad5',
    careers: [
      { icon: <FaPen />, text: 'Journalism' },
      { icon: <FaTheaterMasks />, text: 'Media & Entertainment' },
      { icon: <FaBook />, text: 'Literature & Languages' }
    ],
    features: [
      { icon: <FaPaintBrush />, text: 'Fine Arts' },
      { icon: <FaCamera />, text: 'Media Studies' },
      { icon: <FaGlobe />, text: 'Social Sciences' }
    ],
    examInfo: {
      icon: <FaUniversity />,
      exams: ['UPSC', 'NET', 'CLAT']
    },
    careerCount: '175+ Career Options'
  }
];

const Streams = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Title>EXPLORE CAREER STREAMS</Title>
        <Description>
          Discover comprehensive career paths tailored to your interests and aspirations.
          Choose from Science, Commerce, and Arts streams to find your perfect career match.
        </Description>
      </Header>

      <StreamGrid>
        {streamData.map((stream, index) => (
          <StreamCard 
            key={index}
            onClick={() => navigate(`/${stream.title.toLowerCase()}`)}
            accentColor={stream.accentColor}
          >
            <h3>
              {stream.icon}
              {stream.title}
            </h3>
            <ul>
              {stream.careers.map((career, idx) => (
                <li key={idx}>
                  {career.icon}
                  {career.text}
                </li>
              ))}
            </ul>
            <StreamFeatures>
              {stream.features.map((feature, idx) => (
                <FeatureTag key={idx} accentColor={stream.accentColor}>
                  {feature.icon}
                  {feature.text}
                </FeatureTag>
              ))}
            </StreamFeatures>
            <PopularExam accentColor={stream.accentColor}>
              {stream.examInfo.icon} Popular: {stream.examInfo.exams.join(", ")}
            </PopularExam>
            <CareerCount accentColor={stream.accentColor}>
              {stream.careerCount}
            </CareerCount>
          </StreamCard>
        ))}
      </StreamGrid>
    </Container>
  );
};

export default Streams; 