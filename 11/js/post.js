import { escKeypress } from './utils.js';

const postModal = document.querySelector('.big-picture');
const closeModalBtn = document.querySelector('.big-picture__cancel');
const postComments = document.querySelector('.social__comments');
const loadMore = document.querySelector('.social__comments-loader');
const commentsCount = document.querySelector('.social__comment-shown-count');

const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const closePostModal = () => {
  postModal.classList.add('hidden');
  closeModalBtn.removeEventListener('click', closePostModal);
  document.body.classList.remove('modal-open');
};

const resetComments = () => {
  currentCount = 0;
  postComments.innerHTML = '';
  loadMore.classList.remove('hidden');
};

const checkCommentsLength = () => {
  commentsCount.textContent = currentCount;
  if (currentCount === comments.length) {
    loadMore.classList.add('hidden');
  }
};

const insertMoreComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const commentsToPrint = comments.slice(currentCount, currentCount + COUNT_STEP);
  currentCount += commentsToPrint.length;

  commentsToPrint.forEach((comment) => {
    const commentNode = document.createElement('li');
    commentNode.classList.add('social__comment');
    commentNode.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>`;
    commentsFragment.append(commentNode);
  });

  postComments.appendChild(commentsFragment);
  checkCommentsLength();
};

const insertPostComments = (newComments) => {
  comments = newComments;
  resetComments();
  insertMoreComments();
};

const openPostModal = (content) => {
  postModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  postModal.querySelector('img').src = content.url;
  postModal.querySelector('.likes-count').textContent = content.likes;
  postModal.querySelector('.social__caption').textContent = content.description;
  postModal.querySelector('.social__comment-total-count').textContent = content.comments.length;
  insertPostComments(content.comments);
  closeModalBtn.addEventListener('click', closePostModal);
};

const findPostContent = (evt, data) => {
  const url = evt.target.closest('.picture').querySelector('img').src;
  const photoId = Number(url.split('/').pop().split('.')[0]);
  const postData = data.find((photo) => photo.id === photoId);
  openPostModal(postData);
};

document.addEventListener('keydown', (evt) => {
  escKeypress(evt, closePostModal);
});

loadMore.addEventListener('click', () => insertMoreComments());

export {findPostContent, postComments};