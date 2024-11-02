import "./card.css";
import { motion } from "framer-motion";
import { useState } from "react";

function Card({
  id,
  name,
  img,
  clicked,
  setCharacters,
  setScore,
  setGameState,
}) {
  function handleClick() {
    if (!clicked) {
      setScore((prev) => prev + 1);
    } else {
      // here the player loses the game
      // this should trigger the render of game over screen
      setGameState("lost");
      return;
    }

    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id ? { ...character, clicked: true } : character,
      ),
    );
  }

  return (
    <motion.div
      initial={{ rotatey: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      animate={{ rotatey: 180 }}
      onClick={handleClick}
    >
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 180 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="card"
      >
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 180 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="front"
        >
          <img src={img} />
          <p>{name}</p>
        </motion.div>
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 180 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="back"
        >
          Back Side
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Card;
