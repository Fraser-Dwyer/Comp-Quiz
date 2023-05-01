import React from "react";
import { useEffect, useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/Login.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  addUserName,
  addUserID,
  changeQuestionNumber,
} from "../features/user/userSlice";
import allUsers from "../users/users.json";

// This tutorial followed for setting up the firebase back end
// https://medium.com/innovance-company-blog/how-to-connect-firebase-realtime-database-to-a-react-app-f7dcb983150a

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [allowLogin, setAllowLogin] = useState(false);
  const [unsuccessfulLogin, setUnsuccessfulLogin] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  // Event handler for login attempt
  const handleSubmit = (e) => {
    e.preventDefault();
    var loggedIn = false;
    for (let index in allUsers) {
      const user = allUsers[index];
      if (
        username.toLowerCase === user.username.toLowerCase &&
        password === user.password
      ) {
        dispatch(addUser());
        dispatch(
          addUserName(username.charAt(0).toUpperCase() + username.slice(1))
        );
        dispatch(addUserID(user.id));
        dispatch(changeQuestionNumber(1));
        loggedIn = true;
        history.push("/home");
      }
    }
    if (loggedIn === false) {
      setUnsuccessfulLogin(true);
      setPassword("");
      console.log("Login Unsuccessful");
    }
  };

  // Remove incorrect login details error msg
  const handleClose = (e) => {
    e.preventDefault();
    setUnsuccessfulLogin(false);
  };

  // Check for if should show login button active or not
  useEffect(() => {
    if (username !== "" && password !== "") {
      setAllowLogin(true);
    } else {
      setAllowLogin(false);
    }
  }, [username, password]);

  return (
    <div className="login">
      {/* If not loading and no error */}
      {allUsers !== null && (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            title="username"
            autoComplete="new-password"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            title="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="log">
            {unsuccessfulLogin && (
              <div className="nologin">
                <p>Incorrect Login Details</p>
                <CloseButton onClick={handleClose} className="cross" />
              </div>
            )}
            {!unsuccessfulLogin && <p></p>}
            {allowLogin && (
              <button onClick={handleSubmit} className="abledButton">
                Login
              </button>
            )}
            {!allowLogin && <button className="disabledButton">Login</button>}
          </div>
        </form>
      )}

      {allUsers && (
        <div className="signup">
          <p>Don't have an account?</p>
          <Link to="/sign-up">Sign Up Here</Link>
        </div>
      )}
    </div>
  );
};

export default Login;
