import Character from "../Character";

const initializeCharacters = (characters: object) => {
  const charactersPromise: Promise<Character>[] = Object.values(characters).map(
    (character) => {
      return new Promise((resolve) => {
        const img: HTMLImageElement = new Image();
        img.src = character.image;
        img.onload = () => resolve({ ...character, img, clicked: false });
      });
    },
  );

  return Promise.all(charactersPromise);
};

function shuffleAndSlice(array: Character[]) {
  const coppyArr = [...array];
  let shuffledArray = coppyArr.sort(() => Math.random() - 0.5);
  let slicedArray = shuffledArray.slice(0, 4);
  while (slicedArray.filter((character) => !character.clicked).length < 1) {
    shuffledArray = coppyArr.sort(() => Math.random() - 0.5);
    slicedArray = shuffledArray.slice(0, 4);
  }
  return slicedArray;
}

export { initializeCharacters, shuffleAndSlice };
