const fileAvatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fileImageChooser = document.querySelector('.ad-form__input');
const formPhotoContainer = document.querySelector('.ad-form__photo-container');
const formPhoto = formPhotoContainer.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const createPreviewFoto = (file, preview, isAvatar) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      isAvatar ? preview.src = reader.result : preview.style.backgroundImage = `url(${reader.result})`;
    });
    reader.readAsDataURL(file);
  }
};

fileAvatarChooser.addEventListener('change', () => {
  const fileAvatar = fileAvatarChooser.files[0];
  createPreviewFoto(fileAvatar, avatarPreview, true);
});

fileImageChooser.addEventListener('change', () => {
  if (formPhotoContainer.children.length > 2) {
    for (let index = 2; index < formPhotoContainer.children.length; index++) {
      formPhotoContainer.removeChild(formPhotoContainer.lastChild);
    }
  }
  formPhoto.style.backgroundImage = '';
  const filesPhoto = fileImageChooser.files;
  createPreviewFoto(filesPhoto[0], formPhoto, false);
  if (filesPhoto.length > 1) {
    for (let index = 1; index < filesPhoto.length; index++) {
      const nextPhoto = document.createElement('div');
      nextPhoto.classList.add('ad-form__photo');
      createPreviewFoto(filesPhoto[index], nextPhoto, false);
      formPhotoContainer.appendChild(nextPhoto);
    }
  }
});
