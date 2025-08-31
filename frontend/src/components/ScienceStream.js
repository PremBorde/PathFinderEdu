import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaAtom, 
  FaFlask, 
  FaMicroscope, 
  FaLaptopCode, 
  FaUserMd, 
  FaChalkboardTeacher, 
  FaCogs, 
  FaBuilding, 
  FaRobot, 
  FaDna, 
  FaPrescriptionBottle,
  FaTooth,
  FaGraduationCap,
  FaBook,
  FaBriefcase,
  FaLink,
  FaLightbulb,
  FaMicrochip,
  FaIndustry,
  FaPlane,
  FaOilCan,
  FaGem,
  FaDatabase,
  FaNetworkWired,
  FaTree,
  FaWater,
  FaTruck,
  FaShip,
  FaRadiation,
  FaBuildingColumns,
  FaHardHat
} from 'react-icons/fa';
import CareerDetailModal from './CareerDetailModal';
import { questions } from '../data/assessmentQuestions';

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.science.gradient};
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(144, 205, 244, 0.1) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(49, 130, 206, 0.1) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 1.5rem;
  font-weight: bold;
  position: relative;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
    font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  position: relative;
  line-height: 1.6;
`;

const FilterSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: #2d3748;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;

  &:hover {
    border-color: #4299e1;
  }
`;

const CareerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

const CareerCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  background: ${props => props.bgColor || '#4299e1'};
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #4a5568;
`;

const Tag = styled.span`
  background: #ebf8ff;
  color: #2b6cb0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 5px;
`;

const Button = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
  transition: background 0.2s;

  &:hover {
    background: #2b6cb0;
  }
`;

const FAQSection = styled.div`
  margin-top: 60px;
  padding: 40px;
  background: #f7fafc;
  border-radius: 15px;
`;

const FAQTitle = styled.h2`
  text-align: center;
  color: #2d3748;
  margin-bottom: 30px;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FAQCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    color: #2d3748;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
  }
`;

