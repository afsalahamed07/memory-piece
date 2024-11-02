import "./lose.css";

function LoseScreen({
  text = "You Lost",
  setCharectersState,
  setGameState,
  setScore,
}) {
  function handleClick() {
    console.log("getting triggerd");
    setGameState("active");
    setScore(0);
    setCharectersState((prev) =>
      prev.map((character) => ({ ...character, clicked: false })),
    );
  }
  return (
    <div className="lose">
      <div className="quote">
        <p>{text}</p>
      </div>
      <button onClick={handleClick}> Play Again</button>
    </div>
  );
}

export default LoseScreen;
