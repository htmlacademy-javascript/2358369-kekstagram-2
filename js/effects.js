import { uploadImg } from './form';

const effectsList = document.querySelector('.effects__list');
const effectValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level__slider');
const slider = document.querySelector('.img-upload__effect-level');

let effectName = 'none';

const EFFECTS_DATA = {
  none: {
    min: 0,
    max: 0,
    step: 0,
    unit: '',
    filter: 'none',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    filter: 'invert',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    filter: 'blur',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    filter: 'brightness',
  },
};

noUiSlider.create(sliderContainer, {
  start: 0,
  step: EFFECTS_DATA['none'].step,
  range: {
    'min': EFFECTS_DATA['none'].min,
    'max': EFFECTS_DATA['none'].max
  },
  connect: 'lower'
});

const toggleSliderVisibility = () => {
  slider.style.display = effectName === 'none' ? 'none' : 'block';
};

const applyFilter = (filterValue, filterUnit) => {
  const effectData = EFFECTS_DATA[effectName];
  uploadImg.style.filter = effectData.filter === 'none' ? 'none' : `${effectData.filter}(${filterValue}${filterUnit})`;
};

const applyEffect = (filterValue, filterUnit) => {
  toggleSliderVisibility();
  applyFilter(filterValue, filterUnit);
};

sliderContainer.noUiSlider.on('update', () => {
  effectValue.value = sliderContainer.noUiSlider.get();

  applyEffect(sliderContainer.noUiSlider.get(), EFFECTS_DATA[`${effectName}`].unit);
});


const toggleEffect = (evt) => {
  const effectBtn = evt.target.closest('input');
  const effect = effectBtn.value;
  effectName = effect;

  sliderContainer.noUiSlider.updateOptions({
    step: EFFECTS_DATA[effect].step,
    range: {
      'min': EFFECTS_DATA[effect].min,
      'max': EFFECTS_DATA[effect].max
    },
    start: EFFECTS_DATA[effect].max
  });
};

const setDefaultEffect = () => {
  effectName = 'none';
  sliderContainer.noUiSlider.reset();
};

effectsList.addEventListener('change', toggleEffect);

export {setDefaultEffect};
