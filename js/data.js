import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getNewRandomArray} from './util.js';

const AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];
const TITLE = [
  'Квартира в центре',
  'Хайповый хостел',
  'Двухкомнатные апартаменты',
  'Отель у Кекса',
  'Гостиница Без кота и жизнь не та',
];
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION = [
  'В 5 минутах хотьбы от всех достопримечательностей',
  'Есть все удобства для котиков',
  'Стильная комната со свежим ремонтом',
  'Чистая и уютная комнатка со всем необходимым',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const AD_CONST = {
  offer: {
    price: {
      min: 1000,
      max: 20000,
    },
    rooms: {
      min: 1,
      max: 4,
    },
    guests: {
      min: 1,
      max: 8,
    },
  },
  location: {
    lat: {
      min: 35.65000,
      max: 35.70000,
      digits: 5,
    },
    lng: {
      min: 139.70000,
      max: 139.80000,
      digits: 5,
    },
  },
  count: 10,
};

const createAdInfo = () => {
  const ad = {
    author: {
      avatar: getRandomArrayElement(AVATAR),
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      price: getRandomPositiveInteger(AD_CONST.offer.price.min, AD_CONST.offer.price.max),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomPositiveInteger(AD_CONST.offer.rooms.min, AD_CONST.offer.rooms.max),
      guests: getRandomPositiveInteger(AD_CONST.offer.guests.min, AD_CONST.offer.guests.max),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getNewRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getNewRandomArray(PHOTOS),
    },
    location: {
      lat: getRandomPositiveFloat(AD_CONST.location.lat.min, AD_CONST.location.lat.max, AD_CONST.location.lat.digits),
      lng: getRandomPositiveFloat(AD_CONST.location.lng.min, AD_CONST.location.lng.max, AD_CONST.location.lng.digits),
    },
  };
  ad.offer.address = `${ad.location.lat  }, ${  ad.location.lng}`;

  return ad;
};

const adsInfo = new Array(AD_CONST.count).fill(null).map(() => createAdInfo());

export {adsInfo};
