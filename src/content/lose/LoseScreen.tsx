import React from "react";
import "./lose.css";

type LoseProp = {
  text?: string;
  resetGame: () => void;
};

const LoseScreen: React.FC<LoseProp> = ({ text = "You Lost", resetGame }) => {
  return (
    <div className="lose">
      <div className="quote">
        <p>{text}</p>
      </div>
      <button onClick={resetGame}> Play Again</button>
    </div>
  );
};

export default LoseScreen;
