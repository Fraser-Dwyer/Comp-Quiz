import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import HomePT from "./components/HomePT";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Tutorial followed for template code was by 'NetNinja' https://youtu.be/j942wKiXFu8

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/sign-up">
              <Signup />
            </Route>
            <Route exact path="/home-pt">
              <HomePT />
            </Route>
            <Route path="/home">
              <Home
                class="fullsize"
                buttonClassOne="nosubmitbutton"
                buttonClassTwo="submitbutton"
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
