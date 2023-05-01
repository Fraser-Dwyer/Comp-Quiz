import React from "react";
import "../styles/Menu.css";

const Menu = ({ handlePT, handleControl }) => {
  return (
    <div className="hide">
      <div className="primo">
        <button className="controlButton" onClick={() => handleControl()}>
          Control App
        </button>
        <button className="ptButton" onClick={() => handlePT()}>
          Persuasive App
        </button>
      </div>
    </div>
  );
};

export default Menu;
