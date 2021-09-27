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

const MAP_CONST = {
  mapView: {
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
  adsCount: 10,
  price: {
    low: 10000,
    high: 50000,
  },
};

const adsLayer = L.layerGroup([]);
let sumFiltersRank = 0;
const features = [];

const setAddressField = () => {
  address.value = `${MAP_CONST.mainPinMarker.lat.toFixed(5)}, ${MAP_CONST.mainPinMarker.lng.toFixed(5)}`;
};

mapFilters.classList.add('map__filters--disabled');
for(const filter of filters) {
  filter.disabled = true;
}

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
    setAddressField();
  })
  .setView({
    lat: MAP_CONST.mapView.lat,
    lng: MAP_CONST.mapView.lng,
  }, MAP_CONST.mapView.zoom);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAP_CONST.mainPinIcon.width, MAP_CONST.mainPinIcon.height],
  iconAnchor: [MAP_CONST.mainPinIcon.width/2, MAP_CONST.mainPinIcon.height],
});

const mainPinMarker = L.marker(
  {
    lat: MAP_CONST.mainPinMarker.lat,
    lng: MAP_CONST.mainPinMarker.lng,
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

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng([MAP_CONST.mainPinMarker.lat, MAP_CONST.mainPinMarker.lng]);
  setAddressField();
};

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
      if (ad.offer.price <= MAP_CONST.price.high && ad.offer.price >= MAP_CONST.price.low) {
        rank++;
      }
      break;
    case 'low':
      if (ad.offer.price < MAP_CONST.price.low) {
        rank++;
      }
      break;
    case 'high':
      if (ad.offer.price > MAP_CONST.price.high) {
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
    .slice(0, MAP_CONST.adsCount)
    .forEach((adInfo) => {
      const pinIcon = L.icon({
        iconUrl: './img/pin.svg',
        iconSize: [MAP_CONST.pinIcon.width, MAP_CONST.pinIcon.height],
        iconAnchor: [MAP_CONST.pinIcon.width/2, MAP_CONST.pinIcon.height],
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

const filtersRank = {
  type: 0,
  price: 0,
  rooms: 0,
  guests: 0,
  features: 0,
  wifi: 0,
  dishwasher: 0,
  parking: 0,
  washer: 0,
  elevator: 0,
  conditioner: 0,
};

const getSumFiltersRank = () => {
  sumFiltersRank = Object.values(filtersRank).reduce((accumulator, filterRank) => accumulator + filterRank, 0);
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

export {createMarkers, resetMainPinMarker, setFilters};
