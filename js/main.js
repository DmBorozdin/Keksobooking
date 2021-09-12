import {createAd} from './ad.js';
import {setUserFormSubmit} from './form.js';
import {createMarkers} from './map.js';
import {getData} from './api.js';
import {showSuccessMessage} from './util.js';

getData((ads) => {
  createMarkers(ads, createAd);
});

setUserFormSubmit(showSuccessMessage);
