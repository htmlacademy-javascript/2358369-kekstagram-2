import './effects.js';
import './validation.js';
import './form.js';
import { printThumbnails } from './thumbnails.js';
import { picturesContainer } from './thumbnails.js';
import { findPostContent } from './post.js';
import { getImageData } from './requests.js';
import { showDataError } from './notifications.js';
import { showFilters } from './filters.js';

let data;

const initApp = async () => {

  try {
    data = await getImageData();

    showFilters();
    printThumbnails(data);

    picturesContainer.addEventListener('click', (evt) => {
      findPostContent(evt, data);
    });
  } catch (error) {
    showDataError();
  }

};

document.addEventListener('DOMContentLoaded', initApp);

export {data};
