import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt, 
  FaChartLine, 
  FaStar, 
  FaTasks, 
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';

const DashboardContainer = styled.main`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  background: #ffffff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const WelcomeSection = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    color: #333;
    font-weight: 700;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const LogoutButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(229, 62, 62, 0.2);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      color: #4299e1;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #edf2f7;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;

  div {
    width: ${props => props.progress}%;
    height: 100%;
    background: #4299e1;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #edf2f7;
    color: #333;
    gap: 0.75rem;

    &:last-child {
      border-bottom: none;
    }

    svg {
      color: #4299e1;
      font-size: 1.1rem;
    }
  }
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #edf2f7;

  &:last-child {
    border-bottom: none;
  }

  .event-date {
    min-width: 60px;
    text-align: center;
    
    .day {
      font-size: 1.2rem;
      font-weight: 600;
      color: #4299e1;
    }
    
    .month {
      font-size: 0.9rem;
      color: #666;
    }
  }

  .event-details {
    flex: 1;

    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
      color: #333;
    }

    p {
      font-size: 0.9rem;
      color: #666;
    }
  }
`;

const ViewMoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #4299e1;
  font-size: 1rem;
  padding: 0.5rem 0;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }

  svg {
    font-size: 0.9rem;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.75rem 2rem;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #3182ce;
      transform: translateY(-2px);
    }
  }
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  if (!user) {
    return (
      <DashboardContainer>
        <LoginPrompt>
          <h2>Please Log In</h2>
          <p>You need to be logged in to view your dashboard</p>
          <button onClick={handleLoginClick}>Log In</button>
        </LoginPrompt>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <WelcomeSection>
          <h1>Welcome, {user?.name || 'Student'}!</h1>
          <p>Track your progress and explore career paths</p>
        </WelcomeSection>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </LogoutButton>
      </Header>

      <Grid>
        <Card>
          <h3><FaChartLine /> Assessment Results</h3>
          <p>Based on your assessment, your recommended stream is <strong>Science</strong>.</p>
          <p>You show strong aptitude in:</p>
          <List>
            <li><FaCheckCircle />Analytical Thinking</li>
            <li><FaCheckCircle />Problem Solving</li>
            <li><FaCheckCircle />Scientific Curiosity</li>
          </List>
          <ProgressBar progress={85}>
            <div />
          </ProgressBar>
          <ViewMoreButton onClick={() => navigate('/assessment')}>
            View Detailed Results <FaArrowRight />
          </ViewMoreButton>
        </Card>
        
        <Card>
          <h3><FaStar /> Saved Careers</h3>
          <List>
            <li><FaCheckCircle />Software Engineer</li>
            <li><FaCheckCircle />Data Scientist</li>
            <li><FaCheckCircle />AI/ML Engineer</li>
          </List>
          <ViewMoreButton onClick={() => navigate('/streams')}>
            Explore More Careers <FaArrowRight />
          </ViewMoreButton>
        </Card>
        
        <Card>
          <h3><FaTasks /> Progress Tracker</h3>
          <List>
            <li><FaClock />Career Assessment - Completed</li>
            <li><FaClock />Stream Selection - In Progress</li>
            <li><FaClock />College Research - Pending</li>
          </List>
          <ProgressBar progress={65}>
            <div />
          </ProgressBar>
          <ViewMoreButton onClick={() => navigate('/streams')}>
            View All Tasks <FaArrowRight />
          </ViewMoreButton>
        </Card>

        <Card>
          <h3><FaCalendarAlt /> Upcoming Events</h3>
          <EventItem>
            <div className="event-date">
              <div className="day">15</div>
              <div className="month">Aug</div>
            </div>
            <div className="event-details">
              <h4>JEE Advanced Workshop</h4>
              <p>Online preparation strategy session</p>
            </div>
          </EventItem>
          <EventItem>
            <div className="event-date">
              <div className="day">20</div>
              <div className="month">Aug</div>
            </div>
            <div className="event-details">
              <h4>Career Counseling</h4>
              <p>One-on-one session with expert</p>
            </div>
          </EventItem>
          <ViewMoreButton onClick={() => navigate('/home')}>
            View All Events <FaArrowRight />
          </ViewMoreButton>
        </Card>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard; 