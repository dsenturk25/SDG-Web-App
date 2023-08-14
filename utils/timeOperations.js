
const addTimes = (time1, time2) => {
  let minutes = "0";
  let hours = "0";

  let time1Hours = time1.split(":")[0];
  let time1Minutes = time1.split(":")[1];

  let time2Hours = time2.split(":")[0];
  let time2Minutes = time2.split(":")[1];

  hours = (parseInt(time1Hours) + parseInt(time2Hours)).toString();
  if (hours.length == 1) hours = "0" + hours;

  minutes = (parseInt(time1Minutes) + parseInt(time2Minutes)).toString();
  if (parseInt(minutes) >= 60) {
    minutes = (parseInt(minutes) - 60).toString();
    hours = (parseInt(hours) + 1).toString();
  }

  if (minutes.length == 1) minutes = "0" + minutes;

  return hours + ":" + minutes;
}

const subtractTimes = (time1, time2) => {
  let minutes = "0";
  let hours = "0";

  let time1Hours = time1.split(":")[0];
  let time1Minutes = time1.split(":")[1];

  let time2Hours = time2.split(":")[0];
  let time2Minutes = time2.split(":")[1];

  hours = (parseInt(time1Hours) - parseInt(time2Hours)).toString();
  if (hours.length == 1) hours = "0" + hours;

  minutes = (parseInt(time1Minutes) - parseInt(time2Minutes)).toString();
  if (parseInt(minutes) < 0) {
    minutes = (parseInt(minutes) + 60).toString();
    hours = (parseInt(hours) - 1).toString();
  }

  if (minutes.length == 1) minutes = "0" + minutes;

  return hours + ":" + minutes;
}

module.exports = { addTimes, subtractTimes }
