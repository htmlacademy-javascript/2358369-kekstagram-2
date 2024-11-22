// 1
const checkLength = (str, length) => str.length <= length;
checkLength('проверяемая строка', 20); // true
checkLength('проверяемая строка', 18); // true
checkLength('проверяемая строка', 10); // false

// 2
const isPalindrome = (str) => {
  str = str.replace(/ /g, '').toLowerCase();
  let a = 0;
  let b = str.length - 1;
  while (a <= b) {
    if (str[a] === str[b]) {
      a++;
      b--;
    } else {
      return false;
    }
  }
  return true;
};

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл'); // true

// 3
const getNumbers = (input) => {
  const str = input.toString();
  const numbers = str.match(/\d/g);
  return numbers ? parseInt(numbers.join(''), 10) : NaN;
};

getNumbers('2023 год'); // 2023
getNumbers('ECMAScript 2022'); // 2022
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('агент 007'); // 7
getNumbers('а я томат'); // NaN
getNumbers(2023); // 2023
getNumbers(-1); // 1
getNumbers(1.5); // 15
