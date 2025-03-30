import React from 'react';

const QuestionSection = ({
    question,
    currentResponse,
    onOptionSelect,
    onNavigate,
    isFirstQuestion,
    isLastQuestion,
    progress
}) => (
    <div className="assessment-section active">
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="question-container">
            <div className="question">
                <h3>{question.question}</h3>
                <div className="options">
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${currentResponse === index ? 'selected' : ''}`}
                            onClick={() => onOptionSelect(index)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="navigation-buttons">
            <button
                className="nav-button"
                onClick={() => onNavigate(-1)}
                disabled={isFirstQuestion}
            >
                Previous
            </button>
            <button
                className="nav-button"
                onClick={() => onNavigate(1)}
            >
                {isLastQuestion ? 'See Results' : 'Next'}
            </button>
        </div>
    </div>
);

export default QuestionSection; 