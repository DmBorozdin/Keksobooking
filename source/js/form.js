import {isEscEvent} from './util.js';
import {sendData} from './api.js';

const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const type = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const address = form.querySelector('#address');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const reset = form.querySelector('.ad-form__reset');
const avatar = form.querySelector('.ad-form-header__preview img');
const photoContainer = form.querySelector('.ad-form__photo-container');
const photo = form.querySelector('.ad-form__photo');
const capacityList = capacity.querySelectorAll('option');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main');

const formInformation = {
  minPrice: {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  },
  capacity: {
    roomNumber100: '0',
  },
  ROOM_NUMBER_MAX: '100',
  DEFAULT_AVATAR: 'img/muffin-grey.svg',
};

let closeSuccessMessage = null;
let closeErrorMessage = null;

const getFilteredCapacity = () => {
  capacity.options.length = 0;
  for (let index = 0; index < capacityList.length; index++) {
    if ((capacityList[index].value <= roomNumber.options[roomNumber.selectedIndex].value && capacityList[index].value !== formInformation.capacity.roomNumber100) &&
      roomNumber.options[roomNumber.selectedIndex].value !== formInformation.ROOM_NUMBER_MAX ||
      roomNumber.options[roomNumber.selectedIndex].value === formInformation.ROOM_NUMBER_MAX && capacityList[index].value === formInformation.capacity.roomNumber100) {
      capacity[capacity.length] = new Option(capacityList[index].textContent,capacityList[index].value);
    }
  }
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    if (document.querySelector('.success')) {
      closeSuccessMessage();
    }
    if (document.querySelector('.error')) {
      closeErrorMessage();
    }
  }
};

closeSuccessMessage = () => {
  main.querySelector('.success').remove();
  document.removeEventListener('keydown', onEscKeydown);
};

closeErrorMessage = () => {
  main.querySelector('.error').remove();
  document.removeEventListener('keydown', onEscKeydown);
};

const resetForm = (resetMap) => {
  form.reset();
  priceInput.placeholder = formInformation.minPrice.flat;
  priceInput.min = formInformation.minPrice.flat;
  avatar.src = formInformation.DEFAULT_AVATAR;
  if (photoContainer.children.length > 2) {
    for (let index = photoContainer.children.length - 1; index > 1; index--) {
      photoContainer.removeChild(photoContainer.lastChild);
    }
  }
  photo.style.backgroundImage = '';
  getFilteredCapacity();
  resetMap();
};

const showSuccessMessage = (resetMap) => {
  main.appendChild(successTemplate.cloneNode(true));
  document.addEventListener('keydown', onEscKeydown);
  document.querySelector('.success').addEventListener('click', closeSuccessMessage);
  resetForm(resetMap);
};

const showErrorMessage = () => {
  main.appendChild(errorTemplate.cloneNode(true));
  document.addEventListener('keydown', onEscKeydown);
  document.querySelector('.error').addEventListener('click', closeErrorMessage);
};

const setUserFormSubmit = (resetMap) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => showSuccessMessage(resetMap),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

const resetUserForm = (resetMap) => {
  reset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm(resetMap);
  });
};

form.classList.add('ad-form--disabled');
for(const fieldset of fieldsets) {
  fieldset.disabled = true;
}

address.readOnly = true;

type.addEventListener('change', () => {
  switch(type.options[type.selectedIndex].value) {
    case 'bungalow':
      priceInput.placeholder = formInformation.minPrice.bungalow;
      priceInput.min = formInformation.minPrice.bungalow;
      break;
    case 'flat':
      priceInput.placeholder = formInformation.minPrice.flat;
      priceInput.min = formInformation.minPrice.flat;
      break;
    case 'house':
      priceInput.placeholder = formInformation.minPrice.house;
      priceInput.min = formInformation.minPrice.house;
      break;
    case 'palace':
      priceInput.placeholder = formInformation.minPrice.palace;
      priceInput.min = formInformation.minPrice.palace;
      break;
  }
});

window.addEventListener('load', () => getFilteredCapacity());

roomNumber.addEventListener ('change', () => getFilteredCapacity());

timein.addEventListener('change', () => timeout.selectedIndex = timein.selectedIndex);

timeout.addEventListener('change', () => timein.selectedIndex = timeout.selectedIndex);

export {setUserFormSubmit, resetUserForm};
