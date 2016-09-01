'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _mockUtils = require('../../lib/utils/mock-utils');

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var Example = function (_React$Component) {
  (0, _inherits3.default)(Example, _React$Component);

  function Example(props) {
    (0, _classCallCheck3.default)(this, Example);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Example).call(this, props));

    _this._labelFormatY = function (value, index, arrayLabel) {
      if (value === 0) return;
      return (0, _numeral2.default)(value).format('0%').toUpperCase();
    };

    _this._formatCrosshairTitleResult = function () {
      return {
        title: 'План/Факт',
        value: _this.props.planFact + '%'
      };
    };

    _this._formatCrosshairItemsResult = function () {
      return null;
    };

    _this.widthBar = (props.XYPlot.width - props.XYPlot.margin.left + props.XYPlot.margin.right) / props.chart.length - 2;
    return _this;
  }

  (0, _createClass3.default)(Example, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _.XYPlot,
        this.props.XYPlot,
        _react2.default.createElement(_.YAxis, { labelFormat: this._labelFormatY }),
        _react2.default.createElement(_.BackgroundPlot, {
          values: this.props.chart.map(function (item) {
            return item.xAxisLabel;
          }) }),
        _react2.default.createElement(_.HorizontalGridLines, null),
        _react2.default.createElement(_.VerticalBarSeries, {
          beginPlotFromZeroCoordinate: true,
          negativeValueColor: '#ff4538',
          positiveValueColor: '#00a05c',
          data: (0, _mockUtils.getRandomDataPercent)(15)
        }),
        _react2.default.createElement(_.Crosshair, { values: [{ x: this.props.timeMarker }],
          hoverShow: true,
          lineRight: true,
          itemsFormat: this._formatCrosshairItemsResult,
          titleFormat: this._formatCrosshairTitleResult })
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        XYPlot: {
          width: 720,
          height: 118,
          stackBy: 'y',
          margin: {
            left: 50,
            right: 10,
            top: 10,
            bottom: 50
          }
        },
        chart: (0, _mockUtils.getRandomSeriesData)(15),
        timeMarker: 12,
        planFact: 40
      };
    }
  }]);
  return Example;
}(_react2.default.Component);

exports.default = Example;