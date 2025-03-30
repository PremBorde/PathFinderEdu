import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Careers from './components/Careers/Careers';
import ScholarshipGuide from './components/ScholarshipGuide';
import Footer from './components/Footer';
import Assessment from './components/Assessment/Assessment';
import CareerGuidance from './components/CareerGuidance/CareerGuidance';
import './App.css';

// Initialize AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/scholarships" element={<ScholarshipGuide />} />
            <Route path="/career-guidance" element={<CareerGuidance />} />
            <Route path="/assessment" element={<Assessment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 