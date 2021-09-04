const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const isNotEmptyString = (data) => data !== '' && data !== undefined;
const isNotEmptyNumber = (data) => data !== 0 && data !== undefined;
const isNotEmptyArray = (data) => data.length && data !== undefined;

const createAd = (adInfo) => {
  const ad = adTemplate.cloneNode(true);

  isNotEmptyString(adInfo.offer.title) ? ad.querySelector('.popup__title').textContent = adInfo.offer.title : ad.querySelector('.popup__title').style.display = 'none';
  isNotEmptyString(adInfo.offer.address) ? ad.querySelector('.popup__text--address').textContent = adInfo.offer.address : ad.querySelector('.popup__text--address').style.display = 'none';
  isNotEmptyNumber(adInfo.offer.price) ? ad.querySelector('.popup__text--price').innerHTML = `${adInfo.offer.price} <span>₽/ночь</span>` : ad.querySelector('.popup__text--price').style.display = 'none';
  if (isNotEmptyString(adInfo.offer.type)) {
    switch(adInfo.offer.type) {
      case 'palace':
        ad.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        ad.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        ad.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'bungalow':
        ad.querySelector('.popup__type').textContent = 'Бунгало';
        break;
    }
  } else {
    ad.querySelector('.popup__type').style.display = 'none';
  }
  let capacityText = '';
  if (isNotEmptyNumber(adInfo.offer.rooms)) {
    capacityText = `${adInfo.offer.rooms} комнаты`;
  }
  if (isNotEmptyNumber(adInfo.offer.guests)) {
    capacityText += ` для ${adInfo.offer.guests} гостей`;
  }
  isNotEmptyString(capacityText) ? ad.querySelector('.popup__text--capacity').textContent = capacityText : ad.querySelector('.popup__text--capacity').style.display = 'none';
  let timeText = '';
  if (isNotEmptyString(adInfo.offer.checkin) && isNotEmptyString(adInfo.offer.checkout)) {
    timeText = `Заезд после ${adInfo.offer.checkin}, выезд до ${adInfo.offer.checkout}`;
  } else {
    if (isNotEmptyString(adInfo.offer.checkin)) {
      timeText = `Заезд после ${adInfo.offer.checkin}`;
    }
    if (isNotEmptyString(adInfo.offer.checkout)) {
      timeText = `Выезд до ${adInfo.offer.checkout}`;
    }
  }
  isNotEmptyString(timeText) ? ad.querySelector('.popup__text--time').textContent = timeText : ad.querySelector('.popup__text--time').style.display = 'none';
  if (isNotEmptyArray(adInfo.offer.features)) {
    for (let index = ad.querySelector('.popup__features').children.length - 1; index >= 0; index--) {
      const feature = ad.querySelector('.popup__features').children[index];
      if (!adInfo.offer.features.includes(feature.classList[1].slice(16))) {
        feature.remove();
      }
    }
  } else {
    ad.querySelector('.popup__features').style.display = 'none';
  }
  isNotEmptyString(adInfo.offer.description) ? ad.querySelector('.popup__description').textContent = adInfo.offer.description : ad.querySelector('.popup__description').style.display = 'none';
  if (isNotEmptyArray(adInfo.offer.photos)) {
    ad.querySelector('.popup__photo').src = adInfo.offer.photos[0];
    if (adInfo.offer.photos.length > 1) {
      for (let index = 1; index < adInfo.offer.photos.length; index++) {
        const nextPhoto = ad.querySelector('.popup__photo').cloneNode(false);
        nextPhoto.src = adInfo.offer.photos[index];
        ad.querySelector('.popup__photos').appendChild(nextPhoto);
      }
    }
  } else {
    ad.querySelector('.popup__photos').style.display = 'none';
  }
  isNotEmptyString(adInfo.author.avatar) ? ad.querySelector('.popup__avatar').src = adInfo.author.avatar : ad.querySelector('.popup__avatar').style.display = 'none';

  return ad;
};

export {createAd};
