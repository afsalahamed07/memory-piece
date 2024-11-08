import "./top.css";
import logo from "../assets/logo.png";
import React from "react";

type TopProps = {
  score: number;
};

const Top: React.FC<TopProps> = ({ score }) => {
  let bestScore = 0;
  if (localStorage.getItem("best")) {
    bestScore = Number(localStorage.getItem("best"));
  }

  return (
    <div className="top-container">
      <div className="title">
        <h1>Piece</h1>
        <img src={logo} />
        <h1>Memory</h1>
      </div>
      <div className="score">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </div>
  );
};

export default Top;
