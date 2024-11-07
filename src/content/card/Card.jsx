import "./card.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clickSound from "../../assets/click.wav";
import flipSound from "../../assets/flip.mp3";
import PropTypes from "prop-types";

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
}

Card.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
  clicked: PropTypes.bool,
  setCharacters: PropTypes.func,
  setScore: PropTypes.func,
  setGameState: PropTypes.func,
  flipping: PropTypes.bool,
  setFlipping: PropTypes.func,
};

export default Card;
