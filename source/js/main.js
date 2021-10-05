import {createAd} from './ad.js';
import {setUserFormSubmit, resetUserForm} from './form.js';
import {loadMap} from './map.js';
import './image.js';

loadMap(createAd, setUserFormSubmit, resetUserForm);
