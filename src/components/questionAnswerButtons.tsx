import React from 'react';

type QuestionAnswerButtonsProps = {
  onAnswerSelect: (answer: string) => void;
  questionData: {
    question: string;
    answers: string[];
  };
};

const QuestionAnswerButtons: React.FC<QuestionAnswerButtonsProps> = ({ onAnswerSelect, questionData }) => {
  return (
    <div>
      <h2>{questionData.question}</h2>
      <div className="button_group">
        {questionData.answers.map((answer, index) => (
          <button
            key={index}
            value={answer}
            onClick={() => onAnswerSelect(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnswerButtons;
