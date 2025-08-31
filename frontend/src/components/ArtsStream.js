import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaNewspaper, 
  FaPencilAlt, 
  FaBullhorn, 
  FaBrain, 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaHandHoldingHeart,
  FaUsers,
  FaLanguage,
  FaHeart,
  FaHandsHelping,
  FaGlobe,
  FaChartLine
} from 'react-icons/fa';
import CareerDetailModal from './CareerDetailModal';
import { questions } from '../data/assessmentQuestions';

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: ${({ theme }) => theme.arts.gradient};
  color: ${({ theme }) => theme.arts.text};
  padding: 60px 20px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(214, 188, 250, 0.1) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(128, 90, 213, 0.1) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.2rem;
  opacity: 0.9;
`;

const FilterSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: #2d3748;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;

  &:hover {
    border-color: #553C9A;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const CareerCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  background: #553C9A;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const CardContent = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.text};

  p {
    margin-bottom: 1rem;
  }
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const CardDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
`;

const FAQSection = styled.div`
  margin-top: 60px;
  padding: 40px;
  background: #f7fafc;
  border-radius: 15px;
`;

const FAQTitle = styled.h2`
  text-align: center;
  color: #2d3748;
  margin-bottom: 30px;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FAQCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    color: #2d3748;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
  }
`;



const CTAButton = styled.button`
  background: ${({ theme }) => theme.arts.primary};
  color: ${({ theme }) => theme.arts.text};
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme }) => theme.arts.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const AssessmentSection = styled.div`
  margin: 60px 0;
  padding: 40px;
  background: ${({ theme }) => theme.arts.gradient};
  border-radius: 15px;
  text-align: center;
  color: ${({ theme }) => theme.arts.text};
`;

const AssessmentTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const AssessmentDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

const QuestionCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem auto;
  max-width: 800px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const QuestionText = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  text-align: left;
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid ${({ theme }) => theme.arts.accent};
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => `${theme.arts.primary}10`};
    border-color: ${({ theme }) => theme.arts.primary};
  }

  &.selected {
    background: ${({ theme }) => theme.arts.primary};
    color: white;
    border-color: ${({ theme }) => theme.arts.primary};
  }
`;

const ResultCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Organized career data for Arts stream
const careers = [
  // Media & Communication
  {
    id: 1,
    title: "Journalist",
    description: "Research and report news across print, broadcast, and digital media.",
    tags: ["Media", "Writing"],
    averageSalary: "₹4-15 LPA",
    jobGrowth: "12%",
    skills: ["Writing", "Research", "Communication"],
    qualifications: ["BA/MA Journalism"],
    companies: ["News Organizations", "Media Houses"],
    exams: ["CUET", "CET", "JAM", "JNU"]
  },
  {
    id: 2,
    title: "Content Writer",
    description: "Create engaging content for various digital and print platforms.",
    tags: ["Media", "Writing"],
    averageSalary: "₹3-12 LPA",
    jobGrowth: "25%",
    skills: ["Content Writing", "SEO", "Editing"],
    qualifications: ["BA English/Journalism"],
    companies: ["Digital Agencies", "Publishers"],
    exams: ["CUET", "CET", "University Entrance"]
  },
  {
    id: 3,
    title: "Public Relations Manager",
    description: "Manage organization's public image and communications strategy.",
    tags: ["Media", "Communication"],
    averageSalary: "₹6-20 LPA",
    jobGrowth: "15%",
    skills: ["PR", "Communication", "Media Relations"],
    qualifications: ["MA Mass Communication"],
    companies: ["PR Agencies", "Corporate"],
    exams: ["CUET", "CET", "JAM", "University Entrance"]
  },

  // Psychology & Counseling
  {
    id: 4,
    title: "Clinical Psychologist",
    description: "Diagnose and treat mental health issues through therapy and counseling.",
    tags: ["Psychology", "Healthcare"],
    averageSalary: "₹5-20 LPA",
    jobGrowth: "22%",
    skills: ["Counseling", "Assessment", "Therapy"],
    qualifications: ["MA/M.Phil Psychology"],
    companies: ["Hospitals", "Clinics", "Private Practice"],
    exams: ["CUET", "CET", "NET", "University Entrance"]
  },
  {
    id: 5,
    title: "School Counselor",
    description: "Provide guidance and support to students in educational settings.",
    tags: ["Psychology", "Education"],
    averageSalary: "₹4-12 LPA",
    jobGrowth: "18%",
    skills: ["Counseling", "Child Psychology"],
    qualifications: ["MA Psychology/Counseling"],
    companies: ["Schools", "Educational Institutions"],
    exams: ["CUET", "CET", "NET", "TET"]
  },
  {
    id: 6,
    title: "Career Counselor",
    description: "Guide individuals in making informed career choices and decisions.",
    tags: ["Psychology", "Counseling"],
    averageSalary: "₹4-15 LPA",
    jobGrowth: "20%",
    skills: ["Career Guidance", "Counseling", "Assessment"],
    qualifications: ["MA Psychology/Counseling"],
    companies: ["Educational Institutions", "Private Practice"],
    exams: ["CUET", "CET", "NET", "University Entrance"]
  },

  // Education & Teaching
  {
    id: 7,
    title: "Professor",
    description: "Teach and conduct research at college or university level.",
    tags: ["Education", "Teaching"],
    averageSalary: "₹6-15 LPA",
    jobGrowth: "10%",
    skills: ["Teaching", "Research", "Subject Expertise"],
    qualifications: ["PhD", "NET/SET"],
    companies: ["Universities", "Colleges"],
    exams: ["NET", "SET", "CUET", "CET"]
  },
  {
    id: 8,
    title: "Language Teacher",
    description: "Teach languages and literature to students at various levels.",
    tags: ["Education", "Languages"],
    averageSalary: "₹3-10 LPA",
    jobGrowth: "15%",
    skills: ["Language Teaching", "Communication"],
    qualifications: ["BA/MA Languages", "B.Ed"],
    companies: ["Schools", "Language Institutes"],
    exams: ["CUET", "CET", "TET", "B.Ed Entrance"]
  },
  {
    id: 9,
    title: "Special Educator",
    description: "Work with students who have special educational needs.",
    tags: ["Education", "Special Needs"],
    averageSalary: "₹4-12 LPA",
    jobGrowth: "20%",
    skills: ["Special Education", "Teaching", "Patience"],
    qualifications: ["B.Ed Special Education"],
    companies: ["Special Schools", "Inclusive Schools"],
    exams: ["B.Ed Entrance", "CET", "CUET", "TET"]
  },

  // Social Services
  {
    id: 10,
    title: "Social Worker",
    description: "Help individuals and communities overcome challenges and improve lives.",
    tags: ["Social Work", "Community"],
    averageSalary: "₹3-10 LPA",
    jobGrowth: "15%",
    skills: ["Counseling", "Community Work", "Advocacy"],
    qualifications: ["MSW", "Social Work License"],
    companies: ["NGOs", "Government Agencies"],
    exams: ["CUET", "CET", "University Entrance", "TISS-NET"]
  },
  {
    id: 11,
    title: "NGO Manager",
    description: "Manage non-profit organizations and social development projects.",
    tags: ["Social Work", "Management"],
    averageSalary: "₹4-15 LPA",
    jobGrowth: "18%",
    skills: ["Project Management", "Fundraising"],
    qualifications: ["MA Social Work/Development"],
    companies: ["NGOs", "International Organizations"],
    exams: ["CUET", "CET", "CAT", "University Entrance"]
  },
  {
    id: 12,
    title: "Community Development Officer",
    description: "Plan and implement community development programs.",
    tags: ["Social Work", "Development"],
    averageSalary: "₹4-12 LPA",
    jobGrowth: "16%",
    skills: ["Community Development", "Program Management"],
    qualifications: ["MA Social Work/Development"],
    companies: ["Government", "Development Organizations"],
    exams: ["CUET", "CET", "UPSC", "State PSC"]
  }
];

