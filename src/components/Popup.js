import React from "react";
import "../styles/Popup.css";

const Popup = ({ reason, fullQuestion, outcome, handleOkay }) => {
  const options = ["A", "B", "C", "D", "E"];
  return (
    <div className="background">
      <div className="main">
        <h3>{outcome}</h3>
        <div className="encapsulate">
          <div className="RepeatQ">
            <h4>Question:</h4>
            {fullQuestion.question.map((item, i) => {
              if (item === "image") {
                const imageStyle = {
                  width: "300px",
                  margin: "20px auto",
                  border: "2px solid black",
                  padding: "10px",
                  marginTop: "20px",
                };
                return (
                  <div key={i} style={{ width: "100%", textAlign: "center" }}>
                    <img
                      alt="question"
                      src={fullQuestion.image[0]}
                      style={imageStyle}
                    ></img>
                  </div>
                );
              }
              return (
                <div>
                  <p key={i}>{item}</p>
                </div>
              );
            })}
            {fullQuestion.answers.map((item, i) => {
              return (
                <p key={i}>
                  {options[i]} - {item}
                </p>
              );
            })}
          </div>
          <div className="reasonCont">
            <h4>Answer:</h4>
            {reason.map((item, i) => {
              if (item === "image") {
                const imageStyle = {
                  width: "300px",
                  margin: "20px auto",
                  border: "2px solid black",
                  padding: "10px",
                  marginTop: "20px",
                };
                return (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <img
                      key={i}
                      alt="question"
                      src={fullQuestion.reason_image[0]}
                      style={imageStyle}
                    ></img>
                  </div>
                );
              }
              return (
                <p className="explanation" key={i}>
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <button className="okayButton" onClick={() => handleOkay()}>
          OKAY
        </button>
      </div>
    </div>
  );
};

export default Popup;
