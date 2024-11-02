import "./content.css";
import Card from "./card/Card";
import { characters } from "../infra/characters-list-util";
import { useEffect, useState } from "react";
import LoseScreen from "./lose/LoseScreen";
import Tilt from "react-parallax-tilt";

function shuffleAndSlice(array) {
  let coppyArr = [...array];
  let shuffledArray = coppyArr.sort(() => Math.random() - 0.5);
  let slicedArray = shuffledArray.slice(0, 4);
  while (slicedArray.filter((character) => !character.clicked).length < 1) {
    shuffledArray = coppyArr.sort(() => Math.random() - 0.5);
    slicedArray = shuffledArray.slice(0, 4);
  }
  return slicedArray;
}

function Content({ score, setScore }) {
  const [charactersState, setCharectersState] = useState(characters);
  const [gameState, setGameState] = useState("active");
  const scoreLim = characters.length;
  const [flipping, setFlipping] = useState(false);

  if (score >= scoreLim) {
    localStorage.setItem("best", scoreLim);
    return (
      <LoseScreen
        text="You Won"
        setCharectersState={setCharectersState}
        setGameState={setGameState}
        setScore={setScore}
      />
    );
  }

  if (gameState === "lost") {
    if (score > localStorage.getItem("best")) {
      localStorage.setItem("best", score);
    }
    return (
      <LoseScreen
        setCharectersState={setCharectersState}
        setGameState={setGameState}
        setScore={setScore}
      />
    );
  }

  return (
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
            img={character.image}
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
  );
}

export default Content;
