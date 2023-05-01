import React from "react";
import AnswerSelection from "./AnswerSelection";
import "../styles/Home.css";
import Popup from "./Popup";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeQuestionNumber } from "../features/user/userSlice";
import type1Q from "../questions/popQuestions.json";
import type2Q from "../questions/dsaQuestions.json";

// Component for the main content container

const Home = (props) => {
  const dispatch = useDispatch();

  // Default styles for the answer option buttons
  const defaultStyles = [
    "answeroption",
    "answeroption",
    "answeroption",
    "answeroption",
    "answeroption",
  ];

  // React state hooks used for controlling certain states in the component
  const [allStyles, setAllStyles] = useState(defaultStyles);
  const [optionPicked, setOptionPicked] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [correct, setCorrect] = useState("Correct!");
  const [guess, setGuess] = useState(-1);
  var maxQ = 1;
  const questionNumber = useSelector((state) => state.user.question);

  // Get the username of user logged in
  const whatQuestions = useSelector((state) => state.user.topic_chosen);
  var allQuestions = type1Q;
  if (whatQuestions === "Data Structures & Algorithms") {
    allQuestions = type2Q;
    maxQ = type2Q.length;
  } else {
    allQuestions = type1Q;
    maxQ = type1Q.length;
  }

  // When clicking button to close the reason for the answer, right before next Q
  const handleOkay = () => {
    setAllStyles(defaultStyles);
    setOptionPicked(false);
    if (questionNumber + 1 > maxQ) {
      dispatch(changeQuestionNumber(1));
    } else {
      dispatch(changeQuestionNumber(questionNumber + 1));
    }
    setShowReason(false);
  };

  // Handles clicking an option before submitting
  const handleClick = (number) => {
    var newStyles = defaultStyles;
    newStyles[number] = "answeroptionpicked";
    setAllStyles(newStyles);
    setOptionPicked(true);
    setGuess(number);
  };

  // Handles the submit button, once an answer has been selected
  const handleSubmit = () => {
    setOptionPicked(false);
    var newStyles = allStyles;
    var rightAns = allQuestions[questionNumber - 1].answer;
    newStyles[rightAns] = "answeroptioncorrect";
    setAllStyles(newStyles);
    setShowReason(true);
    if (guess === rightAns) {
      setCorrect("Correct!");
    } else {
      setCorrect("Incorrect!");
    }
  };

  useEffect(() => {}, [allStyles, optionPicked]);

  return (
    <div className={props.class}>
      <h2 className="questionnum">
        Question {questionNumber} - {whatQuestions}
      </h2>
      <div className="questiondiv">
        {allQuestions &&
          allQuestions[questionNumber - 1].question.map((item, i) => {
            if (item === "image") {
              const imageStyle = {
                width: allQuestions[questionNumber - 1].image[1],
                margin: "20px auto",
                border: "2px solid black",
                padding: "10px",
                marginTop: "20px",
              };
              return (
                <div key={i} style={{ width: "100%", textAlign: "center" }}>
                  <img
                    alt="question"
                    src={allQuestions[questionNumber - 1].image[0]}
                    style={imageStyle}
                  ></img>
                </div>
              );
            }
            return <p key={i}>{item}</p>;
          })}
      </div>
      <div className="answerdiv">
        {allQuestions !== null && (
          <AnswerSelection
            answers={allQuestions[questionNumber - 1].answers}
            styles={allStyles}
            handleClick={handleClick}
          ></AnswerSelection>
        )}
      </div>
      {optionPicked === false && (
        <button className={props.buttonClassOne}>Submit</button>
      )}
      {optionPicked === true && (
        <button className={props.buttonClassTwo} onClick={() => handleSubmit()}>
          Submit
        </button>
      )}
      {showReason === true && (
        <Popup
          reason={allQuestions[questionNumber - 1].reason}
          fullQuestion={allQuestions[questionNumber - 1]}
          outcome={correct}
          handleOkay={handleOkay}
        />
      )}
    </div>
  );
};

export default Home;
