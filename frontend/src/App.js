import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ScienceStream from './components/ScienceStream';
import CommerceStream from './components/CommerceStream';
import ArtsStream from './components/ArtsStream';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import AIAssessment from './components/assessment/AIAssessment';
import Streams from './components/Streams';
import ChatBot from './components/ChatBot';
import SearchResults from './components/SearchResults';
import CourseDetail from './components/CourseDetail';
import CareerDetail from './components/CareerDetail';
import CollegeDetail from './components/CollegeDetail';
import { lightTheme } from './styles/theme';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #333333;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 2rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 70px 1rem 2rem;
  }
`;

const FullScreenWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <FullScreenWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <ChatBot />
      </FullScreenWrapper>
    );
  }

  const isLoginPage = location.pathname === '/login';
  if (isLoginPage) {
    return (
      <FullScreenWrapper>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <ChatBot />
      </FullScreenWrapper>
    );
  }

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <ContentWrapper>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/assessment" element={<AIAssessment />} />
            <Route path="/streams" element={<Streams />} />
            <Route path="/science" element={<ScienceStream />} />
            <Route path="/commerce" element={<CommerceStream />} />
            <Route path="/arts" element={<ArtsStream />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/career/:careerId" element={<CareerDetail />} />
            <Route path="/college/:collegeId" element={<CollegeDetail />} />
          </Routes>
        </ContentWrapper>
      </MainContent>
      <Footer />
      <ChatBot />
    </PageWrapper>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
