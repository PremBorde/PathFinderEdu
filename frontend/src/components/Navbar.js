import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGraduationCap } from 'react-icons/fa';
import SearchBar from './SearchBar';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;

  svg {
    color: #4299e1;
  }
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #4299e1;
  }

  &.active {
    color: #4299e1;
    border-bottom: 2px solid #4299e1;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 1.5rem;
  background: #4299e1;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #3182ce;
    transform: translateY(-2px);
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo to="/">
        <FaGraduationCap /> PathFinderEdu
      </Logo>
      
      <CenterSection>
        <SearchBar placeholder="Search careers, courses, colleges..." />
      </CenterSection>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/assessment" className="assessment-link">AI Assessment <span className="new-badge">New!</span></NavLink>
        <NavLink to="/streams">Streams</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <LoginButton to="/login">Log In</LoginButton>
      </NavLinks>
    </Nav>
  );
};

const styles = {
  '.assessment-link': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#4299e1',
    fontWeight: 'bold'
  },
  '.new-badge': {
    background: '#48bb78',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: 'bold'
  }
};

export default Navbar; 