import React from "react";
import logo from "./logo.svg";
import "./LearnReact.css";

function LearnReact() {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const currentSize = +event.currentTarget.style.fontSize.split("px")[0];
    event.currentTarget.style.fontSize = currentSize + 5 + "px";
  };

  const handleLogoClick = () => {
    console.log("Logo clicked!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          onClick={handleLogoClick}
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default LearnReact;
