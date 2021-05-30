const getRandomNumber = (min,max) => {
  min = (min<0) ? 0 : min;
  return Math.floor(Math.random()*(max - min + 1)) + min;
};

getRandomNumber(10,70);
