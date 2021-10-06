const ERROR_SHOW_TIME = 3000;

const showErrorDownload = (message) => {
  const errorContainer = document.createElement('div');
  const errorContainerMessage = document.createElement('p');
  errorContainer.style.zIndex = 1100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.width = '100%';
  errorContainer.style.height  = '100%';
  errorContainer.style.display = 'flex';
  errorContainer.style.alignItems = 'center';
  errorContainer.style.justifyContent = 'center';
  errorContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

  errorContainerMessage.textContent = message;
  errorContainerMessage.style.color = '#fff';
  errorContainerMessage.style.fontSize = '30px';

  errorContainer.appendChild(errorContainerMessage);
  document.querySelector('.map').appendChild(errorContainer);

  setTimeout(() => errorContainer.remove(), ERROR_SHOW_TIME);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {showErrorDownload, isEscEvent};
