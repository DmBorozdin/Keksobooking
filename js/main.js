import {createAd} from './ad.js';
import {setUserFormSubmit, resetUserForm} from './form.js';
import {createMarkers, resetMainPinMarker, setFilters} from './map.js';
import {getData} from './api.js';

const RERENDER_DELAY = 500;

getData((ads) => {
  createMarkers(ads, createAd);
  setFilters(_.debounce(() => createMarkers(ads, createAd), RERENDER_DELAY) );
});

setUserFormSubmit(resetMainPinMarker);
resetUserForm(resetMainPinMarker);
