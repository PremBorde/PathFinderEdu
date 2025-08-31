import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { questions } from '../data/assessmentQuestions';
import CareerInsightsChart from './CareerInsightsChart';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaUsers, 
  FaChartLine, 
  FaArrowRight, 
  FaQuoteLeft,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaMicroscope,
  FaCalculator,
  FaChartBar,
  FaPalette,
  FaTheaterMasks,
  FaBook,
  FaGavel,
  FaFlask, 
  FaDna, 
  FaRobot, 
  FaStethoscope,
  FaLandmark, 
  FaHandshake,
  FaBalanceScale,
  FaPen, 
  FaPaintBrush,
  FaCamera,
  FaGlobe,
  FaUserMd,
  FaUniversity,
  FaAward,
  FaHandHoldingHeart,
  FaUserGraduate,
  FaPercent,
  FaCheckCircle,
  FaInfoCircle,
  FaClock,
  FaCalendarAlt,
  FaRupeeSign,
  FaStar,
  FaLinkedin,
  FaEnvelope,
  FaMedal,
  FaBookReader,
  FaExternalLinkAlt,
  FaMapMarkedAlt
} from 'react-icons/fa';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HomeContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0;
  padding: 0;
  opacity: ${props => props.isLoaded ? 1 : 0};
  transform: ${props => props.isLoaded ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.8s ease-out;
  min-height: 100vh;
  position: relative;

  > *:not(footer) {
    padding: 0;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const HeroContainer = styled.div`
  width: calc(100% - 8px);
  margin: 4px;
  padding: 0;
  background: linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #1E90FF 100%);
  border-radius: 30px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  opacity: ${props => props.isLoaded ? 1 : 0};
  transform: ${props => props.isLoaded ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 0.8s ease-out 0.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const FloatingElements = styled.div`
  position: fixed;
    top: 0;
    left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const FloatingElement = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
  backdrop-filter: blur(1px);

  &:nth-child(1) {
    width: 146px;
    height: 146px;
    top: 5%;
    right: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 100px;
    height: 100px;
    top: 70%;
    right: 15%;
    animation-delay: 3s;
  }

  &:nth-child(3) {
    width: 80px;
    height: 80px;
    top: 15%;
    left: 8%;
    animation-delay: 6s;
  }

  &:nth-child(4) {
    width: 120px;
    height: 120px;
    bottom: 10%;
    left: 12%;
    animation-delay: 2s;
  }

  &:nth-child(5) {
    width: 60px;
    height: 60px;
    top: 45%;
    left: 5%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.6; }
    33% { transform: translateY(-15px) translateX(10px) rotate(120deg); opacity: 0.8; }
    66% { transform: translateY(-5px) translateX(-8px) rotate(240deg); opacity: 0.4; }
  }
`;

const HeroSection = styled.section`
  padding: 2rem 2rem 1.5rem;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  align-items: center;
  min-height: 46vh;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  text-align: center;
    padding: 1.5rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem;
    gap: 1.5rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: left;

  @media (max-width: 968px) {
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: white;
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;

  .highlight {
    background: linear-gradient(45deg, #00BFFF, #4169E1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    animation: textGlow 2s ease infinite alternate;
  }

  @keyframes textGlow {
    from { filter: drop-shadow(0 0 5px rgba(0, 191, 255, 0.3)); }
    to { filter: drop-shadow(0 0 15px rgba(65, 105, 225, 0.6)); }
  }
  
  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.7;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  max-width: 520px;
  
  @media (max-width: 1024px) {
  font-size: 1rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(45deg, #22C55E, #16A34A);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 60px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
    background: linear-gradient(45deg, #16A34A, #15803D);
  }

  svg {
    font-size: 0.95rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

const SecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.25);
  padding: 1rem 2rem;
  border-radius: 60px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
  }

  svg {
    font-size: 0.95rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

const FeatureList = styled.ul`
  display: none;
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CareerDashboard = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(25px);
  border-radius: 25px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: perspective(1200px) rotateY(-8deg) rotateX(3deg);
  transition: all 0.4s ease;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 420px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 25px;
    pointer-events: none;
  }

  &:hover {
    transform: perspective(1200px) rotateY(-4deg) rotateX(1deg);
    box-shadow: 0 35px 80px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1024px) {
    transform: none;
    max-width: 500px;
  }
`;

const StatsBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(45deg, #00BFFF, #4169E1);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  color: white;
  position: relative;
  z-index: 2;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 0.75rem;
    opacity: 0.8;
  }
`;

const DashboardIcon = styled.div`
  width: 55px;
  height: 55px;
  background: linear-gradient(45deg, #00BFFF, #4169E1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: iconPulse 3s ease infinite;

  @keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const CareerPaths = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  z-index: 2;
`;

const CareerPath = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(12px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CareerPathButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
    color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PathIcon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 12px;
    display: flex;
    align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  
  &.tech { 
    background: linear-gradient(45deg, #4682B4, #1E90FF); 
  }
  
  &.design { 
    background: linear-gradient(45deg, #87CEEB, #00BFFF); 
  }
  
  &.business { 
    background: linear-gradient(45deg, #5F9EA0, #4682B4); 
  }
`;

const PathInfo = styled.div`
  h4 {
    color: white;
    font-weight: 700;
    margin-bottom: 0.2rem;
    font-size: 0.9rem;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  }

  p {
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.7rem;
    font-weight: 500;
  }
`;

// AI Assessment: engaging, animated interest picker
const AssessmentSection = styled.section`
  margin: 2rem 0;
  padding: 2rem;
  display: none;
  background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  backdrop-filter: blur(12px);
  animation: ${fadeIn} 0.6s ease-out;
`;

const AssessHeader = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 1.25rem;

  h2 {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 0.4rem;
    text-shadow: 2px 2px 10px rgba(0,0,0,0.25);
  }

  p {
    font-size: 0.95rem;
    opacity: 0.85;
  }
`;

const ProgressTrack = styled.div`
  height: 8px;
  background: rgba(255,255,255,0.18);
  border-radius: 999px;
  overflow: hidden;
  margin: 0.75rem auto 1.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #87CEEB, #1E90FF);
  transition: width 0.45s ease;
`;

const InterestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InterestCard = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.1rem;
  border-radius: 16px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.14);
  color: white;
  text-align: left;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);

  &:hover {
    transform: translateY(-4px);
    background: rgba(255,255,255,0.16);
  }

  &.selected {
    background: rgba(255,255,255,0.22);
    box-shadow: 0 12px 28px rgba(0,0,0,0.2);
    border-color: rgba(255,255,255,0.3);
  }
`;

const InterestIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  box-shadow: 0 8px 18px rgba(0,0,0,0.18);

  &.science { background: linear-gradient(45deg, #4b6cb7, #182848); }
  &.arts { background: linear-gradient(45deg, #00B4DB, #0083B0); }
  &.commerce { background: linear-gradient(45deg, #1E90FF, #00BFFF); }
  &.teaching { background: linear-gradient(45deg, #5F9EA0, #4682B4); }
`;

const InterestText = styled.div`
  h4 {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 0.15rem;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.25);
  }
  p {
    font-size: 0.86rem;
    opacity: 0.9;
  }
`;

const ResultPanel = styled.div`
  margin-top: 1.25rem;
  padding: 1rem;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
`;

const ResultButton = styled.button`
  margin-left: auto;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.16);
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover { transform: translateY(-2px); background: rgba(255,255,255,0.22); }
`;

const StatsSection = styled.section`
  margin: 2rem 0;
  animation: ${fadeIn} 1s ease-out;
  
  @media (max-width: 768px) {
    margin: 1.5rem 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-10px);
  }

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.text};
    font-size: 1.1rem;
  }
`;

const StreamsSection = styled.section`
  margin: 2rem 0;
  scroll-margin-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.6s ease-out forwards;
  
  @media (max-width: 768px) {
    margin: 1.5rem 0;
    scroll-margin-top: 1rem;
  }
`;

const StreamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.6s ease-out forwards 0.3s;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const StreamCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(0) scale(1);
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => props.index * 0.2}s;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.8rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 1;

    .stream-icon {
      font-size: 2rem;
      color: ${props => props.accentColor || '#4299e1'};
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  li {
    font-size: 1rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    svg {
      color: ${props => props.accentColor || '#4299e1'};
    }
  }
`;

const CareerCount = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${props => props.accentColor};
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const PopularExam = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${props => props.accentColor || props.theme.primary};
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${props => props.accentColor || props.theme.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1rem;
  }
`;

const StreamFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const NewsSection = styled.section`
  margin: 2rem 0;
  padding: 1rem 0;

  @media (max-width: 768px) {
    margin: 1.5rem 0;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const NewsCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .image {
    height: 200px;
    background: ${props => props.bgColor || '#f0f4f8'};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 3rem;
      color: white;
    }
  }

  .content {
    padding: 1.5rem;

    h3 {
      font-size: 1.25rem;
  margin-bottom: 1rem;
      color: ${({ theme }) => theme.text};
    }

    p {
      color: ${({ theme }) => theme.textLight};
      margin-bottom: 1rem;
    }

    .date {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.textLight};
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

const FeatureTag = styled.div`
  background: ${props => props.accentColor ? `${props.accentColor}15` : props.theme.body};
  color: ${props => props.accentColor || props.theme.text};
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const GuidanceTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out forwards;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const GuidanceSubtitle = styled.p`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out forwards 0.2s;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const GuidanceFeatures = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.85rem;
  font-weight: 500;
  
  svg {
    color: #4299e1;
    font-size: 1rem;
  }
`;

const EnhancedCTAButton = styled.a`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(66, 153, 225, 0.3);
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out forwards 0.4s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(66, 153, 225, 0.4);
    background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem 1.8rem;
    font-size: 0.9rem;
  }
`;

const ScholarshipSection = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const ScholarshipCard = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.body};
  border-radius: 10px;
  margin-top: 2rem;

  h3 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.text};
  }
`;

const SuccessStoriesSection = styled.section`
  margin: 4rem 0;
`;

const StoryCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};

  h3 {
  color: ${({ theme }) => theme.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
  }

  blockquote {
    color: ${({ theme }) => theme.text};
    font-style: italic;
    border-left: 4px solid ${({ theme }) => theme.buttonBackground};
    padding-left: 1rem;
    margin: 1rem 0;
  }
`;

const GuidanceSection = styled.section`
  text-align: center;
  margin: 4rem 0;
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e0 100%);
  border-radius: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.8);
  min-height: 400px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM38.315 0L29.828 8.485 27.657 10.657 38.315 0zm5.657 0l-5.657 5.657L36.485 7.485 42.97 0h1zM0 0c1.837 4.243 4.858 7.264 9.1 9.1L0 0zm0 5.656l8.485 8.485-1.414 1.414L0 8.485v-2.83zm0 5.656l8.485 8.485-1.414 1.414L0 14.142V11.31z' fill='rgba(66, 153, 225, 0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.6;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -30%;
    right: -15%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(66, 153, 225, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 10s ease-in-out infinite;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
    min-height: 350px;
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e4e9f2 100%);
  border-radius: 30px;
  margin: 4rem 0;
  position: relative;
  overflow: visible;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM38.315 0L29.828 8.485 27.657 10.657 38.315 0zm5.657 0l-5.657 5.657L36.485 7.485 42.97 0h1zM0 0c1.837 4.243 4.858 7.264 9.1 9.1L0 0zm0 5.656l8.485 8.485-1.414 1.414L0 8.485v-2.83zm0 5.656l8.485 8.485-1.414 1.414L0 14.142V11.31z' fill='rgba(66, 153, 225, 0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.5;
    z-index: -1;
    border-radius: 30px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #2b6cb0, #6b46c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 0.95rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: 0.2s;
`;

const TestimonialsSection = styled.section`
  margin: 4rem 0;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='rgba(66, 153, 225, 0.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.2;
  }
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  .quote-icon {
    font-size: 3rem;
    color: #ed8936;
    opacity: 0.2;
    position: absolute;
    top: 2rem;
    left: 2rem;
  }

  blockquote {
    font-size: 1.25rem;
    line-height: 1.8;
    color: #2d3748;
    margin: 1rem 0 2rem;
    position: relative;
    z-index: 1;
  }

  h4 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  p {
    color: #718096;
    font-size: 1rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 1rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${props => props.index * 0.2}s;
  opacity: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 1;
    }

    svg {
      transform: scale(1.1) rotate(5deg);
      color: #4299e1;
    }
  }

  svg {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #2d3748;
    transition: all 0.3s ease;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #2d3748;
  }

  p {
    color: #718096;
    line-height: 1.6;
  }
`;

const ExpertGuidanceSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 30px;
  margin: 4rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM38.315 0L29.828 8.485 27.657 10.657 38.315 0zm5.657 0l-5.657 5.657L36.485 7.485 42.97 0h1zM0 0c1.837 4.243 4.858 7.264 9.1 9.1L0 0zm0 5.656l8.485 8.485-1.414 1.414L0 8.485v-2.83zm0 5.656l8.485 8.485-1.414 1.414L0 14.142V11.31z' fill='rgba(66, 153, 225, 0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.5;
  }
`;

const ExpertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
`;

const ExpertCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      ${props => props.expertColor || '#4299e1'}10 0%, 
      ${props => props.expertColor || '#4299e1'}05 50%, 
      transparent 100%);
    opacity: 0;
    transition: all 0.4s ease;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      ${props => props.expertColor || '#4299e1'}, 
      ${props => props.expertColor || '#4299e1'}80, 
      ${props => props.expertColor || '#4299e1'}60);
    border-radius: 22px;
    opacity: 0;
    transition: all 0.4s ease;
    z-index: -1;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: ${props => props.expertColor || '#4299e1'};

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 1;
      animation: borderGlow 2s ease-in-out infinite alternate;
    }
  }

  &:hover .expert-name {
    color: ${props => props.expertColor || '#4299e1'};
    transform: translateY(-2px);
  }

  &:hover .expert-image {
    transform: scale(1.1) rotate(5deg);
  }

  &:hover .specialty-tag {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${props => props.expertColor || '#4299e1'}30;
  }

  &:hover .stat-number {
    transform: scale(1.1);
    color: ${props => props.expertColor || '#4299e1'};
  }

  &:hover .social-link {
    transform: translateY(-3px) scale(1.1);
  }

  @keyframes borderGlow {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;

const ExpertImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin: 0 auto 1.5rem;
  background: ${props => props.color || '#4299e1'}15;
  color: ${props => props.color || '#4299e1'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: conic-gradient(
      ${props => props.color || '#4299e1'}, 
      ${props => props.color || '#4299e1'}80, 
      ${props => props.color || '#4299e1'}40, 
      ${props => props.color || '#4299e1'}
    );
    border-radius: 65px;
    opacity: 0;
    transition: all 0.4s ease;
    animation: rotate 3s linear infinite;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 2px solid ${props => props.color || '#4299e1'};
    border-radius: 63px;
    opacity: 0.3;
    pointer-events: none;
    transition: all 0.4s ease;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    border: none;
    position: relative;
    z-index: 1;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    filter: brightness(1) contrast(1) saturate(1);
  }

  &:hover {
    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 0.8;
      transform: scale(1.1);
      box-shadow: 0 0 20px ${props => props.color || '#4299e1'}40;
    }

    img {
      filter: brightness(1.1) contrast(1.1) saturate(1.2);
      transform: scale(1.05);
    }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ExpertName = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${props => props.color || '#4299e1'};
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  .expert-card:hover & {
    &::after {
      width: 100%;
    }
  }
`;

const ExpertTitle = styled.div`
  color: ${props => props.color || '#4299e1'};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ExpertSpecialties = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SpecialtyTag = styled.span`
  background: ${props => props.color || '#4299e1'}15;
  color: ${props => props.color || '#4299e1'};
  padding: 0.25rem 0.6rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ExpertStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  margin: 1rem 0;
  padding: 0.8rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
`;

const StatItem = styled.div`
  text-align: center;

  .number {
  font-size: 1rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.15rem;
  }

  .label {
    font-size: 0.75rem;
    color: #718096;
  }
`;

const ExpertLinks = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: ${props => props.color || '#4299e1'};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }
`;

const renderIcon = (iconName) => {
  switch (iconName) {
    case 'FaFlask': return <FaFlask />;
    case 'FaUserMd': return <FaUserMd />;
    case 'FaLaptopCode': return <FaLaptopCode />;
    case 'FaMicroscope': return <FaMicroscope />;
    case 'FaDna': return <FaDna />;
    case 'FaRobot': return <FaRobot />;
    case 'FaStethoscope': return <FaStethoscope />;
    case 'FaUniversity': return <FaUniversity />;
    case 'FaChartBar': return <FaChartBar />;
    case 'FaLandmark': return <FaLandmark />;
    case 'FaHandshake': return <FaHandshake />;
    case 'FaBalanceScale': return <FaBalanceScale />;
    case 'FaCalculator': return <FaCalculator />;
    case 'FaChartLine': return <FaChartLine />;
    case 'FaBriefcase': return <FaBriefcase />;
    case 'FaPalette': return <FaPalette />;
    case 'FaPen': return <FaPen />;
    case 'FaTheaterMasks': return <FaTheaterMasks />;
    case 'FaBook': return <FaBook />;
    case 'FaPaintBrush': return <FaPaintBrush />;
    case 'FaCamera': return <FaCamera />;
    case 'FaGlobe': return <FaGlobe />;
    case 'FaAward': return <FaAward />;
    case 'FaHandHoldingHeart': return <FaHandHoldingHeart />;
    case 'FaUserGraduate': return <FaUserGraduate />;
    case 'FaCheckCircle': return <FaCheckCircle />;
    case 'FaInfoCircle': return <FaInfoCircle />;
    case 'FaPercent': return <FaPercent />;
    case 'FaGraduationCap': return <FaGraduationCap />;
    default: return null;
  }
};

const streamData = [
  {
    title: 'Science',
    icon: 'FaFlask',
    accentColor: '#3182ce',
    careers: [
      { icon: 'FaUserMd', text: 'Medical Sciences' },
      { icon: 'FaLaptopCode', text: 'Engineering' },
      { icon: 'FaMicroscope', text: 'Research' }
    ],
    features: [
      { icon: 'FaDna', text: 'Biology' },
      { icon: 'FaRobot', text: 'Technology' },
      { icon: 'FaStethoscope', text: 'Healthcare' }
    ],
    examInfo: {
      icon: 'FaUniversity',
      exams: ['JEE', 'NEET', 'KVPY']
    },
    careerCount: '200+ Career Options'
  },
  {
    title: 'Commerce',
    icon: 'FaChartBar',
    accentColor: '#38a169',
    careers: [
      { icon: 'FaLandmark', text: 'Banking & Finance' },
      { icon: 'FaHandshake', text: 'Business Management' },
      { icon: 'FaBalanceScale', text: 'Chartered Accountancy' }
    ],
    features: [
      { icon: 'FaCalculator', text: 'Accounting' },
      { icon: 'FaChartLine', text: 'Economics' },
      { icon: 'FaBriefcase', text: 'Business' }
    ],
    examInfo: {
      icon: 'FaUniversity',
      exams: ['CA', 'CS', 'CAT']
    },
    careerCount: '150+ Career Options'
  },
  {
    title: 'Arts',
    icon: 'FaPalette',
    accentColor: '#805ad5',
    careers: [
      { icon: 'FaPen', text: 'Journalism' },
      { icon: 'FaTheaterMasks', text: 'Media & Entertainment' },
      { icon: 'FaBook', text: 'Literature & Languages' }
    ],
    features: [
      { icon: 'FaPaintBrush', text: 'Fine Arts' },
      { icon: 'FaCamera', text: 'Media Studies' },
      { icon: 'FaGlobe', text: 'Social Sciences' }
    ],
    examInfo: {
      icon: 'FaUniversity',
      exams: ['UPSC', 'NET', 'CLAT']
    },
    careerCount: '175+ Career Options'
  }
];

const ScholarshipContainer = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 30px;
  margin: 4rem 0;
  position: relative;
  overflow: visible;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM38.315 0L29.828 8.485 27.657 10.657 38.315 0zm5.657 0l-5.657 5.657L36.485 7.485 42.97 0h1zM0 0c1.837 4.243 4.858 7.264 9.1 9.1L0 0zm0 5.656l8.485 8.485-1.414 1.414L0 8.485v-2.83zm0 5.656l8.485 8.485-1.414 1.414L0 14.142V11.31z' fill='rgba(66, 153, 225, 0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.5;
    z-index: -1;
    border-radius: 30px;
  }
`;

const ScholarshipHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;

  h2 {
    font-size: 2.5rem;
    background: linear-gradient(120deg, #2b6cb0, #6b46c1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.6;
  }
`;

const ScholarshipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ScholarshipItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${props => props.color || '#4299e1'};
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  gap: 0.6rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ScholarshipIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.color || '#4299e1'}15;
  color: ${props => props.color || '#4299e1'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ScholarshipTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ScholarshipAmount = styled.div`
  background: ${props => props.color || '#4299e1'}10;
  color: ${props => props.color || '#4299e1'};
  padding: 0.8rem;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  svg {
    font-size: 1.2rem;
  }
`;

const ScholarshipInfo = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.3rem 0;
  color: ${({ theme }) => theme.text};

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    margin-bottom: 0.3rem;

    svg {
      color: ${props => props.color || '#4299e1'};
      font-size: 0.9rem;
    }
  }
`;

const ScholarshipMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.6rem;
  border-top: 1px solid #e2e8f0;
  margin-top: auto;
`;

const Deadline = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #e53e3e;
  font-weight: 500;

  svg {
  font-size: 0.9rem;
  }
`;

const EligibilityTag = styled.span`
  background: ${props => props.color || '#4299e1'}15;
  color: ${props => props.color || '#4299e1'};
  padding: 0.25rem 0.6rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ApplyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${props => props.color || '#4299e1'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 0.6rem;
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.color || '#4299e1'}40;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  50% { transform: translateY(0px) rotate(0deg); }
  75% { transform: translateY(10px) rotate(-2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const IconFloat = styled.div`
  position: absolute;
  font-size: ${props => props.size || '2rem'};
  color: rgba(255, 255, 255, 0.15);
  animation: ${floatAnimation} ${props => props.duration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  z-index: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;



const Home = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showQuickResult, setShowQuickResult] = useState(false);
  const [suggestedRoute, setSuggestedRoute] = useState('/streams');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay to show loading effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  
  // Initialize particles engine
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };
  
  const handleStartClick = () => {
    const streamsSection = document.getElementById('streams-section');
    if (streamsSection) {
      streamsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreStreams = () => {
    navigate('/streams');
  };

  // Quick AI assessment questions aligned with website focus
  const interestOptions = [
    {
      id: 'science',
      title: 'Solving Complex Problems',
      description: 'Breaking down tough challenges and finding smart solutions',
      icon: <FaMicroscope />,
      route: '/science'
    },
    {
      id: 'arts',
      title: 'Creating and Innovating',
      description: 'New ideas, design, content and creative solutions',
      icon: <FaPalette />,
      route: '/arts'
    },
    {
      id: 'commerce',
      title: 'Leading and Organizing',
      description: 'Planning, strategy and making things happen with teams',
      icon: <FaChartLine />,
      route: '/commerce'
    },
    {
      id: 'teaching',
      title: 'Helping and Teaching',
      description: 'Supporting others and sharing knowledge confidently',
      icon: <FaChalkboardTeacher />,
      route: '/arts'
    }
  ];

  const interestOptions2 = [
    {
      id: 'tech',
      title: 'Coding & Technology',
      description: 'Building apps, AI and useful tools',
      icon: <FaLaptopCode />,
      route: '/science'
    },
    {
      id: 'design',
      title: 'Design & Content',
      description: 'Visuals, UX, videos and storytelling',
      icon: <FaPalette />,
      route: '/arts'
    },
    {
      id: 'finance',
      title: 'Business & Finance',
      description: 'Markets, strategy, and analytics',
      icon: <FaChartLine />,
      route: '/commerce'
    },
    {
      id: 'teaching2',
      title: 'Teaching & Mentoring',
      description: 'Helping others grow with knowledge',
      icon: <FaChalkboardTeacher />,
      route: '/arts'
    }
  ];

  const interestOptions3 = [
    {
      id: 'labs',
      title: 'Labs & Research',
      description: 'Experiments and scientific discovery',
      icon: <FaFlask />,
      route: '/science'
    },
    {
      id: 'studio',
      title: 'Studios & Media',
      description: 'Creative studios and media houses',
      icon: <FaTheaterMasks />,
      route: '/arts'
    },
    {
      id: 'corporate',
      title: 'Corporate & Startups',
      description: 'Teams, products and business growth',
      icon: <FaBriefcase />,
      route: '/commerce'
    },
    {
      id: 'classroom',
      title: 'Classrooms & Training',
      description: 'Schools, colleges and edtech',
      icon: <FaGraduationCap />,
      route: '/arts'
    }
  ];

  const quickQuestions = [
    { id: 1, prompt: 'What energizes you the most?', options: interestOptions },
    { id: 2, prompt: 'What do you enjoy doing more?', options: interestOptions2 },
    { id: 3, prompt: 'Which environment excites you most?', options: interestOptions3 }
  ];

  const handleQuickSelect = (option) => {
    // Track selected option
    setAnswers((prev) => [...prev, option]);

    // If last question, compute suggestion and show result
    if (currentQuestion === quickQuestions.length - 1) {
      const routes = [...answers, option].map((o) => o.route);
      const freq = routes.reduce((m, r) => {
        m[r] = (m[r] || 0) + 1; return m;
      }, {});
      const best = Object.keys(freq).sort((a, b) => freq[b] - freq[a])[0] || '/streams';
      setSuggestedRoute(best);
      setShowQuickResult(true);
    } else {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const resetQuickAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowQuickResult(false);
    setSuggestedRoute('/streams');
  };

  const handleInterestSelect = (id) => {
    setSelectedInterest(id);
  };

  const features = [
    {
      icon: <FaGraduationCap />,
      title: "AI-Powered Assessment",
      description: "Get personalized career recommendations based on your interests and aptitude."
    },
    {
      icon: <FaBriefcase />,
      title: "Comprehensive Guidance",
      description: "Explore detailed career paths across Science, Commerce, and Arts streams."
    },
    {
      icon: <FaUsers />,
      title: "Expert Counseling",
      description: "Connect with experienced counselors for personalized guidance."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Science Stream",
      text: "The AI assessment helped me choose between medical and engineering. Now I'm confidently preparing for NEET!"
    },
    {
      name: "Rahul Verma",
      role: "Commerce Stream",
      text: "Thanks to PathfinderEdu, I discovered my passion for finance and am now pursuing CA."
    },
    {
      name: "Aisha Khan",
      role: "Arts Stream",
      text: "The career insights helped me understand the scope of psychology as a career option."
    }
  ];

  const scholarships = [
    {
      title: "MahaDBT Portal Scholarships",
      icon: 'FaAward',
      color: "#3182ce",
      amount: "Various Amounts",
      criteria: [
        { icon: 'FaCheckCircle', text: "Government Verified Portal" },
        { icon: 'FaInfoCircle', text: "Multiple Scholarship Schemes" },
        { icon: 'FaUserGraduate', text: "Merit & Income Based" }
      ],
      deadline: "Check Portal for Deadlines",
      applyLink: "https://mahadbtmahait.gov.in/login/login",
      isVerified: true,
      portalName: "MahaDBT Portal"
    },
    {
      title: "Post Matric Scholarship",
      icon: 'FaHandHoldingHeart',
      color: "#38a169",
      amount: "As Per Guidelines",
      criteria: [
        { icon: 'FaCheckCircle', text: "Income Criteria Applicable" },
        { icon: 'FaInfoCircle', text: "Various Categories" },
        { icon: 'FaPercent', text: "Apply through MahaDBT" }
      ],
      deadline: "As per Portal Timeline",
      applyLink: "https://mahadbtmahait.gov.in",
      eligibility: "Merit & Income Based"
    },
    {
      title: "Merit-cum-Means Scholarship",
      icon: 'FaUniversity',
      color: "#805ad5",
      amount: "Based on Category",
      criteria: [
        { icon: 'FaCheckCircle', text: "Merit Based Eligibility" },
        { icon: 'FaInfoCircle', text: "Income Limits Apply" },
        { icon: 'FaUserGraduate', text: "Document Verification Required" }
      ],
      deadline: "Check MahaDBT Portal",
      applyLink: "https://mahadbtmahait.gov.in",
      eligibility: "Merit & Income Based"
    }
  ];

  const featuredPrograms = [
    {
      title: "Data Science Bootcamp",
      badge: "Trending",
      duration: "6 months",
      rating: "4.8",
      students: "2,500+"
    },
    {
      title: "Digital Marketing Pro",
      badge: "New",
      duration: "4 months",
      rating: "4.7",
      students: "1,800+"
    },
    {
      title: "Full Stack Development",
      badge: "High Demand",
      duration: "8 months",
      rating: "4.9",
      students: "3,000+"
    }
  ];

  const latestNews = [
    {
      icon: 'FaLaptopCode',
      title: "Tech Industry Sees 25% Growth in Job Opportunities",
      description: "New report shows significant increase in tech sector employment...",
      date: "2 days ago",
      bgColor: "#4299e1"
    },
    {
      icon: 'FaGraduationCap',
      title: "Top Universities Announce New Online Programs",
      description: "Leading institutions expand their digital learning offerings...",
      date: "4 days ago",
      bgColor: "#48bb78"
    },
    {
      icon: 'FaChartLine',
      title: "Emerging Career Trends for 2024",
      description: "Analysis of the most promising career paths this year...",
      date: "1 week ago",
      bgColor: "#805ad5"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const experts = [
    {
      name: "Prof. Dr. Shitalkumar Rawandale",
      title: "Dean Industry Institute Interaction, PCET-NUTAN Group Colleges",
      image: {
        src: "/static-site/rawandale.jpg",
        alt: "Prof. Dr. Shitalkumar Rawandale"
      },
      color: "#3182ce",
      specialties: [
        "Industry Institute Interaction",
        "Placement Cell Leadership",
        "Student Skill Development"
      ],
      stats: {
        experience: "Dean Desk",
        students: "9422792663 / 9975490622",
        success: "s.rawandale@gmail.com"
      },
      linkedin: "#",
      email: "mailto:s.rawandale@gmail.com"
    },
    {
      name: "Dr. Prasad Baban Dhore",
      title: "HOD (Computer Engineering Department)",
      image: {
        src: "/static-site/dhore.jpg",
        alt: "Dr. Prasad Baban Dhore"
      },
      color: "#38a169",
      specialties: [
        "Department Leadership",
        "Technical Education",
        "Industry Connect"
      ],
      stats: {
        experience: "HOD Desk",
        students: "NAAC Accredited",
        success: "Computer Engineering"
      },
      linkedin: "#",
      email: "#"
    },
    {
      name: "Mr. Satyajit Sirsat",
      title: "Assistant Professor, M.E. CSE",
      image: {
        src: "/static-site/sirsat.jpg",
        alt: "Mr. Satyajit Sirsat"
      },
      color: "#805ad5",
      specialties: [
        "REST API",
        "Django Framework",
        "Python",
        "MongoDB",
        "Informatica"
      ],
      stats: {
        experience: "6 Years",
        students: "05 Publications",
        success: "satyajit.sirsat@nmiet.edu.in"
      },
      linkedin: "#",
      email: "mailto:satyajit.sirsat@nmiet.edu.in"
    }
  ];

  // Particle options for a subtle blue/white effect
  const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: false },
        onHover: { enable: false },
        resize: true,
      },
    },
    particles: {
      color: { value: '#ffffff' },
      links: {
        color: '#4299e1',
        distance: 120,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: false,
        speed: 0.6,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 40,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 2, max: 4 },
      },
    },
    detectRetina: true,
  };

  return (
    <HomeContainer isLoaded={isLoaded}>
      <FloatingElements>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
      </FloatingElements>

      <HeroContainer isLoaded={isLoaded}>
      <HeroSection>
        <HeroContent>
            <HeroTitle>Discover Your Perfect Career Path</HeroTitle>
          <HeroSubtitle>
              Navigate your future with AI-powered career guidance. Explore personalized recommendations that align with your unique skills, passions, and aspirations.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryButton onClick={() => navigate('/assessment')}>
                🤖 Start AI Assessment
            </PrimaryButton>
            <SecondaryButton onClick={handleExploreStreams}>
                🎯 Explore Streams
            </SecondaryButton>
          </HeroButtons>
        </HeroContent>
          <HeroVisual>
            <CareerDashboard>
              <DashboardHeader>
                <DashboardIcon>📊</DashboardIcon>
                <div>
                  <h3>Career Insights</h3>
                  <p>Your personalized roadmap</p>
        </div>
              </DashboardHeader>
              <CareerPaths>
                <CareerPath onClick={() => navigate('/science')}>
                  <PathIcon className="tech">💻</PathIcon>
                  <PathInfo>
                    <h4>Technology</h4>
                    <p>95% match • High demand</p>
                  </PathInfo>
                  <CareerPathButton onClick={(e) => { e.stopPropagation(); navigate('/science'); }}>
                    Explore
                  </CareerPathButton>
                </CareerPath>
                <CareerPath onClick={() => navigate('/arts')}>
                  <PathIcon className="design">🎨</PathIcon>
                  <PathInfo>
                    <h4>Creative Design</h4>
                    <p>88% match • Growing field</p>
                  </PathInfo>
                  <CareerPathButton onClick={(e) => { e.stopPropagation(); navigate('/arts'); }}>
                    Explore
                  </CareerPathButton>
                </CareerPath>
                <CareerPath onClick={() => navigate('/commerce')}>
                  <PathIcon className="business">📈</PathIcon>
                  <PathInfo>
                    <h4>Business Analytics</h4>
                    <p>82% match • Stable career</p>
                  </PathInfo>
                  <CareerPathButton onClick={(e) => { e.stopPropagation(); navigate('/commerce'); }}>
                    Explore
                  </CareerPathButton>
                </CareerPath>
              </CareerPaths>
            </CareerDashboard>
          </HeroVisual>
      </HeroSection>
              </HeroContainer>

        {/* Quick AI assessment removed per request */}

      <Section>
        <SectionTitle>Career Insights 2024</SectionTitle>
        <SectionSubtitle>
          Explore the latest trends in placement rates and average salaries across different streams
        </SectionSubtitle>
        <CareerInsightsChart />
      </Section>

      <StreamsSection id="streams-section">
        <SectionTitle>EXPLORE CAREER STREAMS</SectionTitle>
        <SectionSubtitle>
          Discover comprehensive career paths tailored to your interests and aspirations
        </SectionSubtitle>
        <StreamGrid>
          {streamData.map((stream, index) => (
            <StreamCard 
              key={index}
              onClick={() => navigate(`/${stream.title.toLowerCase()}`)}
              accentColor={stream.accentColor}
              index={index}
            >
              <h3>
                {renderIcon(stream.icon)}
                {stream.title}
              </h3>
              <ul>
                {stream.careers.map((career, idx) => (
                  <li key={idx}>
                    {renderIcon(career.icon)}
                    {career.text}
                  </li>
                ))}
              </ul>
              <StreamFeatures className="stream-features">
                {stream.features.map((feature, idx) => (
                  <FeatureTag key={idx} accentColor={stream.accentColor}>
                    {renderIcon(feature.icon)}
                    {feature.text}
                  </FeatureTag>
                ))}
              </StreamFeatures>
              <PopularExam accentColor={stream.accentColor}>
                {renderIcon(stream.examInfo.icon)} Popular: {stream.examInfo.exams.join(", ")}
              </PopularExam>
              <CareerCount accentColor={stream.accentColor} className="career-count">
                {stream.careerCount}
              </CareerCount>
            </StreamCard>
          ))}
        </StreamGrid>
      </StreamsSection>

      <ExpertGuidanceSection className="expert-section">
        <SectionTitle>Meet Our Expert Guides</SectionTitle>
        <SectionSubtitle>
          Get personalized guidance from our experienced professors and industry experts
          who are dedicated to helping you achieve your career goals.
        </SectionSubtitle>
        <ExpertGrid>
          {experts.map((expert, index) => (
            <ExpertCard key={index}>
              <ExpertImage color={expert.color}>
                <img src={expert.image.src} alt={expert.image.alt} />
              </ExpertImage>
              <ExpertName>{expert.name}</ExpertName>
              <ExpertTitle color={expert.color}>{expert.title}</ExpertTitle>
              <ExpertSpecialties>
                {expert.specialties.map((specialty, idx) => (
                  <SpecialtyTag key={idx} color={expert.color}>
                    {specialty}
                  </SpecialtyTag>
                ))}
              </ExpertSpecialties>
              <div style={{margin: '1.5rem 0 0.5rem 0', borderTop: '1px solid #e2e8f0', paddingTop: '1rem'}}>
                {expert.name === "Prof. Dr. Shitalkumar Rawandale" && (
                  <>
                    <div style={{fontWeight: 600, marginBottom: 4}}>Dean Desk</div>
                    <div style={{fontSize: '1rem', marginBottom: 2}}><b>Mobile:</b> 9422792663 / 9975490622</div>
                    <div style={{fontSize: '1rem'}}><b>Email:</b> s.rawandale@gmail.com</div>
                  </>
                )}
                {expert.name === "Mr. Satyajit Sirsat" && (
                  <>
                    <div style={{fontWeight: 600, marginBottom: 4}}>Experience: 6 Years</div>
                    <div style={{fontSize: '1rem', marginBottom: 2}}><b>Publications:</b> 05</div>
                    <div style={{fontSize: '1rem', marginBottom: 2}}><b>Email:</b> satyajit.sirsat@nmiet.edu.in</div>
                  </>
                )}
                {expert.name === "Dr. Prasad Baban Dhore" && (
                  <>
                    <div style={{fontWeight: 600, marginBottom: 4}}>HOD Desk</div>
                    <div style={{fontSize: '1rem', marginBottom: 2}}><b>Accreditation:</b> NAAC Accredited</div>
                    <div style={{fontSize: '1rem'}}><b>Department:</b> Computer Engineering</div>
                  </>
                )}
              </div>
              <ExpertLinks>
                <SocialLink 
                  href={expert.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  color={expert.color}
                >
                  <FaLinkedin />
                </SocialLink>
                <SocialLink 
                  href={expert.email}
                  color={expert.color}
                >
                  <FaEnvelope />
                </SocialLink>
              </ExpertLinks>
            </ExpertCard>
          ))}
        </ExpertGrid>
      </ExpertGuidanceSection>

      <ScholarshipContainer className="scholarship-section">
        <ScholarshipHeader>
          <h2>Available Scholarships</h2>
          <p>
            Unlock your potential with our comprehensive scholarship programs. 
            We're committed to making quality education accessible through merit-based 
            and need-based financial support.
          </p>
        </ScholarshipHeader>

        <ScholarshipGrid>
          {scholarships.map((scholarship, index) => (
            <ScholarshipItem key={index} color={scholarship.color}>
              <ScholarshipIcon color={scholarship.color}>
                {renderIcon(scholarship.icon)}
              </ScholarshipIcon>
              <ScholarshipTitle>
                {renderIcon(scholarship.icon)}
                {scholarship.title}
                {scholarship.isVerified && <FaCheckCircle style={{ color: scholarship.color, fontSize: '1rem', marginLeft: 6 }} />}
              </ScholarshipTitle>
              <ScholarshipAmount color={scholarship.color}>
                <FaRupeeSign />
                {scholarship.amount}
              </ScholarshipAmount>
              <ScholarshipInfo color={scholarship.color}>
                {scholarship.criteria.map((criterion, idx) => (
                  <li key={idx}>
                    {renderIcon(criterion.icon)}
                    {criterion.text}
                  </li>
                ))}
              </ScholarshipInfo>
              <ScholarshipMeta>
                <Deadline>
                  <FaCalendarAlt />
                  Last Date: {scholarship.deadline}
                </Deadline>
                <EligibilityTag color={scholarship.color}>
                  {scholarship.eligibility || 'All Students'}
                </EligibilityTag>
              </ScholarshipMeta>
              <ApplyButton 
                href={scholarship.applyLink} 
                color={scholarship.color}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Optional: Track click analytics here
                  console.log(`Navigating to ${scholarship.portalName}`);
                }}
              >
                Visit {scholarship.portalName} <FaExternalLinkAlt style={{ marginLeft: '4px', fontSize: '0.9em' }} />
              </ApplyButton>
            </ScholarshipItem>
          ))}
        </ScholarshipGrid>
      </ScholarshipContainer>

      <GuidanceSection>
        <GuidanceTitle>Ready to Transform Your Career Journey?</GuidanceTitle>
        <GuidanceSubtitle>
          Get personalized guidance from industry experts with proven track records. 
          Our certified counselors have helped 10,000+ students discover their perfect career paths.
        </GuidanceSubtitle>
        
        <GuidanceFeatures>
          <FeatureItem>
            <FaCheckCircle />
            <span>Free Initial Consultation</span>
          </FeatureItem>
          <FeatureItem>
            <FaCheckCircle />
            <span>Personalized Career Roadmap</span>
          </FeatureItem>
          <FeatureItem>
            <FaCheckCircle />
            <span>Industry Expert Mentors</span>
          </FeatureItem>
          <FeatureItem>
            <FaCheckCircle />
            <span>Lifetime Support Access</span>
          </FeatureItem>
        </GuidanceFeatures>
        
        <EnhancedCTAButton
          href="https://forms.google.com/pathfinderedu-mentorship"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaHandshake />
          Book Your Free Career Session
          <FaArrowRight />
        </EnhancedCTAButton>
      </GuidanceSection>

      <NewsSection>
        <SectionTitle>Latest Updates</SectionTitle>
        <SectionSubtitle>Stay informed about the latest developments in education and career opportunities</SectionSubtitle>
        <NewsGrid>
          {latestNews.map((news, index) => (
            <NewsCard key={index} bgColor={news.bgColor}>
              <div className="image">
                {renderIcon(news.icon)}
              </div>
              <div className="content">
                <h3>{news.title}</h3>
                <p>{news.description}</p>
                <div className="date">
                  <FaCalendarAlt />
                  {news.date}
                </div>
              </div>
            </NewsCard>
          ))}
        </NewsGrid>
      </NewsSection>
    </HomeContainer>
  );
};

export default Home; 