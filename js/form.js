const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const type = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const address = form.querySelector('#address');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const capacityList = capacity.querySelectorAll('option');

const FORM_CONST = {
  capacity: {
    roomNumber100: '0',
  },
  roomNumberMax: '100',
};

form.classList.add('ad-form--disabled');
for(const fieldset of fieldsets) {
  fieldset.disabled = true;
}

address.readOnly = true;

type.addEventListener('change', () => {
  switch(type.options[type.selectedIndex].value) {
    case 'bungalow':
      priceInput.placeholder = FORM_CONST.minPrice.bungalow;
      priceInput.min = FORM_CONST.minPrice.bungalow;
      break;
    case 'flat':
      priceInput.placeholder = FORM_CONST.minPrice.flat;
      priceInput.min = FORM_CONST.minPrice.flat;
      break;
    case 'house':
      priceInput.placeholder = FORM_CONST.minPrice.house;
      priceInput.min = FORM_CONST.minPrice.house;
      break;
    case 'palace':
      priceInput.placeholder = FORM_CONST.minPrice.palace;
      priceInput.min = FORM_CONST.minPrice.palace;
      break;
  }
});

const getFilteredCapacity = () => {
  capacity.options.length = 0;
  for (let index = 0; index < capacityList.length; index++) {
    if ((capacityList[index].value <= roomNumber.options[roomNumber.selectedIndex].value && capacityList[index].value !== FORM_CONST.capacity.roomNumber100) &&
      roomNumber.options[roomNumber.selectedIndex].value !== FORM_CONST.roomNumberMax ||
      roomNumber.options[roomNumber.selectedIndex].value === FORM_CONST.roomNumberMax && capacityList[index].value === FORM_CONST.capacity.roomNumber100) {
      capacity[capacity.length] = new Option(capacityList[index].textContent,capacityList[index].value);
    }
  }
};

window.addEventListener('load', () => {
  getFilteredCapacity();
});

roomNumber.addEventListener ('change', () => {
  getFilteredCapacity();
});

timein.addEventListener('change', () => {
  timeout.selectedIndex = timein.selectedIndex;
});

timeout.addEventListener('change', () => {
  timein.selectedIndex = timeout.selectedIndex;
});
