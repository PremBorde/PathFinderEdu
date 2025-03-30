import React, { useState } from 'react';
import IntroSection from './IntroSection';
import QuestionSection from './QuestionSection';
import ResultSection from './ResultSection';
import { assessmentQuestions } from './assessmentData';
import { CareerAIModel } from './CareerAIModel';
import './Assessment.css';

const Assessment = () => {
    const [currentSection, setCurrentSection] = useState('intro'); // intro, questions, results
    const [responses, setResponses] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentCategory, setCurrentCategory] = useState('skills');
    const aiModel = new CareerAIModel();

    const handleStartAssessment = () => {
        setCurrentSection('questions');
    };

    const handleOptionSelect = (optionIndex) => {
        setResponses(prev => ({
            ...prev,
            [currentCategory]: {
                ...prev[currentCategory],
                [currentQuestionIndex]: optionIndex
            }
        }));
    };

    const navigateQuestion = (direction) => {
        const categories = ['skills', 'interests', 'personality', 'preferences'];
        const currentCategoryQuestions = assessmentQuestions[currentCategory];

        if (direction === 1 && currentQuestionIndex === currentCategoryQuestions.length - 1) {
            // Move to next category
            const currentCategoryIndex = categories.indexOf(currentCategory);
            if (currentCategoryIndex < categories.length - 1) {
                setCurrentCategory(categories[currentCategoryIndex + 1]);
                setCurrentQuestionIndex(0);
            } else {
                // End of assessment
                setCurrentSection('results');
            }
        } else if (direction === -1 && currentQuestionIndex === 0) {
            // Move to previous category
            const currentCategoryIndex = categories.indexOf(currentCategory);
            if (currentCategoryIndex > 0) {
                setCurrentCategory(categories[currentCategoryIndex - 1]);
                setCurrentQuestionIndex(assessmentQuestions[categories[currentCategoryIndex - 1]].length - 1);
            }
        } else {
            // Move within current category
            setCurrentQuestionIndex(prev => prev + direction);
        }
    };

    const restartAssessment = () => {
        setCurrentSection('intro');
        setResponses({});
        setCurrentQuestionIndex(0);
        setCurrentCategory('skills');
    };

    const calculateProgress = (currentCategory, currentQuestionIndex) => {
        const categories = ['skills', 'interests', 'personality', 'preferences'];
        const totalQuestions = Object.values(assessmentQuestions).reduce(
            (total, category) => total + category.length,
            0
        );
        
        let completedQuestions = 0;
        for (let i = 0; i < categories.indexOf(currentCategory); i++) {
            completedQuestions += assessmentQuestions[categories[i]].length;
        }
        completedQuestions += currentQuestionIndex + 1;
        
        return (completedQuestions / totalQuestions) * 100;
    };

    return (
        <div className="assessment-container">
            {currentSection === 'intro' && (
                <IntroSection onStart={handleStartAssessment} />
            )}

            {currentSection === 'questions' && (
                <QuestionSection
                    question={assessmentQuestions[currentCategory][currentQuestionIndex]}
                    currentResponse={responses[currentCategory]?.[currentQuestionIndex]}
                    onOptionSelect={handleOptionSelect}
                    onNavigate={navigateQuestion}
                    isFirstQuestion={currentCategory === 'skills' && currentQuestionIndex === 0}
                    isLastQuestion={
                        currentCategory === 'preferences' && 
                        currentQuestionIndex === assessmentQuestions.preferences.length - 1
                    }
                    progress={calculateProgress(currentCategory, currentQuestionIndex)}
                />
            )}

            {currentSection === 'results' && (
                <ResultSection
                    recommendations={aiModel.analyzeResponses(responses)}
                    onRestart={restartAssessment}
                />
            )}
        </div>
    );
};

export default Assessment; 