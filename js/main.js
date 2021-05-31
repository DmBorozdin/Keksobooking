const getRandomInteger = (min,max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  if (min>max) {
    const temp = max;
    max = min;
    min = temp;
  }
  return Math.floor(Math.random()*(max-min+1)) + min;
};

getRandomInteger(10,2);

const getRandomFloat = (min,max, decimal) => {
  min = Math.abs(min);
  max = Math.abs(max);
  decimal = Math.abs(decimal);
  if (min>max) {
    const temp = max;
    max = min;
    min = temp;
  }
  return Math.round((Math.random()*(max-min) + min) *Math.pow(10,decimal))/ Math.pow(10,decimal);
};

getRandomFloat(1.5,-1.1, 2);
