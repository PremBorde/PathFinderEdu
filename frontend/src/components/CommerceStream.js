import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaChartLine, 
  FaBriefcase, 
  FaUniversity, 
  FaHandshake, 
  FaCalculator, 
  FaBuilding, 
  FaMoneyBillWave,
  FaChartBar,
  FaBullhorn,
  FaUserTie,
  FaPiggyBank,
  FaShieldAlt
} from 'react-icons/fa';
import CareerDetailModal from './CareerDetailModal';
import { questions } from '../data/assessmentQuestions';

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: ${({ theme }) => theme.commerce.gradient};
  color: ${({ theme }) => theme.commerce.text};
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
    background: radial-gradient(circle at 30% 50%, rgba(154, 230, 180, 0.1) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(56, 161, 105, 0.1) 0%, transparent 60%);
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
    border-color: #4A5568;
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
  background: #4A5568;
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

// Organized career data for Commerce stream
const careers = [
  // Finance & Accounting
  {
    id: 1,
    title: "Chartered Accountant",
    description: "Handle financial accounting, auditing, and taxation for organizations.",
    tags: ["Finance", "Accounting"],
    averageSalary: "₹7-30 LPA",
    jobGrowth: "20%",
    skills: ["Accounting", "Taxation", "Auditing"],
    qualifications: ["CA", "CMA Optional"],
    companies: ["Big 4", "Banks", "Corporate"],
    exams: ["CPT", "IPCC", "Final CA", "CET", "CUET"]
  },
  {
    id: 2,
    title: "Investment Banker",
    description: "Help organizations raise capital and manage financial transactions.",
    tags: ["Finance", "Banking"],
    averageSalary: "₹12-45 LPA",
    jobGrowth: "15%",
    skills: ["Financial Analysis", "Deal Making", "Market Knowledge"],
    qualifications: ["MBA Finance", "CFA"],
    companies: ["Goldman Sachs", "JP Morgan", "Morgan Stanley"],
    exams: ["CAT", "XAT", "CMAT", "CET", "CUET"]
  },
  {
    id: 3,
    title: "Financial Analyst",
    description: "Analyze financial data and provide investment recommendations.",
    tags: ["Finance", "Analysis"],
    averageSalary: "₹6-18 LPA",
    jobGrowth: "22%",
    skills: ["Financial Modeling", "Analysis", "Research"],
    qualifications: ["MBA Finance", "CFA"],
    companies: ["Investment Firms", "Banks", "Corporate"],
    exams: ["CAT", "XAT", "CFA", "CET", "CUET"]
  },

  // Business Management
  {
    id: 4,
    title: "Business Consultant",
    description: "Advise organizations on business strategy and operations.",
    tags: ["Management", "Consulting"],
    averageSalary: "₹8-35 LPA",
    jobGrowth: "25%",
    skills: ["Strategy", "Analysis", "Problem Solving"],
    qualifications: ["MBA", "Relevant Experience"],
    companies: ["McKinsey", "BCG", "Bain"],
    exams: ["CAT", "XAT", "GMAT", "CET", "CUET"]
  },
  {
    id: 5,
    title: "Operations Manager",
    description: "Manage and optimize business operations and processes.",
    tags: ["Management", "Operations"],
    averageSalary: "₹7-20 LPA",
    jobGrowth: "18%",
    skills: ["Operations", "Team Management", "Process Improvement"],
    qualifications: ["MBA Operations", "Six Sigma"],
    companies: ["Manufacturing", "Retail", "Services"],
    exams: ["CAT", "MAT", "CET", "CUET", "SNAP"]
  },
  {
    id: 6,
    title: "Project Manager",
    description: "Plan and execute business projects across various domains.",
    tags: ["Management", "Projects"],
    averageSalary: "₹8-25 LPA",
    jobGrowth: "20%",
    skills: ["Project Management", "Leadership", "Planning"],
    qualifications: ["MBA", "PMP Certification"],
    companies: ["IT Companies", "Construction", "Consulting"],
    exams: ["CAT", "MAT", "CET", "CUET", "XAT"]
  },

  // Marketing & Sales
  {
    id: 7,
    title: "Marketing Manager",
    description: "Develop and implement marketing strategies for products/services.",
    tags: ["Marketing", "Management"],
    averageSalary: "₹8-25 LPA",
    jobGrowth: "22%",
    skills: ["Marketing Strategy", "Brand Management", "Analytics"],
    qualifications: ["MBA Marketing"],
    companies: ["FMCG Companies", "Tech Companies"],
    exams: ["CAT", "XAT", "SNAP", "CET", "CUET"]
  },
  {
    id: 8,
    title: "Digital Marketing Specialist",
    description: "Handle online marketing campaigns and digital presence.",
    tags: ["Marketing", "Digital"],
    averageSalary: "₹5-15 LPA",
    jobGrowth: "30%",
    skills: ["Digital Marketing", "Social Media", "Analytics"],
    qualifications: ["Marketing Degree", "Digital Certifications"],
    companies: ["Digital Agencies", "E-commerce"],
    exams: ["CET", "CUET", "BBA Entrance", "Digital Marketing Certifications"]
  },
  {
    id: 9,
    title: "Sales Manager",
    description: "Lead sales teams and develop strategies to increase revenue.",
    tags: ["Sales", "Management"],
    averageSalary: "₹6-20 LPA",
    jobGrowth: "15%",
    skills: ["Sales Strategy", "Team Leadership", "Negotiation"],
    qualifications: ["MBA", "Sales Experience"],
    companies: ["Corporate Sales", "B2B Companies"],
    exams: ["CAT", "MAT", "CET", "CUET", "CMAT"]
  },

  // Banking & Insurance
  {
    id: 10,
    title: "Banking Professional",
    description: "Handle banking operations and financial services.",
    tags: ["Banking", "Finance"],
    averageSalary: "₹5-18 LPA",
    jobGrowth: "15%",
    skills: ["Banking Operations", "Financial Services", "Customer Relations"],
    qualifications: ["B.Com/MBA", "Banking Certifications"],
    companies: ["HDFC", "ICICI", "SBI"],
    exams: ["CET", "CUET", "IBPS", "SBI PO", "Banking Entrance"]
  },
  {
    id: 11,
    title: "Insurance Manager",
    description: "Manage insurance products, policies, and client relationships.",
    tags: ["Insurance", "Finance"],
    averageSalary: "₹6-20 LPA",
    jobGrowth: "12%",
    skills: ["Insurance Products", "Risk Assessment", "Client Management"],
    qualifications: ["Insurance Certifications", "MBA"],
    companies: ["LIC", "Private Insurance"],
    exams: ["CET", "CUET", "Insurance Institute Exams", "MBA Entrance"]
  },
  {
    id: 12,
    title: "Wealth Manager",
    description: "Provide financial planning and investment advice to clients.",
    tags: ["Finance", "Banking"],
    averageSalary: "₹8-30 LPA",
    jobGrowth: "20%",
    skills: ["Financial Planning", "Investment Management", "Client Relations"],
    qualifications: ["CFP", "MBA Finance"],
    companies: ["Private Banks", "Wealth Management Firms"],
    exams: ["CAT", "CFA", "CFP", "CET", "CUET"]
  }
];

