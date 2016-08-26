import moment from 'moment';
require('moment-range');

const colors = {
  white: '#fff',
  grey: '#f8f9fa'
};

// const colors = {
//   white: 'red',
//   grey: 'green'
// };


const LESS_DAY = 'less_day';
const MORE_DAY = 'more_day';
const MORE_WEEK = 'more_week';
const MORE_MONTH = 'more_month';
const NIGHT_TIME_START = 22;
const NIGHT_TIME_END = 6;


export function getColorProfileForDateRange(arrayDate) {
  let result;
  const typeRange = getTypeRange(arrayDate[0], arrayDate[arrayDate.length - 1]);

  switch (typeRange) {
    case MORE_MONTH:
      result = colorizeMonth(arrayDate);
      break;
    case MORE_WEEK:
      result = colorizeWeek(arrayDate);
      break;
    case MORE_DAY:
      result = colorizeDays(arrayDate);
      break;
    case LESS_DAY:
      result = colorizeLessDay(arrayDate);
      break;
    default:
      throw Error('Not found type for data range');
  }

  return result;
}

export function getTypeRange(dateStart, dateEnd) {
  const countDays = moment.duration(dateEnd - dateStart, 'seconds').asDays();

  if (countDays >= 31) {
    return MORE_MONTH;
  } else if (countDays >= 14) {
    return MORE_WEEK;
  } else if (countDays > 1) {
    return MORE_DAY;
  } else if (countDays <= 1) {
    return LESS_DAY;
  }
}

export function getColorDate(timestamp) {
  const date = moment.unix(timestamp);
}

function colorizeMonth(arrayDate) {
  let month;
  let colorIndex;
  let colorsBackground = [colors.grey, colors.white];

  return arrayDate.map((timestamp, index) => {
    if (typeof month === 'undefined') {
      month =  moment.unix(timestamp).month();
      colorIndex = 0;
    } else if (month !== moment.unix(timestamp).month()) {
      month =  moment.unix(timestamp).month();
      colorIndex = colorIndex === 0 ? 1 : 0;
    }

    return colorsBackground[colorIndex];
  });
}

function colorizeWeek(arrayDate) {
  let week;
  let colorIndex;
  let colorsBackground = [colors.grey, colors.white];

  return arrayDate.map((timestamp, index) => {
    if (typeof week === 'undefined') {
      week =  moment.unix(timestamp).weeks();
      colorIndex = 0;
    } else if (week !== moment.unix(timestamp).weeks()) {
      week =  moment.unix(timestamp).weeks();
      colorIndex = colorIndex === 0 ? 1 : 0;
    }

    return colorsBackground[colorIndex];
  });
}

function colorizeDays(arrayDate) {
  let days;
  let colorIndex;
  let colorsBackground = [colors.grey, colors.white];

  return arrayDate.map((timestamp, index) => {
    if (typeof days === 'undefined') {
      days =  moment.unix(timestamp).days();
      colorIndex = 0;
    } else if (days !== moment.unix(timestamp).days()) {
      days =  moment.unix(timestamp).days();
      colorIndex = colorIndex === 0 ? 1 : 0;
    }

    return colorsBackground[colorIndex];
  });
}

function colorizeLessDay(arrayDate) {
  let colorsBackground = [colors.grey, colors.white];

  return arrayDate.map((timestamp, index) => {
    let hour = moment.unix(timestamp).hours();
    if (hour >= NIGHT_TIME_START) {
      return colorsBackground[0];
    } else if (hour <= NIGHT_TIME_END) {
      return colorsBackground[0];
    } else {
      return colorsBackground[1];
    }
  });
}
