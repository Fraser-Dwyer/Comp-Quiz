import React from "react";
import { useState, useEffect } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useHistory } from "react-router-dom";
import "../styles/Sign-Up.css";
import allUsers from "../users/users.json";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [allowCreate, setAllowCreate] = useState(false);
  const [unsuccessfulSignup, setUnsuccessfulSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // detail checking function before signing up
  const checkDetails = () => {
    // Check to see if passwords match
    if (password !== passwordAgain) {
      setErrorMessage("Passwords do not match!");
      setPassword("");
      setPasswordAgain("");
      setUnsuccessfulSignup(true);
      return false;
    }

    // Check if username is already taken
    var userExists = false;
    for (let index in allUsers) {
      const user = allUsers[index];
      if (username === user.username) {
        console.log("Sign Up UnSuccessful");
        userExists = true;
      }
    }
    if (userExists === true) {
      setUnsuccessfulSignup(true);
      setUsername("");
      setErrorMessage("Username already taken");
      console.log("Sign Up Unsuccessful, user already exists");
      return false;
    }

    // not already return false, return true
    return true;
  };

  // Event handler for login attempt
  const handleSubmit = (e) => {
    e.preventDefault();

    var allowSignup = checkDetails();

    //sign up successful, post account to db
    if (allowSignup) {
      // create dict of user details
      const id = allUsers.length + 1;
      console.log(id);
      const userAccount = { id, firstName, lastName, username, password };
      console.log(userAccount);

      console.log("Account sign up feature disabled for now");
      history.push("/");
    }
  };

  // Remove error msg
  const handleClose = (e) => {
    e.preventDefault();
    setUnsuccessfulSignup(false);
    setErrorMessage("");
  };

  // Check for if should show login button active or not
  useEffect(() => {
    if (
      username !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      passwordAgain !== ""
    ) {
      setAllowCreate(true);
    } else {
      setAllowCreate(false);
    }
  }, [username, password, firstName, lastName, passwordAgain]);

  return (
    <div className="form">
      {/* If not loading and no error */}
      {allUsers !== null && (
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="namelabels">
            <label htmlFor="first-name">First Name:</label>

            <label className="rhsname" htmlFor="last-name">
              Last Name:
            </label>
          </div>
          <div className="namefields">
            <input
              type="text"
              title="first-name"
              autoComplete="new-password"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="rhsfield"
              title="last-name"
              autoComplete="new-password"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="otherfields">
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
            <label htmlFor="passwordagain">Repeat Password:</label>
            <input
              type="password"
              title="passwordagain"
              autoComplete="new-password"
              required
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </div>

          <div className="errordiv">
            {unsuccessfulSignup && (
              <div className="nocreate">
                <p>{errorMessage}</p>
                <CloseButton onClick={handleClose} className="cross" />
              </div>
            )}
            {!unsuccessfulSignup && <p></p>}
            {allowCreate && (
              <button onClick={handleSubmit} className="abledButton">
                Sign Up
              </button>
            )}
            {!allowCreate && (
              <button className="disabledButton">Sign Up</button>
            )}
          </div>
        </form>
      )}

      {allUsers && (
        <div className="bottommessage">
          <p>Already have an account?</p>
          <Link to="/">Log In Here</Link>
        </div>
      )}
    </div>
  );
};

export default Signup;
