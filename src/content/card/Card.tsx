import "./card.css";
import { motion } from "framer-motion";
import React from "react";
import clickSound from "../../assets/click.wav";
import flipSound from "../../assets/flip.mp3";
import { Character } from "../../Character";

type CardProps = {
  id: string;
  name: string;
  img: string;
  clicked: boolean;
  setCharacters: (callback: (prev: Character[]) => Character[]) => void;
  incrementScore: () => void;
  setGameState: (state: "lost" | "active" | "won") => void;
  flipping: boolean;
  setFlipping: (callback: (prev: boolean) => boolean) => void;
};

const Card: React.FC<CardProps> = ({
  id,
  name,
  img,
  clicked,
  setCharacters,
  incrementScore,
  setGameState,
  flipping,
  setFlipping,
}) => {
  const click = new Audio(clickSound);
  const flip = new Audio(flipSound);
  const transDur = 0.4;

  function handleClick() {
    click.play();

    if (clicked) {
      // here the player loses the game
      // this should trigger the render of game over screen
      setGameState("lost");
      return;
    }

    setFlipping((prev) => !prev);
    flip.play();

    setTimeout(() => {
      setFlipping((prev) => !prev);
      if (!clicked) {
        incrementScore();
      }
      setCharacters((prev) =>
        prev.map((character) =>
          character.id === id ? { ...character, clicked: true } : character,
        ),
      );
    }, 800);
  }

  return (
    <motion.div
      animate={{ rotateY: flipping ? 180 : 0 }}
      onClick={handleClick}
      transition={{ duration: transDur }}
      className="card"
    >
      <motion.div
        animate={{ rotateY: flipping ? 180 : 0 }}
        transition={{ duration: transDur }}
        className="front"
      >
        <img src={img} />
        <p>{name}</p>
      </motion.div>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipping ? 0 : 180 }}
        transition={{ duration: transDur }}
        className="back"
      ></motion.div>
    </motion.div>
  );
};

export default Card;
