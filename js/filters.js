import { printThumbnails } from './thumbnails';
import { createRandomId, sortInDescending, debounce } from './utils';

const RANDOM_POSTS_COUNT = 10;
const ACTIVE_FILTER = 'img-filters__button--active';

const filters = document.querySelector('.img-filters');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const getRandomPosts = (data) => {
  const randomData = [];
  const generateRandomIndex = createRandomId(0, data.length - 1);
  for (let i = 0; i < RANDOM_POSTS_COUNT; i++) {
    const randomIndex = generateRandomIndex();
    const post = data[randomIndex];
    randomData.push(post);
  }
  return randomData;
};

const applyFilter = debounce((filter, data) => {
  const initialData = data;

  switch (filter) {
    case 'filter-default': {
      printThumbnails(initialData);
      break;
    }
    case 'filter-random': {
      const randomPosts = getRandomPosts(data);
      printThumbnails(randomPosts);
      break;
    }
    case 'filter-discussed': {
      const discussedPosts = sortInDescending(data);
      printThumbnails(discussedPosts);
      break;
    }
  }
});

const toggleFilters = (evt, data) => {
  const filterBtn = evt.target.closest('.img-filters__button');
  if (!filterBtn) {
    return;
  }
  const filterName = filterBtn.id;
  const activeFilterBtn = document.querySelector(`.${ACTIVE_FILTER}`);
  activeFilterBtn.classList.remove(`${ACTIVE_FILTER}`);
  filterBtn.classList.add(ACTIVE_FILTER);

  applyFilter(filterName, data);
};


export {showFilters, filters, toggleFilters};
