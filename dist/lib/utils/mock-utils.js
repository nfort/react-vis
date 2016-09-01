'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomSeriesData = getRandomSeriesData;
exports.getRandomData = getRandomData;
exports.getRandomDataPercent = getRandomDataPercent;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRandomSeriesData(total) {
  var result = [];
  for (var i = 0; i <= total; i++) {
    result.push({
      desktop: getRandomData(i),
      mobile: getRandomData(i),
      plan: getRandomData(i, 25000),
      xAxisLabel: (0, _moment2.default)().add(i, 'days').unix()
    });
  }
  return result;
}

function getRandomData(x, fixY) {
  var lastY = (Math.random() * 30 - 20) * 1000;
  var y = Math.ceil(Math.abs(Math.random() * lastY - lastY / 2 + lastY));
  return {
    x: x,
    y: fixY ? fixY : y
  };
}

function getRandomDataPercent(total) {
  var lastY = Math.random() * 30 - 20;
  var y = Math.abs(Math.random() * lastY - lastY / 2 + lastY);

  var result = [];
  for (var i = 0; i <= total; i++) {
    result.push({
      x: i,
      y: Math.random() * 50 - 20
    });
  }
  return result;
}