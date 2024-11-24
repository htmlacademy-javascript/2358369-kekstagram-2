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

// 4

const timeToMinuites = (time) => {
  const [hours, minutes] = time.split(':');
  const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  return totalMinutes;
};
const isMeetingInTime = (dayStart, dayEnd, meetingStart, meetingTime) => {
  dayStart = timeToMinuites(dayStart);
  dayEnd = timeToMinuites(dayEnd);
  meetingStart = timeToMinuites(meetingStart);
  return meetingStart >= dayStart && meetingStart + meetingTime <= dayEnd;
};


isMeetingInTime('08:00', '17:30', '14:00', 90); // true
isMeetingInTime('8:0', '10:0', '8:0', 120); // true
isMeetingInTime('08:00', '14:30', '14:00', 90); // false
isMeetingInTime('14:00', '17:30', '08:0', 90); // false
isMeetingInTime('8:00', '17:30', '08:00', 900); // false
