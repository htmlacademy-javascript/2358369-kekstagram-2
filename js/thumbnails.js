const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postsFragment = document.createDocumentFragment();

const printThumbnails = (data) => {
  data.forEach((post) => {
    const singlePost = pictureTemplate.cloneNode(true);
    const singlePostImg = singlePost.querySelector('img');
    singlePostImg.src = post.url;
    singlePostImg.alt = post.description;
    singlePost.querySelector('.picture__likes').innerText = post.likes;
    singlePost.querySelector('.picture__comments').innerText = post.comments.length;
    postsFragment.append(singlePost);
  });
  picturesContainer.append(postsFragment);
};

export {printThumbnails};