const CTASection = styled.div`
  margin: 60px 0;
  padding: 40px;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  border-radius: 15px;
  text-align: center;
  color: white;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
  color: white;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.science.primary};
  color: ${({ theme }) => theme.science.text};
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme }) => theme.science.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StartButton = styled.button`
  margin-top: 2rem;
  background: white;
  color: #2c5282;
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;

    &:hover {
    background: #f7fafc;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const AssessmentSection = styled.div`
  margin: 60px 0;
  padding: 40px;
  background: ${({ theme }) => theme.science.gradient};
  border-radius: 15px;
  text-align: center;
  color: ${({ theme }) => theme.science.text};
`;

const AssessmentTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const AssessmentDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

const QuestionCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem auto;
  max-width: 800px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const QuestionText = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  text-align: left;
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid ${({ theme }) => theme.science.accent};
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => `${theme.science.primary}10`};
    border-color: ${({ theme }) => theme.science.primary};
  }

  &.selected {
    background: ${({ theme }) => theme.science.primary};
    color: white;
    border-color: ${({ theme }) => theme.science.primary};
  }
`;

const ResultCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Career Data Structure
const scienceCareers = {
  pcm: [
    {
      id: 1,
      title: "Software Engineer",
      icon: FaLaptopCode,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Computer Science",
      salaryRange: "₹4-40 LPA",
      workAreas: ["IT Companies", "Startups", "MNCs"],
      skills: ["Programming", "Problem Solving", "System Design"],
      category: "Technology"
    },
    {
      id: 2,
      title: "Data Scientist",
      icon: FaLaptopCode,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "GATE", "CET"],
      degree: "B.Tech/M.Tech in CS/IT/Data Science",
      salaryRange: "₹8-35 LPA",
      workAreas: ["Tech Companies", "Research Labs", "Analytics Firms"],
      skills: ["Machine Learning", "Statistics", "Programming"],
      category: "Technology"
    },
    {
      id: 3,
      title: "Mechanical Engineer",
      icon: FaCogs,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Mechanical Engineering",
      salaryRange: "₹3-25 LPA",
      workAreas: ["Manufacturing", "Automotive", "Aerospace"],
      skills: ["CAD/CAM", "Thermal Systems", "Manufacturing Processes"],
      category: "Engineering"
    },
    {
      id: 4,
      title: "Civil Engineer",
      icon: FaBuilding,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Civil Engineering",
      salaryRange: "₹3-30 LPA",
      workAreas: ["Construction", "Infrastructure", "Government"],
      skills: ["Structural Design", "Project Management", "AutoCAD"],
      category: "Engineering"
    },
    {
      id: 5,
      title: "AI/ML Engineer",
      icon: FaRobot,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech in CS/AI",
      salaryRange: "₹6-45 LPA",
      workAreas: ["Tech Giants", "AI Research", "Startups"],
      skills: ["Deep Learning", "Python", "Neural Networks"],
      category: "Technology"
    },
    {
      id: 6,
      title: "Electrical Engineer",
      icon: FaLightbulb,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Electrical Engineering",
      salaryRange: "₹3-28 LPA",
      workAreas: ["Power Plants", "Electronics", "Utilities"],
      skills: ["Power Systems", "Control Systems", "Circuit Design"],
      category: "Engineering"
    },
    {
      id: 7,
      title: "Electronics Engineer",
      icon: FaMicrochip,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Electronics & Communication",
      salaryRange: "₹3-30 LPA",
      workAreas: ["Semiconductor", "Telecom", "Consumer Electronics"],
      skills: ["Circuit Design", "VLSI", "Signal Processing"],
      category: "Engineering"
    },
    {
      id: 8,
      title: "Chemical Engineer",
      icon: FaFlask,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Chemical Engineering",
      salaryRange: "₹4-35 LPA",
      workAreas: ["Petrochemicals", "Pharmaceuticals", "Process Industries"],
      skills: ["Process Design", "Thermodynamics", "Process Control"],
      category: "Engineering"
    },
    {
      id: 9,
      title: "Aerospace Engineer",
      icon: FaPlane,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Aerospace Engineering",
      salaryRange: "₹4-40 LPA",
      workAreas: ["ISRO", "HAL", "Aircraft Manufacturing"],
      skills: ["Aerodynamics", "Flight Mechanics", "Propulsion"],
      category: "Engineering"
    },
    {
      id: 10,
      title: "Computer Science Engineer",
      icon: FaLaptopCode,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Computer Science Engineering",
      salaryRange: "₹4-50 LPA",
      workAreas: ["Tech Companies", "Software Development", "Research"],
      skills: ["Programming", "Algorithms", "Software Engineering"],
      category: "Technology"
    },
    {
      id: 11,
      title: "Information Technology Engineer",
      icon: FaNetworkWired,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Information Technology",
      salaryRange: "₹3-35 LPA",
      workAreas: ["IT Services", "Consulting", "System Integration"],
      skills: ["Network Management", "Database", "System Administration"],
      category: "Technology"
    },
    {
      id: 12,
      title: "Petroleum Engineer",
      icon: FaOilCan,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Petroleum Engineering",
      salaryRange: "₹6-45 LPA",
      workAreas: ["Oil Companies", "ONGC", "Refineries"],
      skills: ["Drilling Technology", "Reservoir Engineering", "Production"],
      category: "Engineering"
    },
    {
      id: 13,
      title: "Mining Engineer",
      icon: FaHardHat,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Mining Engineering",
      salaryRange: "₹4-30 LPA",
      workAreas: ["Mining Companies", "Coal India", "Government"],
      skills: ["Mining Operations", "Safety Systems", "Mineral Processing"],
      category: "Engineering"
    },
    {
      id: 14,
      title: "Environmental Engineer",
      icon: FaTree,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Environmental Engineering",
      salaryRange: "₹3-25 LPA",
      workAreas: ["Environmental Consulting", "Government", "NGOs"],
      skills: ["Environmental Impact", "Waste Management", "Pollution Control"],
      category: "Engineering"
    },
    {
      id: 15,
      title: "Marine Engineer",
      icon: FaShip,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Marine Engineering",
      salaryRange: "₹5-35 LPA",
      workAreas: ["Shipping Companies", "Navy", "Offshore"],
      skills: ["Ship Design", "Marine Systems", "Naval Architecture"],
      category: "Engineering"
    },
    {
      id: 16,
      title: "Agricultural Engineer",
      icon: FaTree,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Agricultural Engineering",
      salaryRange: "₹3-20 LPA",
      workAreas: ["Agriculture Sector", "Equipment Manufacturing", "Research"],
      skills: ["Farm Machinery", "Irrigation", "Agricultural Technology"],
      category: "Engineering"
    },
    {
      id: 17,
      title: "Automobile Engineer",
      icon: FaTruck,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Automobile Engineering",
      salaryRange: "₹3-30 LPA",
      workAreas: ["Auto Industry", "Manufacturing", "R&D"],
      skills: ["Vehicle Design", "Automotive Systems", "Engine Technology"],
      category: "Engineering"
    },
    {
      id: 18,
      title: "Nuclear Engineer",
      icon: FaRadiation,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Nuclear Engineering",
      salaryRange: "₹5-40 LPA",
      workAreas: ["Nuclear Power Plants", "BARC", "Research Institutes"],
      skills: ["Nuclear Physics", "Reactor Design", "Radiation Safety"],
      category: "Engineering"
    },
    {
      id: 19,
      title: "Textile Engineer",
      icon: FaIndustry,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Textile Engineering",
      salaryRange: "₹3-25 LPA",
      workAreas: ["Textile Industry", "Garment Manufacturing", "R&D"],
      skills: ["Textile Technology", "Fabric Design", "Production Management"],
      category: "Engineering"
    },
    {
      id: 20,
      title: "Food Technology Engineer",
      icon: FaIndustry,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Food Technology",
      salaryRange: "₹3-22 LPA",
      workAreas: ["Food Industry", "Quality Control", "Research"],
      skills: ["Food Processing", "Quality Assurance", "Food Safety"],
      category: "Engineering"
    },
    {
      id: 21,
      title: "Metallurgical Engineer",
      icon: FaGem,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Metallurgical Engineering",
      salaryRange: "₹4-28 LPA",
      workAreas: ["Steel Industry", "Mining", "Research"],
      skills: ["Metal Processing", "Materials Science", "Quality Control"],
      category: "Engineering"
    },
    {
      id: 22,
      title: "Production Engineer",
      icon: FaIndustry,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Production Engineering",
      salaryRange: "₹3-25 LPA",
      workAreas: ["Manufacturing", "Production", "Quality Control"],
      skills: ["Production Planning", "Quality Management", "Industrial Engineering"],
      category: "Engineering"
    },
    {
      id: 23,
      title: "Instrumentation Engineer",
      icon: FaMicrochip,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Instrumentation Engineering",
      salaryRange: "₹4-30 LPA",
      workAreas: ["Process Industries", "Automation", "Control Systems"],
      skills: ["Control Systems", "Instrumentation", "Process Automation"],
      category: "Engineering"
    },
    {
      id: 24,
      title: "Robotics Engineer",
      icon: FaRobot,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Robotics Engineering",
      salaryRange: "₹5-40 LPA",
      workAreas: ["Automation Companies", "Research Labs", "Manufacturing"],
      skills: ["Robotics", "Automation", "AI", "Machine Learning"],
      category: "Technology"
    },
    {
      id: 25,
      title: "Biomedical Engineer",
      icon: FaFlask,
      stream: "PCM",
      exams: ["JEE Main", "JEE Advanced", "CET"],
      degree: "B.Tech/B.E in Biomedical Engineering",
      salaryRange: "₹4-25 LPA",
      workAreas: ["Hospitals", "Medical Device Companies", "Research Labs"],
      skills: ["Engineering", "Biology", "Medical Technology"],
      category: "Interdisciplinary"
    }
  ],
  pcb: [
    {
      id: 101,
      title: "Doctor (MBBS)",
      icon: FaUserMd,
      stream: "PCB",
      exams: ["NEET-UG", "CET"],
      degree: "MBBS",
      salaryRange: "₹6-50 LPA",
      workAreas: ["Hospitals", "Private Practice", "Government Health"],
      skills: ["Medical Knowledge", "Patient Care", "Diagnosis"],
      category: "Medicine"
    },
    {
      id: 102,
      title: "Dentist",
      icon: FaTooth,
      stream: "PCB",
      exams: ["NEET-UG", "CET"],
      degree: "BDS",
      salaryRange: "₹4-25 LPA",
      workAreas: ["Dental Clinics", "Hospitals", "Private Practice"],
      skills: ["Dental Procedures", "Patient Care", "Oral Surgery"],
      category: "Medicine"
    },
    {
      id: 103,
      title: "Pharmacist",
      icon: FaPrescriptionBottle,
      stream: "PCB",
      exams: ["NEET", "CET", "GPAT"],
      degree: "B.Pharm/PharmD",
      salaryRange: "₹3-18 LPA",
      workAreas: ["Pharmaceutical Companies", "Hospitals", "Retail"],
      skills: ["Drug Knowledge", "Patient Counseling", "Quality Control"],
      category: "Medicine"
    },
    {
      id: 104,
      title: "Biotechnologist",
      icon: FaDna,
      stream: "PCB",
      exams: ["JEE Main", "NEET", "CET"],
      degree: "B.Tech/B.Sc in Biotechnology",
      salaryRange: "₹3-20 LPA",
      workAreas: ["Research Labs", "Pharma", "Food Industry"],
      skills: ["Genetic Engineering", "Research", "Laboratory Techniques"],
      category: "Research"
    },
    {
      id: 105,
      title: "Medical Laboratory Technologist",
      icon: FaMicroscope,
      stream: "PCB",
      exams: ["CET", "University Entrance"],
      degree: "B.Sc in Medical Laboratory Technology",
      salaryRange: "₹2-12 LPA",
      workAreas: ["Hospitals", "Diagnostic Labs", "Research Centers"],
      skills: ["Lab Testing", "Equipment Handling", "Quality Control"],
      category: "Medicine"
    }
  ],
  pcmb: [
    {
      id: 201,
      title: "Biomedical Engineer",
      icon: FaFlask,
      stream: "PCMB",
      exams: ["JEE Main", "NEET-UG", "CET"],
      degree: "B.Tech in Biomedical Engineering",
      salaryRange: "₹4-25 LPA",
      workAreas: ["Hospitals", "Medical Device Companies", "Research Labs"],
      skills: ["Engineering", "Biology", "Medical Technology"],
      category: "Interdisciplinary"
    },
    {
      id: 202,
      title: "Bioinformatics Specialist",
      icon: FaLaptopCode,
      stream: "PCMB",
      exams: ["JEE Main", "GATE", "CET"],
      degree: "B.Tech/M.Tech in Bioinformatics",
      salaryRange: "₹4-20 LPA",
      workAreas: ["Research Institutes", "Pharma Companies", "Tech Companies"],
      skills: ["Programming", "Biology", "Data Analysis"],
      category: "Interdisciplinary"
    },
    {
      id: 203,
      title: "Clinical Research Scientist",
      icon: FaFlask,
      stream: "PCMB",
      exams: ["NEET", "CSIR-NET", "CET"],
      degree: "B.Tech/B.Sc + M.Sc",
      salaryRange: "₹4-25 LPA",
      workAreas: ["Pharma Companies", "Research Labs", "Hospitals"],
      skills: ["Clinical Trials", "Research", "Data Analysis"],
      category: "Research"
    }
  ]
};

