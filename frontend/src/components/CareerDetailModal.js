import React from 'react';
import styled from 'styled-components';
import { 
  FaTimes, 
  FaGraduationCap, 
  FaChartLine, 
  FaBriefcase, 
  FaBook, 
  FaBuilding, 
  FaLink,
  FaExternalLinkAlt
} from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 30px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #4a5568;
  
  &:hover {
    color: #2d3748;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Timeline = styled.div`
  position: relative;
  margin: 30px 0;
  padding-left: 30px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #4299e1;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
  
  &::before {
    content: '';
    position: absolute;
    left: -34px;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4299e1;
    border: 2px solid white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const Card = styled.div`
  background: #f7fafc;
  border-radius: 8px;
  padding: 15px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #4299e1;
  }
`;

const ResourceLink = styled.a`
  color: #4299e1;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CareerDetailModal = ({ career, onClose }) => {
  if (!career) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>

        <Title>{career.title}</Title>

        <Section>
          <SectionTitle>
            <FaGraduationCap />
            Education Path
          </SectionTitle>
          <Timeline>
            <TimelineItem>
              <strong>Class 12th (Science Stream)</strong>
              <p>PCM/PCB with minimum 75% marks</p>
            </TimelineItem>
            <TimelineItem>
              <strong>Entrance Exams</strong>
              <p>{career.exams.join(", ")}</p>
            </TimelineItem>
            <TimelineItem>
              <strong>Bachelor's Degree</strong>
              <p>{career.degree}</p>
            </TimelineItem>
            <TimelineItem>
              <strong>Optional Higher Studies</strong>
              <p>Masters/PhD for research and specialization</p>
            </TimelineItem>
          </Timeline>
        </Section>

        <Section>
          <SectionTitle>
            <FaBook />
            Required Subjects & Skills
          </SectionTitle>
          <Grid>
            <Card>
              <h4>Core Subjects</h4>
              <List>
                {career.stream === "PCM" && (
                  <>
                    <ListItem>Physics</ListItem>
                    <ListItem>Chemistry</ListItem>
                    <ListItem>Mathematics</ListItem>
                  </>
                )}
                {career.stream === "PCB" && (
                  <>
                    <ListItem>Physics</ListItem>
                    <ListItem>Chemistry</ListItem>
                    <ListItem>Biology</ListItem>
                  </>
                )}
                {career.stream === "PCMB" && (
                  <>
                    <ListItem>Physics</ListItem>
                    <ListItem>Chemistry</ListItem>
                    <ListItem>Mathematics</ListItem>
                    <ListItem>Biology</ListItem>
                  </>
                )}
              </List>
            </Card>
            <Card>
              <h4>Key Skills</h4>
              <List>
                {career.skills.map((skill, index) => (
                  <ListItem key={index}>{skill}</ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            <FaBriefcase />
            Career Prospects
          </SectionTitle>
          <Grid>
            <Card>
              <h4>Work Areas</h4>
              <List>
                {career.workAreas.map((area, index) => (
                  <ListItem key={index}>{area}</ListItem>
                ))}
              </List>
            </Card>
            <Card>
              <h4>Salary Range</h4>
              <p>{career.salaryRange}</p>
              <small>*Varies based on experience and location</small>
            </Card>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            <FaBuilding />
            Top Organizations
          </SectionTitle>
          <Grid>
            <Card>
              <List>
                <ListItem>Leading Companies in the Field</ListItem>
                <ListItem>Research Institutions</ListItem>
                <ListItem>Government Organizations</ListItem>
                <ListItem>Startups and Innovation Hubs</ListItem>
              </List>
            </Card>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            <FaLink />
            Useful Resources
          </SectionTitle>
          <Grid>
            <Card>
              <List>
                <ListItem>
                  <ResourceLink href="#" target="_blank">
                    Entrance Exam Details
                    <FaExternalLinkAlt size={12} />
                  </ResourceLink>
                </ListItem>
                <ListItem>
                  <ResourceLink href="#" target="_blank">
                    Top Colleges
                    <FaExternalLinkAlt size={12} />
                  </ResourceLink>
                </ListItem>
                <ListItem>
                  <ResourceLink href="#" target="_blank">
                    Career Guides
                    <FaExternalLinkAlt size={12} />
                  </ResourceLink>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Section>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CareerDetailModal; 