// Simplified filter categories
const filters = {
  stream: ['all', 'bba', 'bcom', 'bca', 'economics', 'finance'],
  field: ['all', 'finance', 'marketing', 'management', 'banking', 'consulting', 'analytics'],
  careerType: ['all', 'corporate', 'government', 'startup', 'freelance'],
  salaryLevel: ['all', 'entry', 'mid', 'senior'],
  entranceExam: ['all', 'cat', 'mat', 'xat', 'cmat', 'snap', 'cet', 'cuet']
};

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
  background: ${({ theme }) => theme.commerce.primary};
  color: ${({ theme }) => theme.commerce.text};
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme }) => theme.commerce.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const AssessmentSection = styled.div`
  margin: 60px 0;
  padding: 40px;
  background: ${({ theme }) => theme.commerce.gradient};
  border-radius: 15px;
  text-align: center;
  color: ${({ theme }) => theme.commerce.text};
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
  border: 1px solid ${({ theme }) => theme.commerce.accent};
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => `${theme.commerce.primary}10`};
    border-color: ${({ theme }) => theme.commerce.primary};
  }

  &.selected {
    background: ${({ theme }) => theme.commerce.primary};
    color: white;
    border-color: ${({ theme }) => theme.commerce.primary};
  }
`;

const ResultCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommerceStream = () => {
  const [selectedFilters, setSelectedFilters] = useState({
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
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getFilteredCareers = () => {
    return careers.filter(career => {
      if (selectedFilters.field !== 'all' && !career.tags.includes(selectedFilters.field)) {
        return false;
      }

      if (selectedFilters.careerType !== 'all' && career.type !== selectedFilters.careerType) {
        return false;
      }

      if (selectedFilters.salaryLevel !== 'all') {
        const salary = parseInt(career.averageSalary.split('-')[1]);
        switch (selectedFilters.salaryLevel) {
          case 'entry':
            if (salary > 15) return false;
            break;
          case 'mid':
            if (salary <= 15 || salary > 25) return false;
            break;
          case 'senior':
            if (salary <= 25) return false;
            break;
          default:
            break;
        }
      }

      if (selectedFilters.entranceExam !== 'all' && !career.exams.includes(selectedFilters.entranceExam)) {
        return false;
      }

      return true;
    });
  };

  const handleCareerClick = (career) => {
    setSelectedCareer(career);
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.commerce.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      analyzeAnswers();
    }
  };

  const analyzeAnswers = () => {
    const optionCounts = answers.reduce((counts, answer) => {
      if (answer === 0) counts.finance++;
      else if (answer === 1) counts.marketing++;
      else if (answer === 2) counts.management++;
      else if (answer === 3) counts.analytics++;
      return counts;
    }, { finance: 0, marketing: 0, management: 0, analytics: 0 });

    const recommendedCareers = getRecommendedCareers(optionCounts);
    setRecommendedCareers(recommendedCareers);
    setShowResults(true);
  };

  const getRecommendedCareers = (counts) => {
    const recommendations = [];
    
    if (counts.finance >= 2) {
      recommendations.push(...careers.filter(career => 
        career.tags.includes("Finance") || career.tags.includes("Banking")
      ));
    }
    
    if (counts.marketing >= 2) {
      recommendations.push(...careers.filter(career => 
        career.tags.includes("Marketing") || career.tags.includes("Digital")
      ));
    }

    if (counts.management >= 2) {
      recommendations.push(...careers.filter(career => 
        career.tags.includes("Management") || career.tags.includes("Projects")
      ));
    }

    if (counts.analytics >= 2) {
      recommendations.push(...careers.filter(career => 
        career.tags.includes("Analysis") || career.tags.includes("Consulting")
      ));
    }

    return [...new Set(recommendations)].slice(0, 5); // Remove duplicates and get top 5
  };

  const handleQuizClick = () => {
    // TODO: Implement quiz functionality
    console.log("Quiz button clicked");
  };

  const getCareerIcon = (title) => {
    switch(title) {
      case "Chartered Accountant": return <FaCalculator />;
      case "Investment Banker": return <FaMoneyBillWave />;
      case "Financial Analyst": return <FaChartLine />;
      case "Business Consultant": return <FaBriefcase />;
      case "Operations Manager": return <FaBuilding />;
      case "Project Manager": return <FaChartBar />;
      case "Marketing Manager": return <FaBullhorn />;
      case "Digital Marketing Specialist": return <FaChartBar />;
      case "Sales Manager": return <FaHandshake />;
      case "Banking Professional": return <FaPiggyBank />;
      case "Insurance Manager": return <FaShieldAlt />;
      case "Wealth Manager": return <FaUserTie />;
      default: return <FaBriefcase />;
    }
  };

  return (
    <Container>
      <Header>
        <Title>Explore Business & Commerce Careers</Title>
        <Description>
          Discover dynamic career opportunities in business, finance, marketing, and management.
          From global markets to entrepreneurship, find your path to business success.
        </Description>
      </Header>

      <AssessmentSection id="assessment">
        <AssessmentTitle>Discover Your Business Path</AssessmentTitle>
        <AssessmentDescription>
          Take our comprehensive career assessment to find out which business and commerce
          field best matches your interests and skills.
        </AssessmentDescription>
        
        {!showResults ? (
          currentQuestionIndex === 0 ? (
            <CTAButton onClick={() => handleAnswerSelect(0)}>
              Start Assessment
            </CTAButton>
          ) : (
            <QuestionCard>
              <QuestionText>{questions.commerce[currentQuestionIndex].question}</QuestionText>
              {questions.commerce[currentQuestionIndex].options.map((option, index) => (
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
              value={selectedFilters.stream}
              onChange={(e) => handleFilterChange('stream', e.target.value)}
          >
              <option value="all">All</option>
              <option value="commerce">Commerce</option>
              <option value="commerce-maths">Commerce with Maths</option>
              <option value="commerce-economics">Commerce with Economics</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Field</FilterLabel>
            <Select 
              value={selectedFilters.field}
              onChange={(e) => handleFilterChange('field', e.target.value)}
            >
              <option value="all">All</option>
              <option value="Finance">Finance</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Banking">Banking</option>
              <option value="Insurance">Insurance</option>
              <option value="Consulting">Consulting</option>
              <option value="Accounting">Accounting</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Career Type</FilterLabel>
            <Select 
              value={selectedFilters.careerType}
              onChange={(e) => handleFilterChange('careerType', e.target.value)}
            >
              <option value="all">All</option>
              <option value="corporate">Corporate</option>
              <option value="entrepreneurship">Entrepreneurship</option>
              <option value="public-sector">Public Sector</option>
              <option value="consulting">Consulting</option>
              <option value="research">Research & Analysis</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Salary Level</FilterLabel>
            <Select 
              value={selectedFilters.salaryLevel}
              onChange={(e) => handleFilterChange('salaryLevel', e.target.value)}
            >
              <option value="all">All</option>
              <option value="entry">Entry Level (≤15 LPA)</option>
              <option value="mid">Mid Level (15-25 LPA)</option>
              <option value="senior">Senior Level (>25 LPA)</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Entrance Exam</FilterLabel>
            <Select 
              value={selectedFilters.entranceExam}
              onChange={(e) => handleFilterChange('entranceExam', e.target.value)}
            >
              <option value="all">All</option>
              <option value="CA">CA</option>
              <option value="CS">CS</option>
              <option value="CAT">CAT</option>
              <option value="MAT">MAT</option>
              <option value="GMAT">GMAT</option>
              <option value="CFA">CFA</option>
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
                <FaUniversity />
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
            <h3>What are the core subjects in Commerce stream?</h3>
            <p>
              The core subjects include Accountancy, Business Studies, Economics, and Mathematics.
              These subjects form the foundation for various career paths in commerce.
            </p>
          </FAQCard>
          <FAQCard>
            <h3>Which professional certifications are valuable?</h3>
            <p>
              Certifications like CA, CS, CFA, and MBA are highly valued in the commerce field.
              They enhance your expertise and career prospects significantly.
            </p>
          </FAQCard>
          <FAQCard>
            <h3>What are the emerging career opportunities?</h3>
            <p>
              Fintech, Digital Banking, Investment Analytics, and Sustainable Finance are
              emerging areas with excellent growth potential in the commerce sector.
            </p>
          </FAQCard>
        </FAQGrid>
      </FAQSection>



      {selectedCareer && (
        <CareerDetailModal
          career={{
            ...selectedCareer,
            stream: "Commerce",
            exams: ["CA/CS Entrance", "CAT/MAT", "GMAT"],
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

export default CommerceStream; 