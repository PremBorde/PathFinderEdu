import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 20px rgba(135, 206, 235, 0.3);
  }
  50% {
    text-shadow: 0 0 30px rgba(135, 206, 235, 0.6);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }
  
  #root {
    width: 100%;
    height: 100%;
  }
`;

const LandingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #87CEEB 0%, #1E90FF 50%, #4682B4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;

  &:nth-child(1) {
    width: 4px;
    height: 4px;
    top: 20%;
    left: 15%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 6px;
    height: 6px;
    top: 60%;
    right: 20%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    width: 3px;
    height: 3px;
    bottom: 30%;
    left: 25%;
    animation-delay: 4s;
  }

  &:nth-child(4) {
    width: 5px;
    height: 5px;
    top: 40%;
    right: 30%;
    animation-delay: 1s;
  }

  &:nth-child(5) {
    width: 2px;
    height: 2px;
    bottom: 60%;
    left: 70%;
    animation-delay: 3s;
  }

  &:nth-child(6) {
    width: 7px;
    height: 7px;
    top: 80%;
    right: 10%;
    animation-delay: 5s;
  }
`;





const Content = styled.div`
  text-align: center;
  z-index: 10;
  animation: ${fadeIn} 2s ease-out;
  position: relative;
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: ${pulse} 3s ease-in-out infinite;
  position: relative;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: 3px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  animation: ${fadeIn} 2s ease-out 0.3s both;
  background: linear-gradient(45deg, #ffffff, #f0f8ff, #ffffff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s ease-in-out infinite, ${fadeIn} 2s ease-out 0.3s both;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.4rem;
  font-weight: 300;
  margin-bottom: 3rem;
  letter-spacing: 2px;
  animation: ${fadeIn} 2s ease-out 0.6s both;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ClickPrompt = styled.div`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  animation: ${fadeIn} 2s ease-out 0.9s both;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: ${float} 8s ease-in-out infinite;

  &:nth-child(1) {
    width: 100px;
    height: 100px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 70%;
    right: 15%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    width: 80px;
    height: 80px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <>
      <GlobalStyle />
      <LandingContainer onClick={handleClick}>
        <BackgroundElements>
          <Particle />
          <Particle />
          <Particle />
          <Particle />
          <Particle />
          <Particle />
        </BackgroundElements>
        
        <FloatingOrbs>
          <Orb />
          <Orb />
          <Orb />
        </FloatingOrbs>
        
        <Content>
          <LogoContainer>
            <Logo>🎓</Logo>
          </LogoContainer>
          <Title>PathFinderEdu</Title>
          <Subtitle>Your journey to the perfect career starts here</Subtitle>
          <ClickPrompt>Click anywhere to begin</ClickPrompt>
        </Content>
      </LandingContainer>
    </>
  );
};

export default LandingPage;
