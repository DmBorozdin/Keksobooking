const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const address = form.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const filters = mapFilters.children;

const MAP_CONST = {
  minPrice: {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  },
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
};

address.value = `${MAP_CONST.mainPinMarker.lat.toFixed(5)}, ${MAP_CONST.mainPinMarker.lng.toFixed(5)}`;

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

const createMarkers = (adsInfo, createAd) => {
  adsInfo.forEach((adInfo) => {
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

export {createMarkers};
