import "./content.css";
import Card from "./card/Card";
import { characters } from "../infra/characters-list-util";
import { useState } from "react";
import LoseScreen from "./lose/LoseScreen";

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

  if (score >= 12) return "";

  if (gameState === "lost") {
    if (score > localStorage.getItem("best")) {
      localStorage.setItem("best", score);
    }
    return <LoseScreen />;
  }

  return (
    <div className="content">
      {shuffleAndSlice(charactersState).map((character) => (
        <Card
          key={character.id}
          id={character.id}
          name={character.name}
          img={character.image}
          clicked={character.clicked}
          setCharacters={setCharectersState}
          setScore={setScore}
          setGameState={setGameState}
        />
      ))}
    </div>
  );
}

export default Content;