const ArtsStream = () => {
  const [filters, setFilters] = useState({
    stream: 'all',
    field: 'all',
    careerType: 'all',
    salaryLevel: 'all',
    entranceExam: 'all'
  });

  const [selectedCareer, setSelectedCareer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendedCareers, setRecommendedCareers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getFilteredCareers = () => {
    return careers.filter(career => {
      if (filters.field !== 'all' && !career.tags.includes(filters.field)) {
        return false;
      }

      if (filters.careerType !== 'all' && career.type !== filters.careerType) {
        return false;
      }

      if (filters.salaryLevel !== 'all') {
        const salary = parseInt(career.averageSalary.split('-')[1]);
        switch (filters.salaryLevel) {
          case 'entry':
            if (salary > 10) return false;
            break;
          case 'mid':
            if (salary <= 10 || salary > 15) return false;
            break;
          case 'senior':
            if (salary <= 15) return false;
            break;
          default:
            break;
        }
      }

      if (filters.entranceExam !== 'all' && !career.exams.includes(filters.entranceExam)) {
        return false;
      }

      return true;
    });
  };

  const handleCareerClick = (career) => {
    setSelectedCareer(career);
  };

  const getCareerIcon = (title) => {
    switch(title) {
      case "Journalist": return <FaNewspaper />;
      case "Content Writer": return <FaPencilAlt />;
      case "Public Relations Manager": return <FaBullhorn />;
      case "Clinical Psychologist": return <FaBrain />;
      case "School Counselor": return <FaGraduationCap />;
      case "Career Counselor": return <FaChalkboardTeacher />;
      case "Professor": return <FaGraduationCap />;
      case "Language Teacher": return <FaLanguage />;
      case "Special Educator": return <FaHeart />;
      case "Social Worker": return <FaHandHoldingHeart />;
      case "NGO Manager": return <FaUsers />;
      case "Community Development Officer": return <FaGlobe />;
      default: return <FaHandsHelping />;
    }
  };

  const handleQuizClick = () => {
    // TODO: Implement quiz functionality
    console.log("Quiz button clicked");
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.arts.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      analyzeAnswers();
    }
  };

  const analyzeAnswers = () => {
    const optionCounts = answers.reduce((counts, answer) => {
      if (answer === 0) counts.writing++;
      else if (answer === 1) counts.creative++;
      else if (answer === 2) counts.communication++;
      else if (answer === 3) counts.education++;
      return counts;
    }, { writing: 0, creative: 0, communication: 0, education: 0 });

    const recommendedCareers = getRecommendedCareers(optionCounts);
    setRecommendedCareers(recommendedCareers);
    setShowResults(true);
  };

  const getRecommendedCareers = (counts) => {
    const recommendations = [];
    
    if (counts.writing >= 2) {
      recommendations.push(...careers.filter(career => 
        career.tags.includes("Writing") || career.tags.includes("Media")
      ));
    }
    
    if (counts.creative >= 2) {
      recommendations.push(...careers.filter(career => 
        career.tags.includes("Design") || career.tags.includes("Art")
      ));
    }

    if (counts.communication >= 2) {
      recommendations.push(...careers.filter(career => 
        career.tags.includes("Communication") || career.tags.includes("Media")
      ));
    }

    if (counts.education >= 2) {
      recommendations.push(...careers.filter(career => 
        career.tags.includes("Education") || career.tags.includes("Teaching")
      ));
    }

    return [...new Set(recommendations)].slice(0, 5); // Remove duplicates and get top 5
  };

  return (
    <Container>
      <Header>
        <Title>Explore Arts & Humanities Careers</Title>
        <Description>
          Discover creative and fulfilling career paths in arts, media, education, and humanities.
          From storytelling to cultural impact, find your way to make a difference.
        </Description>
      </Header>

      <AssessmentSection id="assessment">
        <AssessmentTitle>Discover Your Creative Calling</AssessmentTitle>
        <AssessmentDescription>
          Take our comprehensive career assessment to find out which arts and humanities
          field best matches your interests and talents.
        </AssessmentDescription>
        
        {!showResults ? (
          currentQuestionIndex === 0 ? (
            <CTAButton onClick={() => handleAnswerSelect(0)}>
              Start Assessment
            </CTAButton>
          ) : (
            <QuestionCard>
              <QuestionText>{questions.arts[currentQuestionIndex].question}</QuestionText>
              {questions.arts[currentQuestionIndex].options.map((option, index) => (
                <OptionButton
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={answers[currentQuestionIndex] === index ? 'selected' : ''}
                >
                  {option}
                </OptionButton>
              ))}
            </QuestionCard>
          )
        ) : (
          <ResultCard>
            <h3>Based on your responses, here are your recommended career paths:</h3>
            <Grid>
              {recommendedCareers.map(career => (
                <CareerCard key={career.id} onClick={() => handleCareerClick(career)}>
                  <CardHeader>
                    {getCareerIcon(career.title)}
                    <CardTitle>{career.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{career.description}</p>
                    <CardDetail>
                      <strong>Average Salary:</strong> {career.averageSalary}
                    </CardDetail>
                    <CardDetail>
                      <strong>Job Growth:</strong> {career.jobGrowth}
                    </CardDetail>
                    <div>
                      {career.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </CardContent>
                </CareerCard>
              ))}
            </Grid>
            <CTAButton onClick={() => {
              setCurrentQuestionIndex(0);
              setAnswers([]);
              setShowResults(false);
            }}>
              Retake Assessment
            </CTAButton>
          </ResultCard>
        )}
      </AssessmentSection>

      <FilterSection>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Stream</FilterLabel>
            <Select 
              value={filters.stream}
              onChange={(e) => handleFilterChange('stream', e.target.value)}
            >
              <option value="all">All</option>
              <option value="arts">Arts</option>
              <option value="arts-psychology">Arts with Psychology</option>
              <option value="arts-sociology">Arts with Sociology</option>
              <option value="arts-literature">Arts with Literature</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Field</FilterLabel>
            <Select 
              value={filters.field}
              onChange={(e) => handleFilterChange('field', e.target.value)}
            >
              <option value="all">All</option>
              <option value="Media">Media & Communication</option>
              <option value="Psychology">Psychology</option>
              <option value="Education">Education</option>
              <option value="Social Work">Social Work</option>
              <option value="Writing">Writing & Content</option>
              <option value="Teaching">Teaching</option>
              <option value="Counseling">Counseling</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Career Type</FilterLabel>
            <Select 
              value={filters.careerType}
              onChange={(e) => handleFilterChange('careerType', e.target.value)}
            >
              <option value="all">All</option>
              <option value="education">Education</option>
              <option value="media">Media & Publishing</option>
              <option value="social-services">Social Services</option>
              <option value="research">Research & Academia</option>
              <option value="counseling">Counseling & Psychology</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Salary Level</FilterLabel>
            <Select 
              value={filters.salaryLevel}
              onChange={(e) => handleFilterChange('salaryLevel', e.target.value)}
            >
              <option value="all">All</option>
              <option value="entry">Entry Level (≤10 LPA)</option>
              <option value="mid">Mid Level (10-15 LPA)</option>
              <option value="senior">Senior Level (>15 LPA)</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Entrance Exam</FilterLabel>
            <Select 
              value={filters.entranceExam}
              onChange={(e) => handleFilterChange('entranceExam', e.target.value)}
            >
              <option value="all">All</option>
              <option value="CET">CET (Common Entrance Test)</option>
              <option value="CUET">CUET</option>
              <option value="NET">UGC NET</option>
              <option value="SET">SET</option>
              <option value="JAM">JAM</option>
              <option value="CLAT">CLAT</option>
              <option value="TET">TET (Teacher Eligibility Test)</option>
              <option value="B.Ed Entrance">B.Ed Entrance</option>
              <option value="UPSC">UPSC</option>
              <option value="TISS-NET">TISS-NET</option>
              <option value="JNU">JNU Entrance</option>
              <option value="University Entrance">University Entrance</option>
            </Select>
          </FilterGroup>
        </FilterGrid>
      </FilterSection>

      <Grid>
        {getFilteredCareers().map(career => (
          <CareerCard key={career.id} onClick={() => handleCareerClick(career)}>
            <CardHeader>
              {getCareerIcon(career.title)}
              <CardTitle>{career.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{career.description}</p>
              <div style={{ marginTop: '10px' }}>
                {career.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <CardDetail>
                <FaChartLine />
                {career.averageSalary}
              </CardDetail>
              <CardDetail>
                <FaGraduationCap />
                {career.qualifications[0]}
              </CardDetail>
            </CardContent>
          </CareerCard>
        ))}
      </Grid>

      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQGrid>
          <FAQCard>
            <h3>What are the core subjects in Arts stream?</h3>
            <p>
              The core subjects include Literature, History, Political Science, Psychology,
              Sociology, and optional languages. These subjects develop critical thinking and
              analytical skills.
            </p>
          </FAQCard>
          <FAQCard>
            <h3>What career paths are available after Arts?</h3>
            <p>
              Arts graduates can pursue careers in Education, Media, Publishing, Social Work,
              Psychology, Human Resources, Civil Services, and many other fields.
            </p>
          </FAQCard>
          <FAQCard>
            <h3>Which entrance exams should I prepare for?</h3>
            <p>
              Important exams include CET (Common Entrance Test) for undergraduate admissions,
              CUET for Central University admissions, NET/SET for teaching careers, UPSC for 
              civil services, CLAT for law, TET for teaching eligibility, and specific university 
              entrance exams for Masters programs in journalism, mass communication, and psychology.
            </p>
          </FAQCard>
        </FAQGrid>
      </FAQSection>



      {selectedCareer && (
        <CareerDetailModal
          career={{
            ...selectedCareer,
            stream: "Arts",
            exams: ["NET/SET", "TOEFL/IELTS", "GRE/GMAT"],
            degree: selectedCareer.qualifications[0],
            workAreas: selectedCareer.companies,
            salaryRange: selectedCareer.averageSalary,
            skills: selectedCareer.skills
          }}
          onClose={() => setSelectedCareer(null)}
        />
      )}
    </Container>
  );
};

export default ArtsStream; 