const type = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

type.addEventListener('change', () => {
  switch(type.options[type.selectedIndex].value) {
    case 'bungalow':
      priceInput.placeholder = MIN_PRICE.bungalow;
      priceInput.min = MIN_PRICE.bungalow;
      break;
    case 'flat':
      priceInput.placeholder = MIN_PRICE.flat;
      priceInput.min = MIN_PRICE.flat;
      break;
    case 'house':
      priceInput.placeholder = MIN_PRICE.house;
      priceInput.min = MIN_PRICE.house;
      break;
    case 'palace':
      priceInput.placeholder = MIN_PRICE.palace;
      priceInput.min = MIN_PRICE.palace;
      break;
  }
});

timein.addEventListener('change', () => {
  timeout.selectedIndex = timein.selectedIndex;
});

timeout.addEventListener('change', () => {
  timein.selectedIndex = timeout.selectedIndex;
});
