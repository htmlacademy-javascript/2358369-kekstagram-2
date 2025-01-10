import { createMockPosts } from './mock.js';
import { printThumbnails } from './thumbnails.js';
import { picturesContainer } from './thumbnails.js';
import { findPostContent } from './post.js';
import './form.js';
import './validation.js';
import './effects.js';

const initApp = () => {
  const data = createMockPosts();
  printThumbnails(data);
  picturesContainer.addEventListener('click', (evt) => {
    findPostContent(evt, data);
  });
};

document.addEventListener('DOMContentLoaded', initApp);

