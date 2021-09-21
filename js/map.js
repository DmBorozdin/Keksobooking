const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const address = form.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const filters = mapFilters.children;
const housingType = mapFilters.querySelector('#housing-type');

const MAP_CONST = {
  mapView: {
    lat: 35.67,
    lng: 139.785,
    zoom: 9.5,
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
};

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
    rank ++;
  }

  return rank;
};

const compareAds = (AdA, AdB) => {
  const rankA = getAdRank(AdA);
  const rankB = getAdRank(AdB);

  return rankB - rankA;
};

const createMarkers = (adsInfo, createAd) => {
  adsInfo
    .slice()
    .sort(compareAds)
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
        .addTo(map)
        .bindPopup(
          createAd(adInfo),
          {
            keepInView: true,
          },
        );
    });
};

const filtersRank = {
  type: 0,
  price: 0,
  rooms: 0,
  guests: 0,
  wifi: 0,
  dishwasher: 0,
  parking: 0,
  washer: 0,
  elevator: 0,
  conditioner: 0,
};

let sumFiltersRank = 0;

const getSumFiltersRank = () => {
  sumFiltersRank = Object.values(filtersRank).reduce((accumulator, filterRank) => accumulator + filterRank, 0);
};

const setHousingType = (cb) => {
  housingType.addEventListener('change', () => {
    filtersRank.type = housingType.selectedIndex !== 0 ? 1 : 0;
    getSumFiltersRank();
    console.log(filtersRank.type);
    console.log(sumFiltersRank);
    cb();
  });
};

export {createMarkers, resetMainPinMarker, setHousingType};
