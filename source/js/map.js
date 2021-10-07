import * as leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {getData} from './api.js';
import debounce from 'lodash/debounce';

const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const address = form.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const filters = mapFilters.children;
const housingType = mapFilters.querySelector('#housing-type');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingGuests = mapFilters.querySelector('#housing-guests');
const mapCheckbox = mapFilters.querySelectorAll('.map__checkbox');

const mapInformation = {
  view: {
    lat: 35.85,
    lng: 139.785,
    zoom: 9,
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
  ADS_COUNT: 10,
  price: {
    low: 10000,
    high: 50000,
  },
  RERENDER_DELAY: 500,
};

const filtersRank = {
  type: 0,
  price: 0,
  rooms: 0,
  guests: 0,
  features: 0,
};

const adsLayer = leaflet.layerGroup([]);
let sumFiltersRank = 0;
let features = [];

const setAddressField = () => {
  address.value = `${mapInformation.mainPinMarker.lat.toFixed(5)}, ${mapInformation.mainPinMarker.lng.toFixed(5)}`;
};

mapFilters.classList.add('map__filters--disabled');
for(const filter of filters) {
  filter.disabled = true;
}

const map = leaflet.map('map-canvas');

leaflet.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = leaflet.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [mapInformation.mainPinIcon.width, mapInformation.mainPinIcon.height],
  iconAnchor: [mapInformation.mainPinIcon.width/2, mapInformation.mainPinIcon.height],
});

const mainPinMarker = leaflet.marker(
  {
    lat: mapInformation.mainPinMarker.lat,
    lng: mapInformation.mainPinMarker.lng,
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

const getAdRank = (ad) => {
  let rank = 0;
  if (ad.offer.type === housingType.options[housingType.selectedIndex].value) {
    rank++;
  }
  if (ad.offer.rooms === Number(housingRooms.options[housingRooms.selectedIndex].value)) {
    rank++;
  }
  switch(housingPrice.options[housingPrice.selectedIndex].value) {
    case 'middle':
      if (ad.offer.price <= mapInformation.price.high && ad.offer.price >= mapInformation.price.low) {
        rank++;
      }
      break;
    case 'low':
      if (ad.offer.price < mapInformation.price.low) {
        rank++;
      }
      break;
    case 'high':
      if (ad.offer.price > mapInformation.price.high) {
        rank++;
      }
      break;
  }
  if (ad.offer.guests === Number(housingGuests.options[housingGuests.selectedIndex].value)) {
    rank++;
  }
  ad.offer.features.forEach((feature) => {
    if (features.includes(feature)) {
      rank++;
    }
  });

  return rank;
};

const filterAds = (ad) => getAdRank(ad) === sumFiltersRank || sumFiltersRank === 0;

const createMarkers = (adsInfo, createAd) => {
  adsLayer.clearLayers();
  adsInfo
    .slice()
    .filter(filterAds)
    .slice(0, mapInformation.ADS_COUNT)
    .forEach((adInfo) => {
      const pinIcon = leaflet.icon({
        iconUrl: './img/pin.svg',
        iconSize: [mapInformation.pinIcon.width, mapInformation.pinIcon.height],
        iconAnchor: [mapInformation.pinIcon.width/2, mapInformation.pinIcon.height],
      });

      const marker = leaflet.marker(
        {
          lat: adInfo.location.lat,
          lng: adInfo.location.lng,
        },
        {
          icon: pinIcon,
        },
      );

      marker
        .bindPopup(
          createAd(adInfo),
          {
            keepInView: true,
          },
        );

      adsLayer.addLayer(marker);
    });
  adsLayer.addTo(map);
};

const getSumFiltersRank = () => {
  sumFiltersRank = Object.values(filtersRank).reduce((accumulator, filterRank) => accumulator + filterRank, 0);
};

const resetMap = (ads, createAd) => {
  mainPinMarker.setLatLng([mapInformation.mainPinMarker.lat, mapInformation.mainPinMarker.lng]);
  setAddressField();
  mapFilters.reset();
  for (const filterRank in filtersRank) {
    filtersRank[filterRank] = 0;
  }
  getSumFiltersRank();
  features = [];
  createMarkers(ads, createAd);
};

const setFilters = (cb) => {
  housingType.addEventListener('change', () => {
    filtersRank.type = housingType.selectedIndex !== 0 ? 1 : 0;
    getSumFiltersRank();
    cb();
  });

  housingRooms.addEventListener('change', () => {
    filtersRank.rooms = housingRooms.selectedIndex !== 0 ? 1 : 0;
    getSumFiltersRank();
    cb();
  });

  housingPrice.addEventListener('change', () => {
    filtersRank.price = housingPrice.selectedIndex !== 0 ? 1 : 0;
    getSumFiltersRank();
    cb();
  });

  housingGuests.addEventListener('change', () => {
    filtersRank.guests = housingGuests.selectedIndex !== 0 ? 1 : 0;
    getSumFiltersRank();
    cb();
  });

  mapCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        filtersRank.features++;
        features.push(checkbox.value);
      } else {
        filtersRank.features--;
        features.splice(features.indexOf(checkbox.value), 1);
      }
      getSumFiltersRank();
      cb();
    });
  });
};

const loadMap = (createAd, setUserFormSubmit, resetUserForm) => {
  map
    .on('load', () => {
      form.classList.remove('ad-form--disabled');
      for(const fieldset of fieldsets) {
        fieldset.disabled = false;
      }
      setAddressField();
      getData((ads) => {
        createMarkers(ads, createAd);
        setFilters(debounce(() => createMarkers(ads, createAd), mapInformation.RERENDER_DELAY));
        setUserFormSubmit(() => resetMap(ads, createAd));
        resetUserForm(() => resetMap(ads, createAd));
        if (ads.length !== 0 ) {
          mapFilters.classList.remove('map__filters--disabled');
          for(const filter of filters) {
            filter.disabled = false;
          }
        }
      });
    })
    .setView({
      lat: mapInformation.view.lat,
      lng: mapInformation.view.lng,
    }, mapInformation.view.zoom);
};

export {loadMap};
