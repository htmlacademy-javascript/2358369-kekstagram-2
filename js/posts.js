import { createRandomId, getRandomInteger } from './utils';
import { POSTS_DATA } from './mock-data';

const { POSTS_COUNT, NAMES, DESCRIPTIONS, COMMENTS } = POSTS_DATA;

const generatePhotoId = createRandomId(1, POSTS_COUNT);
const generateCommentId = createRandomId(1, 30 * POSTS_COUNT);

const createSingleComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createComments = () => Array.from({length: getRandomInteger(0, 30)}, createSingleComment);

const createPhotoPost = () => {
  const id = generatePhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: createComments(),
  };
};

const createMockPosts = () => {
  const data = Array.from({length: POSTS_COUNT}, createPhotoPost);
  return data;
};


export {createMockPosts};
