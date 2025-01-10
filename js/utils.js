const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomId = (min, max) => {
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
};

const escKeypress = (evt, fn) => {
  if (evt.key === 'Escape') {
    fn();
  }
};

const percentToInteger = (value) => Number(value.replace('%', ''));


const integerToPercent = (value) => `${value}%`;

export {createRandomId, getRandomInteger, escKeypress, percentToInteger, integerToPercent};
