import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 40px 20px 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: #fff;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>pathFinderEdu</h3>
          <p>Your trusted partner in career development</p>
        </FooterSection>
        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/scholarships">Scholarships</Link></li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>Contact</h3>
          <p>Email: info@pathfinderedu.com</p>
          <p>Phone: +91 XXX XXX XXXX</p>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 