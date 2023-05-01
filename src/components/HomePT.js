import Leaderboard from "./Leaderboard";
import MyHistogram from "./MyHistogram";
import AnswerSelection from "./AnswerSelection";
import Popup from "./Popup";
import "../styles/HomePT.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeQuestionNumber } from "../features/user/userSlice";
//import allQuestions from "../questions.json";
import type1Q from "../questions/popQuestions.json";
import type2Q from "../questions/dsaQuestions.json";
import allUsers from "../users/users.json";

// Db Stuff
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";

const HomePT = () => {
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
  const [showHistogram, setShowHistogram] = useState(false);
  const [buttonText, setButtonText] = useState("Histogram");
  const [allStyles, setAllStyles] = useState(defaultStyles);
  const [optionPicked, setOptionPicked] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [correct, setCorrect] = useState("Correct!");
  const [guess, setGuess] = useState(-1);
  var maxQ = 1;
  const questionNumber = useSelector((state) => state.user.question);

  const whatQuestions = useSelector((state) => state.user.topic_chosen);
  var allQuestions = type1Q;
  if (whatQuestions === "Data Structures & Algorithms") {
    allQuestions = type2Q;
    maxQ = type2Q.length;
  } else {
    allQuestions = type1Q;
    maxQ = type1Q.length;
  }

  const handleClickSwap = () => {
    setShowHistogram(!showHistogram);
    if (buttonText === "Histogram") {
      setButtonText("Leaderboard");
    } else {
      setButtonText("Histogram");
    }
  };

  // When clicking button to close the reason for the answer, right before next Q
  const handleOkay = () => {
    //const nextQ = randomNumber();
    setAllStyles(defaultStyles);
    setOptionPicked(false);
    if (questionNumber + 1 > maxQ) {
      dispatch(changeQuestionNumber(1));
    } else {
      dispatch(changeQuestionNumber(questionNumber + 1));
    }
    setShowReason(false);
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
      handlePointIncrease();
      setCorrect("Correct! (+1 Point!)");
    } else {
      setCorrect("Incorrect!");
    }
  };

  // Handles clicking an option before submitting
  const handleClick = (number) => {
    var newStyles = defaultStyles;
    newStyles[number] = "answeroptionpicked";
    setAllStyles(newStyles);
    setOptionPicked(true);
    setGuess(number);
  };

  const [allScores, setAllScores] = useState();

  useEffect(() => {
    const query = ref(db, "users");
    return onValue(query, (snapshot) => {
      const theData = snapshot.val();
      if (snapshot.exists()) {
        setAllScores(theData);
      }
    });
  }, []);

  // Handles point increase being sent to back end
  const myUserIDPlusOne = useSelector((state) => state.user.id);
  const myUserID = myUserIDPlusOne - 1;
  const handlePointIncrease = () => {
    if (allScores) {
      const user = allUsers.filter((person) => person.id === myUserIDPlusOne);
      const userScore = allScores.filter(
        (animal) => animal.username === user[0].username
      );
      const updatedUser = {
        score: userScore[0].score + 1,
        username: user[0].username,
      };
      fetch(
        "https://production-comp-quiz-1-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          myUserID +
          ".json",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      ).then(() => {
        console.log("Score Incremented");
      });
    }
  };

  return (
    <div className="notfullbox">
      <div className="leftside">
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
      </div>

      {showReason === true && (
        <Popup
          reason={allQuestions[questionNumber - 1].reason}
          fullQuestion={allQuestions[questionNumber - 1]}
          outcome={correct}
          handleOkay={handleOkay}
        />
      )}

      <div className="rightside">
        <button className="swap" onClick={handleClickSwap}>
          {buttonText}
        </button>
        {allScores && <Leaderboard allScores={allScores} />}

        {allScores && showHistogram && (
          <MyHistogram allUsers={allUsers} allScores={allScores}></MyHistogram>
        )}
        {optionPicked === false && (
          <button className="nosubmitbutton">Submit</button>
        )}
        {optionPicked === true && (
          <button className="submitbutton" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePT;
