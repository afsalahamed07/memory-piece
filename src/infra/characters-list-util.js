import characters from "../assets/characters.json";

const initializeCharacters = () => {
  const charactersPromise = Object.values(characters).map((character) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = character.image;
      img.onload = () => resolve({ ...character, img, clicked: false });
    });
  });

  return Promise.all(charactersPromise);
};

export { initializeCharacters as characters };
