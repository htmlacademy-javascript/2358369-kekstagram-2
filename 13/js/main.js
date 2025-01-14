import './effects.js';
import './validation.js';
import './form.js';
import { createMockPosts } from './mock.js';
import { printThumbnails } from './thumbnails.js';
import { picturesContainer } from './thumbnails.js';
import { findPostContent } from './post.js';
import { getImageData } from './requests.js';
import { showDataError } from './notifications.js';

let data;

const initApp = async () => {

  try {
    data = await getImageData();
  } catch (error) {
    data = createMockPosts();
    showDataError();
  }
  printThumbnails(data);

  picturesContainer.addEventListener('click', (evt) => {
    findPostContent(evt, data);
  });
};

document.addEventListener('DOMContentLoaded', initApp);

export {data};
