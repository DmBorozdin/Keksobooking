import {createAd} from './ad.js';
import {setUserFormSubmit, resetUserForm} from './form.js';
import {createMarkers, resetMap, setFilters} from './map.js';
import {getData} from './api.js';
import './image.js';

const RERENDER_DELAY = 500;

getData((ads) => {
  createMarkers(ads, createAd);
  setFilters(_.debounce(() => createMarkers(ads, createAd), RERENDER_DELAY) );
  setUserFormSubmit(() => resetMap(ads, createAd));
  resetUserForm(() => resetMap(ads, createAd));
});
