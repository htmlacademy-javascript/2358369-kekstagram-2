import './post.js';
import { createMockPosts } from './mock.js';
import { printThumbnails } from './thumbnails.js';
import { picturesContainer } from './thumbnails.js';
import { findPostContent } from './post.js';

const initApp = () => {
  const data = createMockPosts();
  printThumbnails(data);
  picturesContainer.addEventListener('click', (evt) => {
    findPostContent(evt, data);
  });
};

document.addEventListener('DOMContentLoaded', initApp);