const filters = {
  stream: ["All", "PCM", "PCB", "PCMB"],
  field: ["All", "Medicine", "Engineering", "Research", "Technology", "Defense"],
  careerType: ["All", "Government", "Private", "Research", "Startup"],
  salaryLevel: ["All", "Entry Level", "Mid Level", "Senior Level"],
  examType: ["All", "JEE", "NEET", "NDA", "CUET", "CET"]
};

const faqs = [
  {
    question: "Can I switch from PCB to PCM after 12th?",
    answer: "Yes, you can switch from PCB to PCM after 12th, but you may need to take additional mathematics courses or bridge programs. Some universities offer special programs for students making this transition."
  },
  {
    question: "What are the best government jobs after Science stream?",
    answer: "There are many government opportunities including ISRO, DRDO, BARC, IES, Research Scientists in CSIR labs, Medical Officers in government hospitals, and teaching positions in government institutions."
  },
  {
    question: "Is NEET mandatory for all medical courses?",
    answer: "NEET is mandatory for MBBS, BDS, BAMS, BHMS, and other medical courses in India. However, some paramedical courses and biotechnology programs don't require NEET scores. Some states also have their own CET for local colleges."
  },
  {
    question: "What is CET and how is it different from JEE/NEET?",
    answer: "CET (Common Entrance Test) is conducted by various states for admission to engineering and medical colleges within the state. Examples include MHT-CET (Maharashtra), KCET (Karnataka), WBJEE (West Bengal). CET exams are generally easier than JEE/NEET and focus on state quota seats."
  },
  {
    question: "Can I do BSc after 12th Science?",
    answer: "Yes, you can pursue BSc after 12th Science. Popular options include BSc in Physics, Chemistry, Mathematics, Biology, Biotechnology, and more. Many universities accept students based on 12th marks or conduct their own entrance tests."
  },
  {
    question: "What are emerging career options in Science stream?",
    answer: "Emerging careers include AI/ML Engineer, Data Scientist, Robotics Engineer, Renewable Energy Expert, Bioinformatics Specialist, and Nanotechnology Researcher."
  },
  {
    question: "Do I need coaching for JEE/NEET/CET?",
    answer: "While coaching can be helpful, it's not mandatory. Many students succeed through self-study using quality study materials, online resources, and practice tests. CET exams are generally more manageable for self-preparation compared to JEE/NEET."
  }
];

