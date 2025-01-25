import { uploadImg } from './form.js';

const EFFECTS_DATA = {
  none: { min: 0, max: 0, step: 0, unit: '', filter: 'none' },
  chrome: { min: 0, max: 1, step: 0.1, unit: '', filter: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, unit: '', filter: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, unit: '%', filter: 'invert' },
  phobos: { min: 0, max: 3, step: 0.1, unit: 'px', filter: 'blur' },
  heat: { min: 1, max: 3, step: 0.1, unit: '', filter: 'brightness' },
};

const effectsList = document.querySelector('.effects__list');
const effectValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level__slider');
const slider = document.querySelector('.img-upload__effect-level');

let currentEffect = 'none';


noUiSlider.create(sliderContainer, {
  start: EFFECTS_DATA.none.min,
  step: EFFECTS_DATA.none.step,
  range: {
    min: EFFECTS_DATA.none.min,
    max: EFFECTS_DATA.none.max,
  },
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.classList.add('hidden');

const toggleSliderVisibility = () => {
  if (currentEffect !== 'none') {
    slider.classList.remove('hidden');
  } else {
    slider.classList.add('hidden');
  }
};

const applyFilter = (value) => {
  const { filter, unit } = EFFECTS_DATA[currentEffect];
  uploadImg.style.filter = filter === 'none' ? 'none' : `${filter}(${value}${unit})`;
};

const updateSliderOptions = () => {
  const { min, max, step } = EFFECTS_DATA[currentEffect];
  sliderContainer.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

sliderContainer.noUiSlider.on('update', () => {
  const value = sliderContainer.noUiSlider.get();
  effectValue.value = value;
  applyFilter(value);
});

const toggleEffect = (evt) => {
  const effectBtn = evt.target.closest('input');
  if (!effectBtn) {
    return;
  }

  currentEffect = effectBtn.value;
  toggleSliderVisibility();
  updateSliderOptions();
};

const resetSlider = () => {
  currentEffect = 'none';
  slider.classList.add('hidden');
  sliderContainer.noUiSlider.reset();
  applyFilter(EFFECTS_DATA.none.min);
};

effectsList.addEventListener('change', toggleEffect);

export { resetSlider };
