import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaBrain, 
  FaLightbulb, 
  FaChartLine, 
  FaUserGraduate,
  FaArrowRight,
  FaRedo,
  FaCheck,
  FaStar
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Added Link and useNavigate imports

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 2rem;
  width: 90%;
`;

const AssessmentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Question = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #4a5568;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const Option = styled.button`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: #4299e1;
    box-shadow: 0 10px 20px rgba(66, 153, 225, 0.1);
  }

  &.selected {
    background: #4299e1;
    border-color: #4299e1;
    color: white;

    p {
      color: white;
    }
  }

  .icon {
    font-size: 1.5rem;
    color: #4299e1;
    flex-shrink: 0;
  }

  &.selected .icon {
    color: white;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #718096;
    margin: 0;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e2e8f0;
  border-radius: 5px;
  margin: 2rem 0;
  overflow: hidden;

  .fill {
    height: 100%;
    background: #4299e1;
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  color: white;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const CareerMatch = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  margin-top: 2rem;
  backdrop-filter: blur(10px);
  animation: ${float} 3s ease-in-out infinite;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .match-percentage {
    font-size: 3rem;
    font-weight: bold;
    margin: 1rem 0;
    color: #48bb78;
  }

  .career-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .career-card {
    background: rgba(255, 255, 255, 0.15);
    padding: 1.5rem;
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.2);
    }
  }

  .explore-more {
    margin-top: 2rem;
    text-align: center;
    font-size: 1.1rem;
    opacity: 0.9;
    
    .paths-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
      padding: 0 1rem;
    }

    .path-link {
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 10px;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-3px);
      }

      svg {
        color: #FFD700;
      }
    }

    .explore-button {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 25px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      
      &:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
      }

      svg {
        font-size: 1.2rem;
      }
    }
  }
