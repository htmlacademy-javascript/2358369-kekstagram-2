const getImageData = async () => {
  const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
  const data = await response.json();
  return data;
};

const sendFormData = async (data) => await fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
  method: 'POST',
  body: data,
});

export {getImageData, sendFormData};
