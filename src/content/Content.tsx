import "./content.css";
import Card from "./card/Card";
import React, { useState } from "react";
import LoseScreen from "./lose/LoseScreen";
import Tilt from "react-parallax-tilt";
import { Character } from "../Character";

function shuffleAndSlice(array: Character[]) {
  let coppyArr = [...array];
  let shuffledArray = coppyArr.sort(() => Math.random() - 0.5);
  let slicedArray = shuffledArray.slice(0, 4);
  while (slicedArray.filter((character) => !character.clicked).length < 1) {
    shuffledArray = coppyArr.sort(() => Math.random() - 0.5);
    slicedArray = shuffledArray.slice(0, 4);
  }
  return slicedArray;
}

type ContentProps = {
  score: number;
  setScore: (score: number) => void;
  charactersState: Character[];
  setCharectersState: (callback: (prev: Character[]) => Character[]) => void;
};

const Content: React.FC<ContentProps> = ({
  score,
  setScore,
  charactersState,
  setCharectersState,
}) => {
  const [gameState, setGameState] = useState<"lose" | "won" | "active">(
    "active",
  );
  const scoreLim = charactersState.length;
  const [flipping, setFlipping] = useState<boolean>(false);

  function resetGame() {
    setScore(0);
    setGameState("active");
    setCharectersState((prev) =>
      prev.map((character) => ({ ...character, clicked: false })),
    );
  }

  if (score >= scoreLim) {
    localStorage.setItem("best", scoreLim);
    return <LoseScreen text="You Won" resetGame={resetGame} />;
  }

  if (gameState === "lost") {
    if (score > localStorage.getItem("best")) {
      localStorage.setItem("best", score);
    }
    return <LoseScreen resetGame={resetGame} />;
  }

  return (
    <div className="parent-content">
      <div className="content">
        {shuffleAndSlice(charactersState).map((character) => (
          <Tilt
            key={character.id}
            glareEnable={true}
            scale={1.1}
            transitionSpeed={1500}
            glareBorderRadius="1rem"
          >
            <Card
              key={character.id}
              id={character.id}
              name={character.name}
              img={character.img.src}
              clicked={character.clicked}
              setCharacters={setCharectersState}
              setScore={setScore}
              setGameState={setGameState}
              flipping={flipping}
              setFlipping={setFlipping}
            />
          </Tilt>
        ))}
      </div>
      <div className="live-score">
        <p>
          {score} / {scoreLim}
        </p>
      </div>
    </div>
  );
};

export default Content;
