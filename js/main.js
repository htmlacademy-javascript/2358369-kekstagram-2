import './scale';
import './slider';


const imageInput = document.getElementById('upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeBtn = document.getElementById('upload-cancel');
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeEditModal();
  }
});
closeBtn.addEventListener('click', closeEditModal);
imageInput.addEventListener('change', openEditModal);

function openEditModal() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}
function closeEditModal() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

