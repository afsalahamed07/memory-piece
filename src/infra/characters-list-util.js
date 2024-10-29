import characters from "../assets/characters.json";

let charectersList = [];
Object.values(characters).forEach((character) => {
  charectersList.push({
    ...character,
    clicked: false,
  });
});

export { charectersList as characters };
