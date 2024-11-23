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
