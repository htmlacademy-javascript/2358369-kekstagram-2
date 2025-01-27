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

const convertPercentToInteger = (value) => Number(value.replace('%', ''));

const convertIntegerToPercent = (value) => `${value}%`;

const sortInDescending = (data) => {
  const sortedData = [...data].sort((a, b) => b.comments.length - a.comments.length);
  return sortedData;
};

const toggleBtnDisable = (btn) => {
  btn.disabled = !btn.disabled;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return function (...rest) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {createRandomId, getRandomInteger, escKeypress, convertPercentToInteger, convertIntegerToPercent, sortInDescending, toggleBtnDisable, debounce};
