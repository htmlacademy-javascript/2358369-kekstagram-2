const POSTS_COUNT = 25;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Александр', 'Алексей', 'Андрей', 'Антон', 'Аркадий',
  'Борис', 'Вадим', 'Валентин', 'Валерий', 'Василий',
  'Виктор', 'Виталий', 'Владимир', 'Владислав', 'Геннадий',
  'Георгий', 'Григорий', 'Даниил',
];
const DESCRIPTIONS = [
  'Закат над спокойным морем.',
  'Горный пейзаж в облаках.',
  'Свет вечернего солнца в лесу.',
  'Кот, дремлющий на подоконнике.',
  'Уютное кафе с чашкой кофе.',
  'Дорога в осеннем лесу.',
  'Шумный городской пейзаж ночью.',
  'Цветущий луг весной.',
  'Детали старинной архитектуры.',
  'Голубое небо с одиноким облаком.'
];

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

const createMockData = () => {
  const data = Array.from({length: POSTS_COUNT}, createPhotoPost);
  return data;
};

createMockData();