`;

const ActionButton = styled.button`
  background: white;
  color: #4299e1;
  border: none;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const assessmentQuestions = [
  {
    id: 1,
    question: "What do you like to do most?",
    description: "Think about what makes you happy",
    options: [
      {
        id: "a",
        text: "Solve Math Problems",
        description: "Working with numbers and finding answers",
        icon: <FaBrain />,
        traits: ["analytical", "logical"]
      },
      {
        id: "b",
        text: "Draw and Create",
        description: "Making art, music, or writing stories",
        icon: <FaLightbulb />,
        traits: ["creative", "innovative"]
      },
      {
        id: "c",
        text: "Lead Group Projects",
        description: "Organizing friends and making plans",
        icon: <FaChartLine />,
        traits: ["leadership", "management"]
      },
      {
        id: "d",
        text: "Help Other Students",
        description: "Teaching friends and helping them learn",
        icon: <FaUserGraduate />,
        traits: ["social", "teaching"]
      }
    ]
  },
  {
    id: 2,
    question: "How do you like to work?",
    description: "Choose what feels most comfortable",
    options: [
      {
        id: "a",
        text: "By Myself",
        description: "Working alone without distractions",
        icon: <FaBrain />,
        traits: ["independent", "focused"]
      },
      {
        id: "b",
        text: "With 2-3 Friends",
        description: "Working in a small group",
        icon: <FaLightbulb />,
        traits: ["collaborative", "team-oriented"]
      },
      {
        id: "c",
        text: "With Many People",
        description: "Working with a large group",
        icon: <FaChartLine />,
        traits: ["social", "networking"]
      },
      {
        id: "d",
        text: "Sometimes Alone, Sometimes with Others",
        description: "Mixing both ways of working",
        icon: <FaUserGraduate />,
        traits: ["adaptable", "versatile"]
      }
    ]
  },
  {
    id: 3,
    question: "What kind of problems do you like?",
    description: "Think about what excites you",
    options: [
      {
        id: "a",
        text: "Math and Science Problems",
        description: "Solving puzzles with numbers and facts",
        icon: <FaBrain />,
        traits: ["technical", "analytical"]
      },
      {
        id: "b",
        text: "Creative Projects",
        description: "Making something new and different",
        icon: <FaLightbulb />,
        traits: ["creative", "artistic"]
      },
      {
        id: "c",
        text: "Helping People",
        description: "Solving problems that help others",
        icon: <FaUserGraduate />,
        traits: ["empathetic", "social"]
      },
      {
        id: "d",
        text: "Planning and Organizing",
        description: "Making plans and getting things done",
        icon: <FaChartLine />,
        traits: ["strategic", "leadership"]
      }
    ]
  },
  {
    id: 4,
    question: "How do you learn best?",
    description: "What helps you understand new things?",
    options: [
      {
        id: "a",
        text: "By Doing Things",
        description: "Learning through hands-on practice",
        icon: <FaBrain />,
        traits: ["practical", "experiential"]
      },
      {
        id: "b",
        text: "By Seeing Pictures",
        description: "Learning through videos and diagrams",
        icon: <FaLightbulb />,
        traits: ["visual", "creative"]
      },
      {
        id: "c",
        text: "By Talking with Friends",
        description: "Learning through group discussions",
        icon: <FaUserGraduate />,
        traits: ["collaborative", "communicative"]
      },
      {
        id: "d",
        text: "By Reading and Studying",
        description: "Learning on your own from books",
        icon: <FaChartLine />,
        traits: ["independent", "analytical"]
      }
    ]
  },
  {
    id: 5,
    question: "What do you want to do when you grow up?",
    description: "Think about your dream job",
    options: [
      {
        id: "a",
        text: "Work with Computers",
        description: "Creating new technology and apps",
        icon: <FaBrain />,
        traits: ["innovative", "technical"]
      },
      {
        id: "b",
        text: "Help People",
        description: "Making life better for others",
        icon: <FaUserGraduate />,
        traits: ["social", "empathetic"]
      },
      {
        id: "c",
        text: "Run a Business",
        description: "Starting and managing companies",
        icon: <FaChartLine />,
        traits: ["entrepreneurial", "strategic"]
      },
      {
        id: "d",
        text: "Make Art or Music",
        description: "Creating beautiful things",
        icon: <FaLightbulb />,
        traits: ["creative", "artistic"]
      }
    ]
  },
  {
    id: 6,
    question: "What do you do for fun?",
    description: "Choose what you enjoy most",
    options: [
      {
        id: "a",
        text: "Solve Puzzles and Games",
        description: "Playing brain games and logic puzzles",
        icon: <FaBrain />,
        traits: ["analytical", "logical"]
      },
      {
        id: "b",
        text: "Draw, Paint, or Write",
        description: "Creating art, stories, or music",
        icon: <FaLightbulb />,
        traits: ["creative", "innovative"]
      },
      {
        id: "c",
        text: "Plan Events",
        description: "Organizing parties and activities",
        icon: <FaChartLine />,
        traits: ["leadership", "management"]
      },
      {
        id: "d",
        text: "Teach Friends",
        description: "Helping others learn new things",
        icon: <FaUserGraduate />,
        traits: ["social", "teaching"]
      }
    ]
  },
  {
    id: 7,
    question: "What keeps you going when things are hard?",
    description: "What motivates you to keep trying?",
    options: [
      {
        id: "a",
        text: "Solving Difficult Problems",
        description: "The challenge of finding solutions",
        icon: <FaBrain />,
        traits: ["analytical", "logical"]
      },
      {
        id: "b",
        text: "Creating Something Beautiful",
        description: "Making things that look good",
        icon: <FaLightbulb />,
        traits: ["creative", "innovative"]
      },
      {
        id: "c",
        text: "Working with a Team",
        description: "Achieving goals together",
        icon: <FaChartLine />,
        traits: ["leadership", "management"]
      },
      {
        id: "d",
        text: "Helping Other People",
        description: "Seeing others benefit from your work",
        icon: <FaUserGraduate />,
        traits: ["social", "teaching"]
      }
    ]
  },
  {
    id: 8,
    question: "What subjects do you like most in school?",
    description: "Pick the subjects you enjoy",
    options: [
      {
        id: "a",
        text: "Math, Science, and Computer Class",
        description: "Subjects with numbers and logic",
        icon: <FaBrain />,
        traits: ["analytical", "logical"]
      },
      {
        id: "b",
        text: "Art, Music, and English",
        description: "Creative and expressive subjects",
        icon: <FaLightbulb />,
        traits: ["creative", "innovative"]
      },
      {
        id: "c",
        text: "Business and Economics",
        description: "Subjects about money and trade",
        icon: <FaChartLine />,
        traits: ["leadership", "management"]
      },
      {
        id: "d",
        text: "Social Studies and Psychology",
        description: "Subjects about people and behavior",
        icon: <FaUserGraduate />,
        traits: ["social", "teaching"]
      }
    ]
  },
  {
    id: 9,
    question: "How do you like to be graded?",
    description: "What makes you feel successful?",
    options: [
      {
        id: "a",
        text: "Getting the Right Answer",
        description: "Being correct and accurate",
        icon: <FaBrain />,
        traits: ["analytical", "logical"]
      },
      {
        id: "b",
        text: "Being Creative",
        description: "Making something original",
        icon: <FaLightbulb />,
        traits: ["creative", "innovative"]
      },
      {
        id: "c",
        text: "Getting Results",
        description: "Achieving goals and targets",
        icon: <FaChartLine />,
        traits: ["leadership", "management"]
      },
      {
        id: "d",
        text: "Helping Others Learn",
        description: "Seeing others improve",
        icon: <FaUserGraduate />,
        traits: ["social", "teaching"]
      }
    ]
  },
  {
    id: 10,
    question: "What role do you take in group projects?",
    description: "What do you usually do in teams?",
    options: [
      {
        id: "a",
        text: "Problem Solver",
        description: "I fix issues and find solutions",
        icon: <FaBrain />,
        traits: ["analytical", "logical"]
      },
      {
        id: "b",
        text: "Creative Person",
        description: "I come up with new ideas",
        icon: <FaLightbulb />,
        traits: ["creative", "innovative"]
      },
      {
        id: "c",
        text: "Team Leader",
        description: "I organize and lead the group",
        icon: <FaChartLine />,
        traits: ["leadership", "management"]
      },
      {
        id: "d",
        text: "Helper",
        description: "I support and teach others",
        icon: <FaUserGraduate />,
        traits: ["social", "teaching"]
      }
    ]
  }
];

