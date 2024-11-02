import "./card.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Card({
  id,
  name,
  img,
  clicked,
  setCharacters,
  setScore,
  setGameState,
  flipping,
  setFlipping,
}) {
  const click = new Audio("src/assets/click.wav");
  const flip = new Audio("src/assets/flip.mp3");

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
        setScore((prev) => prev + 1);
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
      transition={{ duration: 0.2 }}
      className="card"
    >
      <motion.div
        animate={{ rotateY: flipping ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="front"
      >
        <img src={img} />
        <p>{name}</p>
      </motion.div>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipping ? 0 : 180 }}
        transition={{ duration: 0.2 }}
        className="back"
      ></motion.div>
    </motion.div>
  );
}

export default Card;
