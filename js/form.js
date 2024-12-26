import { escKeypress } from './utils.js';
import { hashtagInput, resetUploadForm } from './validation.js';
import { commentInput } from './validation.js';

const uploadInput = document.querySelector('#upload-file');
const editModal = document.querySelector('.img-upload__overlay');
const closeModalBtn = document.querySelector('.img-upload__cancel');


const closeEditModal = () => {
  editModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeModalBtn.removeEventListener('click', closeEditModal);
  resetUploadForm();
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


uploadInput.addEventListener('change', showEditModal);
