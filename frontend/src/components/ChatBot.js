import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { 
  FaRobot, 
  FaTimes, 
  FaComments, 
  FaUserGraduate
} from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const typing = keyframes`
  0%, 20% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
  60% { transform: translateY(0); }
  80% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

const ChatBotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: 'Inter', sans-serif;
`;

const ChatBotButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(66, 153, 225, 0.4);
  }

  &.open {
    animation: none;
  }
`;

const ChatBotWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideIn} 0.3s ease-out;
  border: 1px solid rgba(226, 232, 240, 0.8);

  &.closing {
    animation: ${slideOut} 0.3s ease-out;
  }

  @media (max-width: 480px) {
    width: 320px;
    height: 450px;
    right: -20px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #f8fafc;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
  }
`;

const Message = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: ${props => props.sender === 'user' ? 'row-reverse' : 'row'};
  align-items: flex-start;
  gap: 0.5rem;
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.4;
  word-wrap: break-word;

  ${props => props.sender === 'user' ? `
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    background: white;
    color: #2d3748;
    border: 1px solid #e2e8f0;
    border-bottom-left-radius: 4px;
  `}
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;

  ${props => props.sender === 'user' ? `
    background: #e2e8f0;
    color: #4a5568;
  ` : `
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    color: white;
  `}
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  border-bottom-left-radius: 4px;
  max-width: 80%;
  margin-bottom: 1rem;

  .dots {
    display: flex;
    gap: 0.25rem;
  }

  .dot {
    width: 6px;
    height: 6px;
    background: #cbd5e0;
    border-radius: 50%;
    animation: ${typing} 1.4s ease-in-out infinite;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;



const QuickReplies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuickReply = styled.button`
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #f7fafc;
    border-color: #4299e1;
    color: #4299e1;
  }
`;

const ChatBot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Career Guidance",
    "Scholarship Info",
    "Stream Selection",
    "Assessment Help",
    "Expert Consultation"
  ];

  const botResponses = {
    "career guidance": {
      text: "I can help you with career guidance! PathFinderEdu offers AI-powered assessments, expert counseling, and comprehensive career roadmaps. Would you like to take our AI assessment or connect with an expert?",
      suggestions: ["Take AI Assessment", "Book Expert Session", "Explore Streams"],
      action: null
    },
    "scholarship": {
      text: "Great! I'll take you to our scholarship section where you can find all available programs including MahaDBT Portal scholarships, Post Matric scholarships, and Merit-cum-Means scholarships.",
      suggestions: ["View Scholarships", "Application Process", "Eligibility Check"],
      action: "scroll_to_scholarship"
    },
    "stream": {
      text: "Choosing the right stream is crucial! I'll take you to our streams section where you can explore Science, Commerce, and Arts streams with 150+ career options each.",
      suggestions: ["Science Stream", "Commerce Stream", "Arts Stream"],
      action: "navigate_to_streams"
    },
    "assessment": {
      text: "Our AI assessment is designed to understand your interests, skills, and personality. I'll take you to the assessment page where you can start your personalized career evaluation.",
      suggestions: ["Start Assessment", "Sample Questions", "How it Works"],
      action: "navigate_to_assessment"
    },
    "expert": {
      text: "Our expert counselors have helped 10,000+ students. I'll scroll to our expert section where you can meet our counselors and book a free consultation session.",
      suggestions: ["Book Free Session", "Meet Our Experts", "Success Stories"],
      action: "scroll_to_experts"
    },
    "science": {
      text: "Science stream offers excellent career opportunities! I'll take you to our Science stream page where you can explore Medicine, Engineering, Technology, and Research careers.",
      suggestions: ["Medical Careers", "Engineering Careers", "Technology Careers"],
      action: "navigate_to_science"
    },
    "commerce": {
      text: "Commerce stream is perfect for business-minded individuals! I'll take you to our Commerce stream page where you can explore CA, Banking, Finance, and Business careers.",
      suggestions: ["CA Careers", "Banking Careers", "Finance Careers"],
      action: "navigate_to_commerce"
    },
    "arts": {
      text: "Arts stream is ideal for creative and analytical minds! I'll take you to our Arts stream page where you can explore Journalism, Media, Design, and Literature careers.",
      suggestions: ["Media Careers", "Design Careers", "Literature Careers"],
      action: "navigate_to_arts"
    },
    "home": {
      text: "I'll take you to our home page where you can explore all our services including career guidance, scholarships, and expert consultations.",
      suggestions: ["Career Guidance", "Scholarship Info", "Stream Selection"],
      action: "navigate_to_home"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        setMessages([{
          sender: 'bot',
          text: "Hello! I'm your PathFinderEdu assistant. I can help you with career guidance, scholarship information, stream selection, and more. How can I assist you today?",
          suggestions: quickReplies
        }]);
      }, 500);
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isTyping) return;

    const userMessage = { sender: 'user', text: messageText.trim() };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText.trim() })
      });
      
      if (response.ok) {
        const data = await response.json();
        const botMessage = {
          sender: 'bot',
          text: data.response,
          suggestions: data.suggestions,
          action: data.action
        };
        setMessages(prev => [...prev, botMessage]);
        
        // Execute action if present
        if (data.action) {
          setTimeout(() => executeAction(data.action), 1000);
        }
      } else {
        // Fallback to local response if API fails
        const localResponse = generateBotResponse(messageText.trim().toLowerCase());
        setMessages(prev => [...prev, localResponse]);
        
        // Execute action if present
        if (localResponse.action) {
          setTimeout(() => executeAction(localResponse.action), 1000);
        }
      }
    } catch (error) {
      console.error('ChatBot API Error:', error);
      // Fallback to local response
      const localResponse = generateBotResponse(messageText.trim().toLowerCase());
      setMessages(prev => [...prev, localResponse]);
      
      // Execute action if present
      if (localResponse.action) {
        setTimeout(() => executeAction(localResponse.action), 1000);
      }
    }
    
    setIsTyping(false);
  };

  const generateBotResponse = (userInput) => {
    // Check for keywords in user input
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (userInput.includes(keyword)) {
        return response;
      }
    }

    // Default response
    return {
      text: "I understand you're interested in career guidance. Let me help you better. What specific aspect would you like to know more about?",
      suggestions: quickReplies,
      action: null
    };
  };

  const executeAction = (action) => {
    switch (action) {
      case "scroll_to_scholarship":
        // Scroll to scholarship section on home page
        if (location.pathname === '/home') {
          const scholarshipSection = document.querySelector('.scholarship-section');
          if (scholarshipSection) {
            scholarshipSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          navigate('/home');
          setTimeout(() => {
            const scholarshipSection = document.querySelector('.scholarship-section');
            if (scholarshipSection) {
              scholarshipSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
        }
        // Close chatbot after scrolling
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }, 1500);
        break;

      case "scroll_to_experts":
        // Scroll to expert section on home page
        if (location.pathname === '/home') {
          const expertSection = document.querySelector('.expert-section');
          if (expertSection) {
            expertSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          navigate('/home');
          setTimeout(() => {
            const expertSection = document.querySelector('.expert-section');
            if (expertSection) {
              expertSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
        }
        // Close chatbot after scrolling
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }, 1500);
        break;

      case "navigate_to_streams":
        navigate('/streams');
        // Close chatbot after navigation
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }, 800);
        break;

      case "navigate_to_assessment":
        navigate('/assessment');
        // Close chatbot after navigation
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }, 800);
        break;

      case "navigate_to_science":
        navigate('/science');
        // Close chatbot after navigation
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }, 800);
        break;

      case "navigate_to_commerce":
        navigate('/commerce');
        // Close chatbot after navigation
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }, 800);
        break;

      case "navigate_to_arts":
        navigate('/arts');
        // Close chatbot after navigation
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }, 800);
        break;

      case "navigate_to_home":
        navigate('/home');
        // Close chatbot after navigation
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 300);
        }, 800);
        break;

      default:
        break;
    }
  };

  const handleQuickReply = (reply) => {
    setTimeout(() => handleSendMessage(reply), 100);
  };



  const toggleChat = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <ChatBotContainer>
      <ChatBotButton 
        onClick={toggleChat}
        className={isOpen ? 'open' : ''}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </ChatBotButton>

      {isOpen && (
        <ChatBotWindow className={isClosing ? 'closing' : ''}>
          <ChatHeader>
            <h3>
              <FaRobot />
              PathFinderEdu Assistant
            </h3>
            <button onClick={toggleChat}>
              <FaTimes />
            </button>
          </ChatHeader>

          <ChatMessages>
            {messages.map((message, index) => (
              <Message key={index} sender={message.sender}>
                <MessageAvatar sender={message.sender}>
                  {message.sender === 'user' ? <FaUserGraduate /> : <FaRobot />}
                </MessageAvatar>
                <div>
                  <MessageBubble sender={message.sender}>
                    {message.text}
                  </MessageBubble>
                  {message.suggestions && (
                    <QuickReplies>
                      {message.suggestions.map((suggestion, idx) => (
                        <QuickReply 
                          key={idx}
                          onClick={() => handleQuickReply(suggestion)}
                        >
                          {suggestion}
                        </QuickReply>
                      ))}
                    </QuickReplies>
                  )}
                </div>
              </Message>
            ))}

            {isTyping && (
              <Message sender="bot">
                <MessageAvatar sender="bot">
                  <FaRobot />
                </MessageAvatar>
                <TypingIndicator>
                  <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <span>Typing...</span>
                </TypingIndicator>
              </Message>
            )}

            <div ref={messagesEndRef} />
          </ChatMessages>


        </ChatBotWindow>
      )}
    </ChatBotContainer>
  );
};

export default ChatBot;