const careerSuggestions = {
  "analytical,logical": {
    title: "Science & Technology",
    careers: [
      {
        title: "Computer Programmer",
        description: "Write code to make apps and websites work",
        skills: ["Coding", "Problem Solving", "Math"]
      },
      {
        title: "Engineer",
        description: "Design and build machines and structures",
        skills: ["Math", "Science", "Design"]
      },
      {
        title: "Scientist",
        description: "Study and discover new things about the world",
        skills: ["Research", "Experiments", "Analysis"]
      }
    ],
    matchPercentage: 95,
    relatedStreams: ["Computer Science", "Information Technology", "Electronics"]
  },
  "creative,innovative": {
    title: "Arts & Design",
    careers: [
      {
        title: "Artist",
        description: "Create paintings, drawings, and digital art",
        skills: ["Drawing", "Creativity", "Design"]
      },
      {
        title: "Graphic Designer",
        description: "Make logos, posters, and website designs",
        skills: ["Design", "Creativity", "Computer Skills"]
      },
      {
        title: "Musician",
        description: "Play instruments and create music",
        skills: ["Music", "Creativity", "Performance"]
      }
    ],
    matchPercentage: 92,
    relatedStreams: ["Design", "Fine Arts", "Digital Media"]
  },
  "leadership,management": {
    title: "Business & Management",
    careers: [
      {
        title: "Business Manager",
        description: "Run companies and lead teams",
        skills: ["Leadership", "Planning", "Communication"]
      },
      {
        title: "Entrepreneur",
        description: "Start your own business",
        skills: ["Business Planning", "Leadership", "Money Management"]
      },
      {
        title: "Project Manager",
        description: "Plan and organize big projects",
        skills: ["Organization", "Leadership", "Planning"]
      }
    ],
    matchPercentage: 88,
    relatedStreams: ["Business Administration", "Economics", "Finance"]
  },
  "social,teaching": {
    title: "Education & Helping People",
    careers: [
      {
        title: "Teacher",
        description: "Help students learn and grow",
        skills: ["Teaching", "Patience", "Communication"]
      },
      {
        title: "Counselor",
        description: "Help people with their problems",
        skills: ["Listening", "Helping Others", "Communication"]
      },
      {
        title: "Social Worker",
        description: "Help people in need",
        skills: ["Helping Others", "Communication", "Problem Solving"]
      }
    ],
    matchPercentage: 90,
    relatedStreams: ["Education", "Psychology", "Social Sciences"]
  }
};

const AIAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));

    if (currentQuestion < assessmentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const traits = Object.values(answers).flatMap(answer => answer.traits);
    const mostCommonTraits = traits.slice(0, 2).join(',');
    setResult(careerSuggestions[mostCommonTraits]);
    setShowResult(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  // Guard against out-of-range indexes during hot reloads or state desync
  const safeIndex = Math.min(
    Math.max(currentQuestion, 0),
    Math.max(assessmentQuestions.length - 1, 0)
  );
  const progress = assessmentQuestions.length
    ? (((safeIndex + 1) / assessmentQuestions.length) * 100)
    : 0;

  return (
    <Container>
      {!showResult ? (
        <AssessmentCard>
          <ProgressBar progress={progress}>
            <div className="fill" />
          </ProgressBar>
          
          <Question>
            <h2>{assessmentQuestions[safeIndex]?.question || ''}</h2>
            <p>{assessmentQuestions[safeIndex]?.description || ''}</p>
          </Question>

          <OptionsGrid>
            {assessmentQuestions[safeIndex]?.options?.map(option => (
              <Option
                key={option.id}
                onClick={() => handleAnswer(assessmentQuestions[safeIndex].id, option)}
                className={answers[assessmentQuestions[safeIndex].id]?.id === option.id ? 'selected' : ''}
              >
                <span className="icon">{option.icon}</span>
                <div>
                  <h3>{option.text}</h3>
                  <p>{option.description}</p>
                </div>
              </Option>
            ))}
          </OptionsGrid>
        </AssessmentCard>
      ) : (
        <ResultCard>
          <h2>Your Career Path Analysis</h2>
          <p>Based on your responses, we've identified your ideal career direction!</p>

          <CareerMatch>
            <h3>{result.title}</h3>
            <div className="match-percentage">
              {result.matchPercentage}% Match <FaStar style={{ color: '#FFD700' }} />
            </div>
            <p>Recommended Careers:</p>
            <div className="career-grid">
              {result.careers.map((career, index) => (
                <div key={index} className="career-card">
                  <h4><FaCheck style={{ marginRight: '0.5rem' }} /> {career.title}</h4>
                  <p>{career.description}</p>
                  <div style={{ marginTop: '1rem' }}>
                    <strong>Key Skills:</strong>
                    <ul style={{ listStyle: 'none', padding: '0.5rem 0' }}>
                      {career.skills.map((skill, idx) => (
                        <li key={idx}>• {skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="explore-more">
              <p>Related Educational Paths:</p>
              <div className="paths-grid">
                {result.relatedStreams.map((stream, index) => (
                  <button 
                    key={index} 
                    onClick={() => {
                      if (stream.toLowerCase().includes('design') || stream.toLowerCase().includes('fine arts') || stream.toLowerCase().includes('digital media')) {
                        navigate('/arts');
                      } else if (stream.toLowerCase().includes('science') || stream.toLowerCase().includes('engineering') || stream.toLowerCase().includes('medical')) {
                        navigate('/science');
                      } else if (stream.toLowerCase().includes('commerce') || stream.toLowerCase().includes('business') || stream.toLowerCase().includes('finance')) {
                        navigate('/commerce');
                      } else {
                        navigate('/streams');
                      }
                    }}
                    className="path-link"
                  >
                    <FaChartLine />
                    {stream}
                  </button>
                ))}
              </div>
              <p style={{ marginTop: '1.5rem' }}>
                Want to discover more opportunities?
                <button onClick={() => navigate('/streams')} className="explore-button">
                  <FaArrowRight /> Explore Career Paths
                </button>
              </p>
            </div>
          </CareerMatch>

          <ActionButton onClick={resetAssessment}>
            Take Assessment Again <FaRedo />
          </ActionButton>
        </ResultCard>
      )}
    </Container>
  );
};

export default AIAssessment; 