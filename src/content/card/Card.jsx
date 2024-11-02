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
}) {
  function handleClick() {
    setFlip((prev) => !prev);
    setTimeout(() => setFlip((prev) => !prev), 1000);
    setTimeout(() => {
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
    }, 2000);
  }

  const [flip, setFlip] = useState(true);

  return (
    <motion.div
      animate={{ rotateY: flip ? 0 : 180 }}
      transition={{ duration: 0.7 }}
      onClick={handleClick}
      className="card"
    >
      <motion.div
        animate={{ rotateY: flip ? 0 : 180 }}
        transition={{ duration: 0.75 }}
        className="front"
      >
        <img src={img} />
        <p>{name}</p>
      </motion.div>
      <motion.div
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ duration: 0.7 }}
        className="back"
      ></motion.div>
    </motion.div>
  );
}

export default Card;
