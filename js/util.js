const getRandomPositiveInteger = function (lower, upper) {
  const min = Math.ceil(Math.min(Math.abs(lower), Math.abs(upper)));
  const max = Math.floor(Math.max(Math.abs(lower), Math.abs(upper)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomPositiveFloat = function (lower, upper, digits = 1) {
  const min = Math.min(Math.abs(lower), Math.abs(upper));
  const max = Math.max(Math.abs(lower), Math.abs(upper));

  return +(Math.random() * (max - min) + min).toFixed(digits);
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const shuffleArray = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const RANDOM_INDEX = Math.floor(Math.random() * (index + 1));
    [array[index], array[RANDOM_INDEX]] = [array[RANDOM_INDEX], array[index]];
  }

  return array;
};

const getNewRandomArray = (array) => shuffleArray(array.slice()).slice(0, getRandomPositiveInteger(1, array.length));

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getNewRandomArray};
