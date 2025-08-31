import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 1rem 0; /* reduced height */
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  margin-bottom: 0;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const FooterTitle = styled.h2`
  font-size: 1.1rem; /* smaller title */
  margin-bottom: 0.25rem;
  font-weight: 500;
`;

const FooterSubtitle = styled.p`
  font-size: 0.85rem; /* smaller subtitle */
  margin-bottom: 0.75rem; /* tighter spacing */
  opacity: 0.9;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 0.75rem; /* tighter spacing */
  flex-wrap: wrap;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease;
  font-weight: 500;
  font-size: 0.9rem; /* smaller link text */
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  font-size: 0.8rem; /* smaller copyright */
  opacity: 0.8;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTitle>PathFinderEdu</FooterTitle>
        <FooterSubtitle>Guiding you towards the right career path</FooterSubtitle>
        <FooterLinks>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterLinks>
        <Copyright>© {new Date().getFullYear()} PathFinderEdu. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 