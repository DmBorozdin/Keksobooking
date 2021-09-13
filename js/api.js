import {showErrorDownload} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const filters = mapFilters.children;

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      showErrorDownload('Ошибка загрузки объявлений');
      mapFilters.classList.add('map__filters--disabled');
      for(const filter of filters) {
        filter.disabled = true;
      }
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking1',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    // .then(() => {
    //   document.addEventListener('keydown', onEscKeydown);
    //   document.querySelector('.success').addEventListener('click', closeSuccessMessage);
    //   resetForm(resetMainPinMarker);
    // })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
