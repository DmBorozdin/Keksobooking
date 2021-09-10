const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const ERROR_SHOW_TIME = 3000;

const showErrorMessage = (message) => {
  const errorMessage = errorTemplate.cloneNode(true);

  errorMessage.querySelector('.error__message').textContent = message;

  document.body.appendChild(errorMessage);
};

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

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

export {showErrorMessage, showErrorDownload};
