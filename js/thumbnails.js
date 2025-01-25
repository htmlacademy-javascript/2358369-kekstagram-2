const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postsFragment = document.createDocumentFragment();

const removeThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  if (thumbnails) {
    thumbnails.forEach((thumbnail) => thumbnail.remove());
  }
};
const printThumbnails = (data) => {
  removeThumbnails();
  data.forEach((post) => {
    const singlePost = pictureTemplate.cloneNode(true);
    const singlePostImg = singlePost.querySelector('img');
    singlePostImg.src = post.url;
    singlePostImg.alt = post.description;
    singlePost.dataset.id = post.id;
    singlePost.querySelector('.picture__likes').textContent = post.likes;
    singlePost.querySelector('.picture__comments').textContent = post.comments.length;
    postsFragment.append(singlePost);
  });
  picturesContainer.append(postsFragment);
};


export {printThumbnails, picturesContainer};
