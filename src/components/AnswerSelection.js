import React from "react";
import "../styles/Home.css";

// Component for formatting the answers to each question

const AnswerSelection = ({ answers, styles, handleClick }) => {
  const numbers = [0, 1, 2, 3, 4];
  const letters = ["A", "B", "C", "D", "E"];
  return (
    <div>
      {numbers.map((number) => (
        <div className="answerbox" key={number}>
          <button
            className={styles[number]}
            onClick={() => handleClick(number)}
          >
            {letters[number]}
          </button>
          <p>{answers[number]}</p>
        </div>
      ))}
    </div>
  );
};

export default AnswerSelection;
