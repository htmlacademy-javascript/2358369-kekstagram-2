import './effects.js';
import './validation.js';
import './form.js';
import { printThumbnails } from './thumbnails.js';
import { picturesContainer } from './thumbnails.js';
import { findPostContent } from './post.js';
import { getImageData } from './requests.js';
import { showDataError } from './notifications.js';
import { showFilters, toggleFilters, filters } from './filters.js';


const initApp = async () => {
  let data;

  try {
    data = await getImageData();

    showFilters();
    printThumbnails(data);

    filters.addEventListener('click', (evt) => {
      toggleFilters(evt, data);
    });
    picturesContainer.addEventListener('click', (evt) => {
      findPostContent(evt, data);
    });
  } catch (error) {
    showDataError();
  }

};

document.addEventListener('DOMContentLoaded', initApp);
