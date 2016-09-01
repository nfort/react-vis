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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _lineSeries = require('./line-series');

var _lineSeries2 = _interopRequireDefault(_lineSeries);

var _markSeries = require('./mark-series');

var _markSeries2 = _interopRequireDefault(_markSeries);

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

var LineMarkSeries = function (_AbstractSeries) {
  (0, _inherits3.default)(LineMarkSeries, _AbstractSeries);

  function LineMarkSeries() {
    (0, _classCallCheck3.default)(this, LineMarkSeries);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(LineMarkSeries).apply(this, arguments));
  }

  (0, _createClass3.default)(LineMarkSeries, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'g',
        { className: 'rv-xy-plot__series rv-xy-plot__series--linemark' },
        _react2.default.createElement(_lineSeries2.default, this.props),
        _react2.default.createElement(_markSeries2.default, this.props)
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return _lineSeries2.default.defaultProps;
    }
  }]);
  return LineMarkSeries;
}(_abstractSeries2.default);

LineMarkSeries.displayName = 'LineMarkSeries';

exports.default = LineMarkSeries;