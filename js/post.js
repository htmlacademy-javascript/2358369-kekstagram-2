import { escKeypress } from './utils';

const postModal = document.querySelector('.big-picture');
const closeModalBtn = document.querySelector('.big-picture__cancel');
const postComments = document.querySelector('.social__comments');


const closePostModal = () => {
  postModal.classList.add('hidden');
  closeModalBtn.removeEventListener('click', closePostModal);
  document.body.classList.remove('modal-open');
};


const insertPostComments = (commentsArr) => {
  const commentsFragment = document.createDocumentFragment();
  commentsArr.forEach((comment) => {
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
  postComments.append(commentsFragment);
};

const openPostModal = (content) => {
  postModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  postModal.querySelector('img').src = content.url;
  postModal.querySelector('.likes-count').textContent = content.likes;
  postModal.querySelector('.social__caption').textContent = content.description;
  postModal.querySelector('.social__comment-total-count').textContent = content.comments.length;
  postModal.querySelector('.social__comment-count').classList.add('hidden');
  postModal.querySelector('.comments-loader').classList.add('hidden');
  postComments.innerHTML = '';
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

export {findPostContent};
