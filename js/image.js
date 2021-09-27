const fileAvatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fileImageChooser = document.querySelector('.ad-form__input');
const formPhotos = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const createPreviewFoto = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

fileAvatarChooser.addEventListener('change', () => {
  createPreviewFoto(fileAvatarChooser, avatarPreview);
});

fileImageChooser.addEventListener('change', () => {
  formPhotos.innerHTML = '';
  const photo = document.createElement('img');
  photo.alt = 'Фотография квартиры';
  photo.style.height = '70px';
  createPreviewFoto(fileImageChooser, photo);
  formPhotos.appendChild(photo);
});
