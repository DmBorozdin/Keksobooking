import {createAd} from './ad.js';
import {setUserFormSubmit} from './form.js';
import {createMarkers, resetMainPinMarker} from './map.js';
import {getData} from './api.js';

getData((ads) => {
  createMarkers(ads, createAd);
});

setUserFormSubmit(resetMainPinMarker);
