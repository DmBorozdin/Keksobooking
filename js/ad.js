const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const isEmptyString = (data) => data !== '';

const createAd = (adInfo) => {
  const ad = adTemplate.cloneNode(true);

  isEmptyString(adInfo.offer.title) ? ad.querySelector('.popup__title').textContent = adInfo.offer.title : ad.querySelector('.popup__title').style.display = 'none';
  ad.querySelector('.popup__text--address').textContent = adInfo.offer.address;
  ad.querySelector('.popup__text--price').innerHTML = `${adInfo.offer.price} <span>₽/ночь</span>`;
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
  ad.querySelector('.popup__text--capacity').textContent = `${adInfo.offer.rooms} комнаты для ${adInfo.offer.guests} гостей`;
  ad.querySelector('.popup__text--time').textContent = `Заезд после ${adInfo.offer.checkin}, выезд до ${adInfo.offer.checkout}`;
  for (let index = ad.querySelector('.popup__features').children.length - 1; index >= 0; index--) {
    const feature = ad.querySelector('.popup__features').children[index];
    if (!adInfo.offer.features.includes(feature.classList[1].slice(16))) {
      feature.remove();
    }
  }
  ad.querySelector('.popup__description').textContent = adInfo.offer.description;
  ad.querySelector('.popup__photo').src = adInfo.offer.photos[0];
  if (adInfo.offer.photos.length > 1) {
    for (let index = 1; index < adInfo.offer.photos.length; index++) {
      const nextPhoto = ad.querySelector('.popup__photo').cloneNode(false);
      nextPhoto.src = adInfo.offer.photos[index];
      ad.querySelector('.popup__photos').appendChild(nextPhoto);
    }
  }
  ad.querySelector('.popup__avatar').src = adInfo.author.avatar;

  return ad;
};

export {createAd};
