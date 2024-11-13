// 1
const checkLength = (str, length) => str.length <= length;
console.log(checkLength('проверяемая строка', 20)); // true
console.log(checkLength('проверяемая строка', 18)); // true
console.log(checkLength('проверяемая строка', 10)); // false

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

console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false
console.log(isPalindrome('Лёша на полке клопа нашёл')); // true

// 3
const getNumbers = (input) => {
  const str = input.toString();
  const numbers = str.match(/\d/g);
  return numbers ? parseInt(numbers.join(''), 10) : NaN;
};

console.log(getNumbers('2023 год')); // 2023
console.log(getNumbers('ECMAScript 2022')); // 2022
console.log(getNumbers('1 кефир, 0.5 батона')); // 105
console.log(getNumbers('агент 007')); // 7
console.log(getNumbers('а я томат')); // NaN
console.log(getNumbers(2023)); // 2023
console.log(getNumbers(-1)); // 1
console.log(getNumbers(1.5)); // 15
