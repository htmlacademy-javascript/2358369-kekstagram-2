import { escKeypress, convertIntegerToPercent, convertPercentToInteger, toggleBtnDisable } from './utils.js';
import { sendFormData } from './requests.js';
import { showStatusMessage } from './notifications.js';
import { hashtagInput, resetUploadForm, commentInput } from './validation.js';
import { resetSlider } from './effects.js';

const EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const MIN_ZOOM_VALUE = 25;
const MAX_ZOOM_VALUE = 100;
const ZOOM_STEP = 25;

const uploadInput = document.querySelector('#upload-file');
const editModal = document.querySelector('.img-upload__overlay');
const closeModalBtn = document.querySelector('.img-upload__cancel');
const zoomInBtn = document.querySelector('.scale__control--bigger');
const zoomOutBtn = document.querySelector('.scale__control--smaller');
const zoomValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const formSubmitBtn = document.querySelector('.img-upload__submit');
const effectPreviews = document.querySelectorAll('.effects__preview');


const onZoomIn = () => {
  let valueNumber = convertPercentToInteger(zoomValue.value);
  if (valueNumber + ZOOM_STEP <= MAX_ZOOM_VALUE) {
    valueNumber += ZOOM_STEP;
    imgPreview.style.transform = `scale(${valueNumber / 100})`;
  }
  zoomValue.value = convertIntegerToPercent(valueNumber);
};

const onZoomOut = () => {
  let valueNumber = convertPercentToInteger(zoomValue.value);
  if (valueNumber - ZOOM_STEP >= MIN_ZOOM_VALUE) {
    valueNumber -= ZOOM_STEP;
    imgPreview.style.transform = `scale(${valueNumber / 100})`;
  }
  zoomValue.value = convertIntegerToPercent(valueNumber);
};

const setDefaultZoom = () => {
  imgPreview.style.transform = 'scale(1)';
  zoomValue.value = convertIntegerToPercent(MAX_ZOOM_VALUE);
};

const onCloseEditModal = () => {
  editModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeModalBtn.removeEventListener('click', onCloseEditModal);
  resetUploadForm();
  setDefaultZoom();
  resetSlider();
};

const onShowEditModal = () => {
  editModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeModalBtn.addEventListener('click', onCloseEditModal);
};

const onImageUpload = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = EXTENSIONS.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
    effectPreviews.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

const sendImageForm = async (formData) => {
  toggleBtnDisable(formSubmitBtn);

  try {
    const response = await sendFormData(formData);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    onCloseEditModal();
    showStatusMessage(true);
  } catch (error) {
    showStatusMessage(false);
  } finally {
    toggleBtnDisable(formSubmitBtn);
  }
};


document.addEventListener('keydown', (evt) => {
  const activeElement = document.activeElement;
  if (activeElement !== commentInput && activeElement !== hashtagInput) {
    escKeypress(evt, onCloseEditModal);
  }
});

zoomInBtn.addEventListener('click', onZoomIn);
zoomOutBtn.addEventListener('click', onZoomOut);

uploadInput.addEventListener('change', () => {
  onShowEditModal();
  onImageUpload();
});


export {imgPreview, onCloseEditModal, sendImageForm};
