import { escKeypress, percentToInteger, integerToPercent } from './utils.js';
import { hashtagInput, resetUploadForm, commentInput } from './validation.js';
import { setDefaultEffect } from './effects.js';

const uploadInput = document.querySelector('#upload-file');
const editModal = document.querySelector('.img-upload__overlay');
const closeModalBtn = document.querySelector('.img-upload__cancel');
const zoomInBtn = document.querySelector('.scale__control--bigger');
const zoomOutBtn = document.querySelector('.scale__control--smaller');
const zoomValue = document.querySelector('.scale__control--value');
const uploadImg = document.querySelector('.img-upload__preview img');
const MIN_ZOOM_VALUE = 25;
const MAX_ZOOM_VALUE = 100;
const ZOOM_STEP = 25;


const zoomIn = () => {
  let valueNumber = percentToInteger(zoomValue.value);
  if (valueNumber + ZOOM_STEP <= MAX_ZOOM_VALUE) {
    valueNumber += 25;
    uploadImg.style.transform = `scale(${valueNumber / 100})`;
  }
  zoomValue.value = integerToPercent(valueNumber);
};

const zoomOut = () => {
  let valueNumber = percentToInteger(zoomValue.value);
  if (valueNumber - ZOOM_STEP >= MIN_ZOOM_VALUE) {
    valueNumber -= 25;
    uploadImg.style.transform = `scale(${valueNumber / 100})`;
  }
  zoomValue.value = integerToPercent(valueNumber);
};

const setDefaultZoom = () => {
  uploadImg.style.transform = 'scale(1)';
  zoomValue.value = integerToPercent(MAX_ZOOM_VALUE);
};

const closeEditModal = () => {
  editModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeModalBtn.removeEventListener('click', closeEditModal);
  resetUploadForm();
  setDefaultZoom();
  setDefaultEffect();
};

const showEditModal = () => {
  editModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeModalBtn.addEventListener('click', closeEditModal);
};

document.addEventListener('keydown', (evt) => {
  const activeElement = document.activeElement;
  if (activeElement !== commentInput && activeElement !== hashtagInput) {
    escKeypress(evt, closeEditModal);
  }
});

zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);

uploadInput.addEventListener('change', showEditModal);


export {uploadImg, closeEditModal};
