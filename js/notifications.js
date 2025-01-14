const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const formSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const formErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const showDataError = () => {
  const errorNode = dataErrorTemplate.cloneNode(true);
  document.body.append(errorNode);
  setTimeout(() => {
    errorNode.remove();
  }, 5000);
};

const closeFormMessage = (elem) => {
  elem.querySelector('button').addEventListener('click', () => {
    elem.remove();
  });

  const closeOnEsc = (evt) => {
    evt.stopImmediatePropagation();
    elem.remove();
    document.body.removeEventListener('keydown', closeOnEsc);
  };

  const handleClickOutside = (evt) => {
    const messageArea = evt.target.closest('div');
    if (evt.target === messageArea) {
      return;
    }
    elem.remove();
    document.removeEventListener('click', handleClickOutside);
  };

  document.addEventListener('click', handleClickOutside);
  document.body.addEventListener('keydown', closeOnEsc);
};

const showStatusMessage = (status) => {
  let statusMessage;
  if (status) {
    statusMessage = formSuccessTemplate.cloneNode(true);
  } else {
    statusMessage = formErrorTemplate.cloneNode(true);
  }

  document.body.append(statusMessage);
  closeFormMessage(statusMessage);
};

export {showDataError, showStatusMessage};
