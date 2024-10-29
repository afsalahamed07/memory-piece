import "./card.css";

function Card({ id, name, img, clicked, setCharacters, setScore }) {
  function handleClick() {
    if (!clicked) {
      setScore((prev) => prev + 1);
    } else return;

    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id ? { ...character, clicked: true } : character,
      ),
    );
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={img} />
      <p>{name}</p>
    </div>
  );
}

export default Card;
