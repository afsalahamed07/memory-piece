import "./top.css";
import logo from "../assets/logo.png";

function Top({ score }) {
  return (
    <div className="top-container">
      <div className="title">
        <h1>Peice</h1>
        <img src={logo} />
        <h1>Memory</h1>
      </div>
      <div className="score">
        <p>Score: {score}</p>
        <p>Best Score: 5</p>
      </div>
    </div>
  );
}

export default Top;
