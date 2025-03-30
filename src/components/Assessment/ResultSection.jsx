import React from 'react';

const ResultSection = ({ recommendations, onRestart }) => (
    <div className="assessment-section active">
        <div className="results-container">
            <div className="results-summary">
                <h3>Based on your responses, here are your top career matches:</h3>
                {recommendations.map((rec, index) => (
                    <CareerRecommendation
                        key={index}
                        number={index + 1}
                        career={rec.career}
                        score={rec.score}
                        explanation={rec.explanation}
                    />
                ))}
            </div>
            <button className="restart-assessment" onClick={onRestart}>
                Take Assessment Again
            </button>
        </div>
    </div>
);

const CareerRecommendation = ({ number, career, score, explanation }) => (
    <div className="career-recommendation">
        <h4>{number}. {career}</h4>
        <p className="match-score">Match Score: {score}%</p>
        <p className="explanation">{explanation}</p>
    </div>
);

export default ResultSection; 