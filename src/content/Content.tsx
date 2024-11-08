import "./content.css";
import charactersObj from "../assets/characters.json";

import React, { useEffect, useState } from "react";

import Tilt from "react-parallax-tilt";
import Card from "./card/Card";
import LoseScreen from "./lose/LoseScreen";

import Character from "../Character";
import {
  shuffleAndSlice,
  initializeCharacters,
} from "../infra/characters-list-util";
import Loading from "./Loading";

type ContentProps = {
  score: number;
  setScore: (callable: (score: number) => number) => void;
};

const Content: React.FC<ContentProps> = ({ score, setScore }) => {
  const [gameState, setGameState] = useState<"lost" | "won" | "active">(
    "active",
  );
  const [charactersState, setCharactersState] = useState<Character[] | null>(
    null,
  );
  const scoreLim = charactersState ? charactersState.length : 12;
  const [flipping, setFlipping] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function resetGame() {
    setScore((prev) => {
      console.log(prev);
      return 0;
    });
    setGameState("active");
    setCharactersState(
      (prev) =>
        prev && prev.map((character) => ({ ...character, clicked: false })),
    );
  }

  function incrementScore() {
    setScore((prev) => prev + 1);
  }

  function updateCharacter(id: number) {
    setCharactersState(
      (prev) =>
        prev &&
        prev.map((character) =>
          character.id === id ? { ...character, clicked: true } : character,
        ),
    );
  }

  useEffect(() => {
    setLoading(true);
    const initilise = async () => {
      const characters: Character[] = await initializeCharacters(charactersObj);
      setCharactersState(characters);
      setLoading(false);
    };
    initilise();
  }, []);

  if (score > 0 && score >= scoreLim) {
    localStorage.setItem("best", scoreLim.toString());
    return <LoseScreen text="You Won" resetGame={resetGame} />;
  }

  if (gameState === "lost") {
    if (score > Number(localStorage.getItem("best"))) {
      localStorage.setItem("best", score.toString());
    }
    return <LoseScreen resetGame={resetGame} />;
  }

  if (loading) {
    return (
      <div className="parent-content">
        <Loading />;
      </div>
    );
  }

  return (
    charactersState && (
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
                updateCharacter={updateCharacter}
                incrementScore={incrementScore}
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
    )
  );
};

export default Content;
