import { printThumbnails } from './thumbnails';
import { createRandomId, sortInDescending, debounce } from './utils';

const RANDOM_POSTS_COUNT = 10;

const filters = document.querySelector('.img-filters');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const getRandomPosts = (data) => {
  const randomData = [];
  const generateRandomPosts = createRandomId(0, data.length - 1);
  for (let i = 0; i < RANDOM_POSTS_COUNT; i++) {
    const id = generateRandomPosts();
    const post = data[id];
    randomData.push(post);

  }
  return randomData;
};

const applyFilter = (filter, data) => {
  const initialData = data;

  const debouncePrint = debounce(printThumbnails);
  switch (filter) {
    case 'filter-default': {
      debouncePrint(initialData);
      break;
    }
    case 'filter-random': {
      const randomPosts = getRandomPosts(data);
      debouncePrint(randomPosts);
      break;
    }
    case 'filter-discussed': {
      const discussedPosts = sortInDescending(data);
      debouncePrint(discussedPosts);
    }
  }
};

const toggleFilters = (evt, data) => {
  const filterBtn = evt.target.closest('.img-filters__button');
  if (!filterBtn) {
    return;
  }
  const filterName = filterBtn.id;

  const ACTIVE_FILTER = 'img-filters__button--active';
  const activeFilterBtn = document.querySelector(`.${ACTIVE_FILTER}`);
  activeFilterBtn.classList.remove(`${ACTIVE_FILTER}`);
  filterBtn.classList.add(ACTIVE_FILTER);

  applyFilter(filterName, data);
};


export {showFilters, filters, toggleFilters};
