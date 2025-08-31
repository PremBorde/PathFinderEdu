import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem 3rem;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 1.5rem 0;
`;

const Progress = styled.div`
  width: ${props => props.percent}%;
  height: 10px;
  background: ${({ theme }) => theme.buttonBackground};
  transition: width 0.4s ease;
`;

const QuestionText = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.5;
`;

const OptionsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled.button`
  padding: 1rem;
  border: 2px solid ${({ theme, isSelected }) => isSelected ? theme.buttonBackground : '#ccc'};
  border-radius: 10px;
  cursor: pointer;
  background: ${({ theme, isSelected }) => isSelected ? `${theme.buttonBackground}15` : 'transparent'};
  color: ${({ theme }) => theme.text};
  text-align: left;
  font-size: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.buttonBackground};
    background: ${({ theme }) => `${theme.buttonBackground}10`};
  }
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background: ${props => props.primary ? props.theme.buttonBackground : '#e0e0e0'};
  color: ${props => props.primary ? props.theme.buttonText : props.theme.text};
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  transition: all 0.2s;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const AssessmentModal = ({ questions, onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentStream, setCurrentStream] = useState('science');
  const [streamScores, setStreamScores] = useState({
    science: 0,
    arts: 0,
    commerce: 0
  });

  // Get total number of questions across all streams
  const totalQuestions = Object.values(questions).reduce(
    (total, streamQuestions) => total + streamQuestions.length, 
    0
  );

  // Get current question based on stream and index
  const getCurrentQuestion = () => {
    const currentStreamQuestions = questions[currentStream];
    return currentStreamQuestions[currentQuestionIndex];
  };

  const handleAnswer = (optionIndex) => {
    // Update answers
    const newAnswers = [...answers, { stream: currentStream, answer: optionIndex }];
    setAnswers(newAnswers);

    // Update stream scores
    const newStreamScores = { ...streamScores };
    newStreamScores[currentStream] += optionIndex === 0 ? 2 : // Best match for current stream
                                    optionIndex === 1 ? 1 : // Second best match
                                    0; // Other options
    setStreamScores(newStreamScores);

    // Move to next question or stream
    if (currentQuestionIndex < questions[currentStream].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If we've completed the current stream
      if (currentStream === 'science') {
        setCurrentStream('arts');
        setCurrentQuestionIndex(0);
      } else if (currentStream === 'arts') {
        setCurrentStream('commerce');
        setCurrentQuestionIndex(0);
      } else {
        // Assessment complete
        const recommendedStream = Object.entries(newStreamScores)
          .reduce((a, b) => a[1] > b[1] ? a : b)[0];
        
        Swal.fire({
          title: 'Assessment Complete!',
          text: `Based on your responses, we recommend exploring the ${recommendedStream.toUpperCase()} stream.`,
          icon: 'success',
          confirmButtonText: 'View Career Paths',
          confirmButtonColor: '#4299e1'
        }).then(() => {
          onComplete(recommendedStream);
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    } else if (currentStream === 'arts') {
      setCurrentStream('science');
      setCurrentQuestionIndex(questions.science.length - 1);
      setAnswers(answers.slice(0, -1));
    } else if (currentStream === 'commerce') {
      setCurrentStream('arts');
      setCurrentQuestionIndex(questions.arts.length - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  // Calculate overall progress
  const getProgress = () => {
    const completedQuestions = answers.length;
    return (completedQuestions / totalQuestions) * 100;
  };

  const currentQuestion = getCurrentQuestion();

  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>AI Career Assessment</h2>
        <ProgressBar>
          <Progress percent={getProgress()} />
        </ProgressBar>
        <QuestionText>{currentQuestion.question}</QuestionText>
        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <Option
              key={index}
              isSelected={answers[answers.length - 1]?.answer === index}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </Option>
          ))}
        </OptionsContainer>
        <NavButtons>
          <Button 
            onClick={handlePrevious}
            disabled={answers.length === 0}
          >
            Previous
          </Button>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            Question {answers.length + 1} of {totalQuestions}
          </div>
        </NavButtons>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AssessmentModal; 