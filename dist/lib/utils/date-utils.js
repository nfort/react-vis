'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColorProfileForDateRange = getColorProfileForDateRange;
exports.getTypeRange = getTypeRange;
exports.getColorDate = getColorDate;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('moment-range');

var colors = {
  white: '#fff',
  grey: '#f8f9fa'
};

// const colors = {
//   white: 'red',
//   grey: 'green'
// };


var LESS_DAY = 'less_day';
var MORE_DAY = 'more_day';
var MORE_WEEK = 'more_week';
var MORE_MONTH = 'more_month';
var NIGHT_TIME_START = 22;
var NIGHT_TIME_END = 6;

function getColorProfileForDateRange(arrayDate) {
  var result = void 0;
  var typeRange = getTypeRange(arrayDate[0], arrayDate[arrayDate.length - 1]);

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

function getTypeRange(dateStart, dateEnd) {
  var countDays = _moment2.default.duration(dateEnd - dateStart, 'seconds').asDays();

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

function getColorDate(timestamp) {
  var date = _moment2.default.unix(timestamp);
}

function colorizeMonth(arrayDate) {
  var month = void 0;
  var colorIndex = void 0;
  var colorsBackground = [colors.grey, colors.white];

  return arrayDate.map(function (timestamp, index) {
    if (typeof month === 'undefined') {
      month = _moment2.default.unix(timestamp).month();
      colorIndex = 0;
    } else if (month !== _moment2.default.unix(timestamp).month()) {
      month = _moment2.default.unix(timestamp).month();
      colorIndex = colorIndex === 0 ? 1 : 0;
    }

    return colorsBackground[colorIndex];
  });
}

function colorizeWeek(arrayDate) {
  var week = void 0;
  var colorIndex = void 0;
  var colorsBackground = [colors.grey, colors.white];

  return arrayDate.map(function (timestamp, index) {
    if (typeof week === 'undefined') {
      week = _moment2.default.unix(timestamp).weeks();
      colorIndex = 0;
    } else if (week !== _moment2.default.unix(timestamp).weeks()) {
      week = _moment2.default.unix(timestamp).weeks();
      colorIndex = colorIndex === 0 ? 1 : 0;
    }

    return colorsBackground[colorIndex];
  });
}

function colorizeDays(arrayDate) {
  var days = void 0;
  var colorIndex = void 0;
  var colorsBackground = [colors.grey, colors.white];

  return arrayDate.map(function (timestamp, index) {
    if (typeof days === 'undefined') {
      days = _moment2.default.unix(timestamp).days();
      colorIndex = 0;
    } else if (days !== _moment2.default.unix(timestamp).days()) {
      days = _moment2.default.unix(timestamp).days();
      colorIndex = colorIndex === 0 ? 1 : 0;
    }

    return colorsBackground[colorIndex];
  });
}

function colorizeLessDay(arrayDate) {
  var colorsBackground = [colors.grey, colors.white];

  return arrayDate.map(function (timestamp, index) {
    var hour = _moment2.default.unix(timestamp).hours();
    if (hour >= NIGHT_TIME_START) {
      return colorsBackground[0];
    } else if (hour <= NIGHT_TIME_END) {
      return colorsBackground[0];
    } else {
      return colorsBackground[1];
    }
  });
}