// Function to map career titles to their corresponding icons
const getCareerIcon = (title) => {
  const iconMap = {
    'Physicist': <FaAtom size={24} />,
    'Chemist': <FaFlask size={24} />,
    'Biologist': <FaMicroscope size={24} />,
    'Software Engineer': <FaLaptopCode size={24} />,
    'Doctor': <FaUserMd size={24} />,
    'Professor': <FaChalkboardTeacher size={24} />,
    'Engineer': <FaCogs size={24} />,
    'Architect': <FaBuilding size={24} />,
    'Robotics Engineer': <FaRobot size={24} />,
    'Biotechnologist': <FaDna size={24} />,
    'Pharmacist': <FaPrescriptionBottle size={24} />,
    'Dentist': <FaTooth size={24} />,
    'Researcher': <FaGraduationCap size={24} />,
    'Teacher': <FaBook size={24} />
  };

  return iconMap[title] || <FaBriefcase size={24} />; // Default icon if title not found
};

const ScienceStream = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    stream: "All",
    field: "All",
    careerType: "All",
    salaryLevel: "All",
    examType: "All"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const [assessmentStarted, setAssessmentStarted] = useState(false);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCareerClick = (career) => {
    setSelectedCareer(career);
    setShowModal(true);
  };

  const handleQuizClick = () => {
    // TODO: Implement quiz functionality
    console.log("Quiz button clicked");
  };

  const handleStartClick = () => {
    const careerSection = document.getElementById('careers-section');
    if (careerSection) {
      careerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startAssessment = () => {
    setAssessmentStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.science.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      analyzeAnswers(newAnswers);
    }
  };

  const analyzeAnswers = (finalAnswers) => {
    // Count the frequency of each option type
    const optionCounts = finalAnswers.reduce((counts, answer) => {
      if (answer === 0) counts.science++;
      else if (answer === 1) counts.creative++;
      else if (answer === 2) counts.social++;
      else if (answer === 3) counts.tech++;
      return counts;
    }, { science: 0, creative: 0, social: 0, tech: 0 });

    // Get recommended careers based on highest scores
    const recommendedCareers = getRecommendedCareers(optionCounts);
    setRecommendedCareers(recommendedCareers);
    setShowResults(true);
  };

  const getRecommendedCareers = (counts) => {
    const recommendations = [];
    
    if (counts.science >= 2) {
      recommendations.push(...scienceCareers.pcb.filter(career => 
        career.category === "Research" || career.category === "Medicine"
      ));
    }
    
    if (counts.tech >= 2) {
      recommendations.push(...scienceCareers.pcm.filter(career => 
        career.category === "Technology"
      ));
    }

    if (counts.social >= 2) {
      recommendations.push(...scienceCareers.pcb.filter(career => 
        career.workAreas.some(area => area.includes("Hospital") || area.includes("Care"))
      ));
    }

    // If no specific recommendations, provide general science careers
    if (recommendations.length === 0) {
      recommendations.push(...scienceCareers.pcm.slice(0, 3));
    }

    return recommendations.slice(0, 5); // Return top 5 recommendations
  };

  const resetAssessment = () => {
    setAssessmentStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendedCareers([]);
  };

  // Filter careers based on selected criteria
  const getFilteredCareers = () => {
    let filtered = Object.values(scienceCareers).flat();

    // Filter by stream
    if (selectedFilters.stream !== "All") {
      filtered = filtered.filter(career => career.stream === selectedFilters.stream);
    }

    // Filter by field/category
    if (selectedFilters.field !== "All") {
      filtered = filtered.filter(career => {
        const field = selectedFilters.field.toLowerCase();
        return career.category.toLowerCase().includes(field) ||
               career.workAreas.some(area => area.toLowerCase().includes(field));
      });
    }

    // Filter by career type
    if (selectedFilters.careerType !== "All") {
      filtered = filtered.filter(career => {
        const type = selectedFilters.careerType.toLowerCase();
        return career.workAreas.some(area => area.toLowerCase().includes(type));
      });
    }

    // Filter by salary level
    if (selectedFilters.salaryLevel !== "All") {
      filtered = filtered.filter(career => {
        const salary = parseInt(career.salaryRange.split("-")[1]);
        switch (selectedFilters.salaryLevel) {
          case "Entry Level":
            return salary <= 15;
          case "Mid Level":
            return salary > 15 && salary <= 30;
          case "Senior Level":
            return salary > 30;
          default:
            return true;
        }
      });
    }

    // Filter by exam type
    if (selectedFilters.examType !== "All") {
      filtered = filtered.filter(career =>
        career.exams.some(exam => 
          exam.toLowerCase().includes(selectedFilters.examType.toLowerCase())
        )
      );
    }

    return filtered;
  };

  const filteredCareers = getFilteredCareers();

    return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>Explore Science Careers</HeroTitle>
        <HeroSubtitle>
          Discover exciting career opportunities in science, technology, engineering, and mathematics.
          From groundbreaking research to innovative solutions, find your path in the world of science.
        </HeroSubtitle>
      </HeroSection>

      <AssessmentSection id="assessment">
        <AssessmentTitle>Discover Your Scientific Calling</AssessmentTitle>
        <AssessmentDescription>
          Take our comprehensive career assessment to find out which scientific field
          best matches your interests and talents.
        </AssessmentDescription>
        
        {!assessmentStarted ? (
          <CTAButton onClick={startAssessment}>
            Start Assessment
          </CTAButton>
        ) : !showResults ? (
          <QuestionCard>
            <QuestionText>
              Question {currentQuestionIndex + 1} of {questions.science.length}: {questions.science[currentQuestionIndex].question}
            </QuestionText>
            {questions.science[currentQuestionIndex].options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={answers[currentQuestionIndex] === index ? 'selected' : ''}
              >
                {option}
              </OptionButton>
            ))}
            <div style={{ marginTop: '1rem', textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
              Progress: {currentQuestionIndex + 1} / {questions.science.length}
            </div>
          </QuestionCard>
        ) : (
          <ResultCard>
            <h3>🎉 Assessment Complete!</h3>
            <p>Based on your responses, here are your recommended career paths in Science:</p>
            <CareerGrid style={{ marginTop: '2rem' }}>
              {recommendedCareers.map(career => (
                <CareerCard key={career.id} onClick={() => handleCareerClick(career)}>
                  <CardHeader>
                    {getCareerIcon(career.title)}
                    <CardTitle>{career.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDetail>
                      <strong>Stream:</strong> {career.stream}
                    </CardDetail>
                    <CardDetail>
                      <strong>Degree:</strong> {career.degree}
                    </CardDetail>
                    <CardDetail>
                      <strong>Salary Range:</strong> {career.salaryRange}
                    </CardDetail>
                    <CardDetail>
                      <strong>Category:</strong> {career.category}
                    </CardDetail>
                    <div style={{ marginTop: '1rem' }}>
                      {career.workAreas.slice(0, 2).map(area => (
                        <Tag key={area}>{area}</Tag>
                      ))}
                    </div>
                    <Button>Learn More</Button>
                  </CardContent>
                </CareerCard>
              ))}
            </CareerGrid>
            <CTAButton onClick={resetAssessment}>
              Retake Assessment
            </CTAButton>
          </ResultCard>
        )}
      </AssessmentSection>

      <FilterSection id="careers-section">
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Stream</FilterLabel>
            <Select 
              value={selectedFilters.stream}
              onChange={(e) => handleFilterChange('stream', e.target.value)}
            >
              {filters.stream.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Field</FilterLabel>
            <Select
              value={selectedFilters.field}
              onChange={(e) => handleFilterChange('field', e.target.value)}
            >
              {filters.field.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Career Type</FilterLabel>
            <Select
              value={selectedFilters.careerType}
              onChange={(e) => handleFilterChange('careerType', e.target.value)}
            >
              {filters.careerType.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Salary Level</FilterLabel>
            <Select
              value={selectedFilters.salaryLevel}
              onChange={(e) => handleFilterChange('salaryLevel', e.target.value)}
            >
              {filters.salaryLevel.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Entrance Exam</FilterLabel>
            <Select
              value={selectedFilters.examType}
              onChange={(e) => handleFilterChange('examType', e.target.value)}
            >
              {filters.examType.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </FilterGroup>
        </FilterGrid>
      </FilterSection>

      {filteredCareers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#4a5568' }}>
          <h3>No careers match your selected filters</h3>
          <p>Try adjusting your filters to see more options</p>
        </div>
      ) : (
        <CareerGrid>
          {filteredCareers.map(career => (
            <CareerCard key={career.id} onClick={() => handleCareerClick(career)}>
              <CardHeader>
                <career.icon size={24} />
                <CardTitle>{career.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDetail>
                  <strong>Stream:</strong> {career.stream}
                </CardDetail>
                <CardDetail>
                  <strong>Exams:</strong> {career.exams.join(", ")}
                </CardDetail>
                <CardDetail>
                  <strong>Degree:</strong> {career.degree}
                </CardDetail>
                <CardDetail>
                  <strong>Salary:</strong> {career.salaryRange}
                </CardDetail>
                <CardDetail>
                  <strong>Work Areas:</strong>
                  {career.workAreas.map(area => (
                    <Tag key={area}>{area}</Tag>
                  ))}
                </CardDetail>
                <Button>Learn More</Button>
              </CardContent>
            </CareerCard>
          ))}
        </CareerGrid>
      )}

      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQGrid>
          <FAQCard>
            <h3>What are the core subjects in Science stream?</h3>
            <p>
              The core subjects include Physics, Chemistry, and Mathematics/Biology.
              These subjects form the foundation for various career paths in science,
              engineering, and healthcare.
            </p>
            </FAQCard>
          <FAQCard>
            <h3>Which entrance exams are important?</h3>
            <p>
              Key entrance exams include JEE (Engineering), NEET (Medical), KVPY (Research),
              and various state-level engineering and medical entrance tests.
            </p>
          </FAQCard>
          <FAQCard>
            <h3>What are the emerging career opportunities?</h3>
            <p>
              Artificial Intelligence, Data Science, Biotechnology, Renewable Energy,
              and Robotics are some of the fastest-growing fields with excellent
              career prospects.
            </p>
          </FAQCard>
        </FAQGrid>
      </FAQSection>

      {showModal && (
        <CareerDetailModal
          career={selectedCareer}
          onClose={() => setShowModal(false)}
        />
      )}
    </PageContainer>
    );
};

export default ScienceStream; 