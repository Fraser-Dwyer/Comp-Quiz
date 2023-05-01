import "../styles/Leaderboard.css";
import { useSelector } from "react-redux";
import allUsers from "../users/users.json";

const Leaderboard = ({ allScores }) => {
  const myUserName = useSelector((state) => state.user.name);
  const person = [];

  if (allScores) {
    for (let i = 0; i < allUsers.length; i++) {
      var temp = {
        username: allUsers[i].username,
        displayName: allUsers[i].displayName,
        score: allScores[i].score,
        image: allUsers[i].image,
      };
      person.push(temp);
    }
  }
  const listPos = []; // for the top 10

  // positioning index from: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
  function ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  // Sorting the leaderboard by score
  function sortScore(a, b) {
    const diff = a.score - b.score;
    return -1 * diff;
  }

  if (person.length !== 0) {
    person.sort((a, b) => sortScore(a, b));
  }

  // Check if user is first place
  var first = <p></p>;
  if (person.length !== 0 && myUserName !== null) {
    if (person[0].username === myUserName) {
      first = (
        <div>
          <p className="positiononeme">1</p>
          <img
            className="pictureoneme"
            alt="Profile"
            src={person[0].image}
          ></img>
          <p className="nameoneme">{person[0].displayName}</p>
          <p className="pointsoneme">{person[0].score}</p>
        </div>
      );
    } else {
      first = (
        <div>
          <p className="positionone">1</p>
          <img
            className="pictureoneme"
            alt="Profile"
            src={person[0].image}
          ></img>
          <p className="nameone">{person[0].displayName}</p>
          <p className="pointsone">{person[0].score}</p>
        </div>
      );
    }
  }

  // The rest of the top 10
  if (person.length !== 0 && myUserName !== null) {
    var limit = person.length;
    if (person.length > 11) {
      limit = 11;
    }

    for (let i = 2; i < limit; i++) {
      if (person[i - 1].username === myUserName) {
        listPos.push(
          <div key={i} className="contestantcontainer">
            <p className="positionuser">{i}</p>
            <img alt="Profile" src={person[i - 1].image}></img>
            <p className="nameuser">{person[i - 1].displayName}</p>
            <p className="pointsuser">{person[i - 1].score}</p>
          </div>
        );
      } else {
        listPos.push(
          <div key={i} className="contestantcontainer">
            {/* person[i - 1].image*/}
            <p className="position">{i}</p>
            <img alt="Profile" src={person[i - 1].image}></img>
            <p className="name">{person[i - 1].displayName}</p>
            <p className="points">{person[i - 1].score}</p>
          </div>
        );
      }
    }
  }
  if (limit < 11) {
    for (let i = limit; i < 11; i++) {
      listPos.push(
        <div key={i} className="contestantcontainer">
          <p className="position">{i}</p>
        </div>
      );
    }
  }

  return (
    <div className="leaderboardcontainer">
      <h2>Leaderboard</h2>
      {allUsers && first}
      {allUsers && listPos}
      {allUsers && (
        <div className="box">
          <p>
            You are in{" "}
            {
              <b>
                {ordinal_suffix_of(
                  person.findIndex((obj) => obj.username === myUserName) + 1
                )}{" "}
                place
              </b>
            }{" "}
            (of {allUsers.length} users)
          </p>
        </div>
      )}
      {allUsers && (
        <img
          className="bottomperson"
          alt="Profile"
          src={
            person[person.findIndex((obj) => obj.username === myUserName)].image
          }
        ></img>
      )}
    </div>
  );
};

export default Leaderboard;
