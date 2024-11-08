import "./top.css";
import logo from "../assets/logo.png";

function Top({ score }) {
  let bestScore = 0;
  if (localStorage.getItem("best")) {
    bestScore = localStorage.getItem("best");
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
}

export default Top;
