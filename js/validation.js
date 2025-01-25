import { sendImageForm } from './form.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const checkValidity = (value) => {
  if (value.length === 0) {
    return true;
  }
  return value.trim().split(/\s+/).every((hashtag) => HASHTAG_PATTERN.test(hashtag));
};


const checkCount = (value) => {
  const hashtags = value.trim().split(/\s+/);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const checkUnique = (value) => {
  const hashtags = value.trim().split(/\s+/).map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

const resetUploadForm = () => {
  uploadForm.reset();
  pristine.reset();
};

const checkCommentLength = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInput, checkUnique, 'Хэштеги не должны повторяться');
pristine.addValidator(hashtagInput, checkCount, 'Количество хэштегов не должно превышать 5');
pristine.addValidator(hashtagInput, checkValidity, 'Хэштег должен начинаться с #, может содержать только буквы и числа, а также не должен превышать 20 символов');
pristine.addValidator(commentInput, checkCommentLength, 'Длина комментария не должна превышать 140 символов');

uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(uploadForm);
    await sendImageForm(formData);
  }
});


export {resetUploadForm, commentInput, hashtagInput};
