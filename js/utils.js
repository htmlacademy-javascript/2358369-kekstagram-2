import { postsData } from './data';

const { POSTS_COUNT, names, descriptions, comments} = postsData;

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomId (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('Уникальные значения исчерпаны');
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomId(1, POSTS_COUNT);
const getRandomCommentId = createRandomId(1, 30 * POSTS_COUNT);

const createComments = () => Array.from({length: getRandomInteger(0, 30)}, () => ({
  id: getRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: comments[getRandomInteger(0, comments.length - 1)],
  name: names[getRandomInteger(0, names.length - 1)]
}));

const data = Array.from({length: POSTS_COUNT}, () => {
  const id = generatePhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: descriptions[getRandomInteger(0, descriptions.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: createComments(),
  };
});
console.log(data);
