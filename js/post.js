import { escKeypress } from './utils.js';

const COUNT_STEP = 5;

const postModal = document.querySelector('.big-picture');
const closeModalBtn = document.querySelector('.big-picture__cancel');
const postComments = document.querySelector('.social__comments');
const loadMore = document.querySelector('.social__comments-loader');
const commentsCount = document.querySelector('.social__comment-shown-count');

let currentCount = 0;
let comments = [];

const onClosePostModal = () => {
  postModal.classList.add('hidden');
  closeModalBtn.removeEventListener('click', onClosePostModal);
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

    const imgNode = document.createElement('img');
    imgNode.classList.add('social__picture');
    imgNode.src = comment.avatar;
    imgNode.alt = comment.name;
    imgNode.width = 35;
    imgNode.height = 35;

    const textNode = document.createElement('p');
    textNode.classList.add('social__text');
    textNode.textContent = comment.message;

    commentNode.appendChild(imgNode);
    commentNode.appendChild(textNode);

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
  closeModalBtn.addEventListener('click', onClosePostModal);
};

const findPostContent = (evt, data) => {
  const postElement = evt.target.closest('.picture');
  if (!postElement) {
    return;
  }
  const postId = postElement.dataset.id;
  const postData = data.find((photo) => photo.id === Number(postId));
  openPostModal(postData);
};

document.addEventListener('keydown', (evt) => {
  escKeypress(evt, onClosePostModal);
});

loadMore.addEventListener('click', () => insertMoreComments());

export {findPostContent, postComments};
