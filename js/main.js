import {createAd} from './ad.js';
import './form.js';
import {createMarkers} from './map.js';
import {getData} from './api.js';

getData((ads) => {
  createMarkers(ads, createAd);
});
