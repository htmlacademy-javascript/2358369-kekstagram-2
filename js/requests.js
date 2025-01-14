import { showStatusMessage } from './notifications.js';
import { closeEditModal } from './form';

const getImageData = async () => {
  const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
  const data = await response.json();
  return data;
};

const sendFormData = async (data) => {
  try {
    const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    closeEditModal();
    showStatusMessage(true);

  } catch {
    showStatusMessage(false);
  }
};

export {getImageData, sendFormData};
