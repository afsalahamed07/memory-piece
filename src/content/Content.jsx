import "./content.css";
import Card from "./card/Card";
import { characters } from "../infra/characters-list-util";
import { useState } from "react";

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
  if (score >= 12) return "";

  return (
    // the renderign should happend every time when a card is clicked
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
        />
      ))}
    </div>
  );
}

export default Content;
