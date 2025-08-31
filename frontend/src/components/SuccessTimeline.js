import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TimelineContainer = styled.div`
  .vertical-timeline-element-content {
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
    box-shadow: ${({ theme }) => theme.shadow};
  }
  .vertical-timeline-element-icon {
    background: ${({ theme }) => theme.buttonBackground};
    color: #fff;
  }
  .vertical-timeline::before {
    background: ${({ theme }) => theme.text};
  }
`;

const SuccessTimeline = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <TimelineContainer>
            {/* Timeline placeholder since react-vertical-timeline-component is removed */}
            <div className="timeline-placeholder">
                <h3>Software Engineer, Tech Corp</h3>
                <p>2020 - present</p>
                <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                <h3>B.Tech in Computer Science</h3>
                <p>April 2018</p>
                <p>Graduated with honors, focusing on AI and Machine Learning.</p>
            </div>
        </TimelineContainer>
    );
};

export default SuccessTimeline; 