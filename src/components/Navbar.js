import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeTopic, removeUser } from "../features/user/userSlice";
import menu from "../assets/menu.png";
import { useState } from "react";
import Menu from "./Menu";
import Topic from "./Topic";
import { useHistory } from "react-router-dom";
import icon from "../images/icon.png";

const Navbar = () => {
  const myUser = useSelector((state) => state.user.count);
  const myUserName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const [menued, setMenued] = useState(false);
  const [topiced, setTopiced] = useState(false);
  const history = useHistory();

  const handleMenu = () => {
    setMenued(!menued);
  };

  const handleTopic = () => {
    setTopiced(!topiced);
  };

  const handlePT = () => {
    history.push("/home-pt");
    setMenued(false);
  };

  const handleControl = () => {
    history.push("/home");
    setMenued(false);
  };

  const handlePop = () => {
    setTopiced(!topiced);
    dispatch(changeTopic("Princples of Programming"));
  };

  const handleDsa = () => {
    setTopiced(!topiced);
    dispatch(changeTopic("Data Structures & Algorithms"));
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={icon}></img>
      </div>
      <h1>Comp Quiz</h1>
      {myUser === 0 && (
        <div className="allLinks">
          <Link className="unlogged" to="/">
            Login
          </Link>
          <Link className="unlogged" to="/sign-up">
            Sign up
          </Link>
        </div>
      )}
      {myUser === 1 && (
        <div className="allLinks">
          <Link className="welcome" to="/">
            Welcome {myUserName}
          </Link>
          <p
            className="links"
            onClick={() => {
              handleTopic();
            }}
          >
            Topic
          </p>
          <Link className="links" to="/">
            <span className="spanlink" onClick={() => dispatch(removeUser())}>
              Logout
            </span>
          </Link>
          <img
            className="icon"
            src={menu}
            onClick={() => {
              handleMenu();
            }}
          ></img>
        </div>
      )}
      {menued && <Menu handleControl={handleControl} handlePT={handlePT} />}
      {topiced && <Topic handlePop={handlePop} handleDsa={handleDsa} />}
    </nav>
  );
};

export default Navbar;
