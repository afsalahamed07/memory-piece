import React from "react";
import { Character } from "../../Character";
import "./lose.css";

type LoseProp = {
  text: string;
  setCharectersState: (callback: (prev: Character[]) => Character[]) => void;
  setGameState: (state: "active" | "lose" | "win") => void;
  setScore: (score: number) => void;
};

const LoseScreen: React.FC<LoseProp> = ({
  text = "You Lost",
  setCharectersState,
  setGameState,
  setScore,
}) => {
  function handleClick() {
    console.log("getting triggerd");
    setGameState("active");
    setScore(0);
    setCharectersState((prev) =>
      prev.map((character) => ({ ...character, clicked: false })),
    );
  }
  return (
    <div className="lose">
      <div className="quote">
        <p>{text}</p>
      </div>
      <button onClick={handleClick}> Play Again</button>
    </div>
  );
};

export default LoseScreen;
