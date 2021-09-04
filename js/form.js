import {adsInfo} from './data.js';
import {createAd} from './ad.js';

const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const type = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const address = form.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const filters = mapFilters.children;

const FORM_CONST = {
  minPrice: {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  },
  mapView: {
    lat: 35.67,
    lng: 139.785,
    zoom: 12,
  },
  mainPinMarker: {
    lat: 35.6634,
    lng: 139.77321,
  },
  mainPinIcon: {
    width: 52,
    height: 52,
  },
  pinIcon: {
    width: 40,
    height: 40,
  },
};

form.classList.add('ad-form--disabled');
for(const fieldset of fieldsets) {
  fieldset.disabled = true;
}
mapFilters.classList.add('map__filters--disabled');
for(const filter of filters) {
  filter.disabled = true;
}

address.value = `${FORM_CONST.mainPinMarker.lat.toFixed(5)}, ${FORM_CONST.mainPinMarker.lng.toFixed(5)}`;
address.readOnly = true;

const map = L.map('map-canvas')
  .on('load', () => {
    form.classList.remove('ad-form--disabled');
    for(const fieldset of fieldsets) {
      fieldset.disabled = false;
    }
    mapFilters.classList.remove('map__filters--disabled');
    for(const filter of filters) {
      filter.disabled = false;
    }
  })
  .setView({
    lat: FORM_CONST.mapView.lat,
    lng: FORM_CONST.mapView.lng,
  }, FORM_CONST.mapView.zoom);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [FORM_CONST.mainPinIcon.width, FORM_CONST.mainPinIcon.height],
  iconAnchor: [FORM_CONST.mainPinIcon.width/2, FORM_CONST.mainPinIcon.height],
});

const mainPinMarker = L.marker(
  {
    lat: FORM_CONST.mainPinMarker.lat,
    lng: FORM_CONST.mainPinMarker.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) =>{
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

adsInfo.forEach((adInfo) => {
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [FORM_CONST.pinIcon.width, FORM_CONST.pinIcon.height],
    iconAnchor: [FORM_CONST.pinIcon.width/2, FORM_CONST.pinIcon.height],
  });

  const marker = L.marker(
    {
      lat: adInfo.location.lat,
      lng: adInfo.location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createAd(adInfo),
      {
        keepInView: true,
      },
    );
});

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

timein.addEventListener('change', () => {
  timeout.selectedIndex = timein.selectedIndex;
});

timeout.addEventListener('change', () => {
  timein.selectedIndex = timeout.selectedIndex;
});
