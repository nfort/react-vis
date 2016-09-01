'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _pureRenderComponent = require('../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _gridLines = require('./grid-lines');

var _gridLines2 = _interopRequireDefault(_gridLines);

var _scalesUtils = require('../utils/scales-utils');

var _axisUtils = require('../utils/axis-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerticalGridLines = function (_PureRenderComponent) {
  (0, _inherits3.default)(VerticalGridLines, _PureRenderComponent);

  function VerticalGridLines() {
    (0, _classCallCheck3.default)(this, VerticalGridLines);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(VerticalGridLines).apply(this, arguments));
  }

  (0, _createClass3.default)(VerticalGridLines, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var innerHeight = _props.innerHeight;
      var innerWidth = _props.innerWidth;

      return _react2.default.createElement(_gridLines2.default, (0, _extends3.default)({}, this.props, {
        attr: 'x',
        orientation: 'bottom',
        top: innerHeight,
        ticksTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
        tickSize: -innerHeight }));
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return (0, _extends3.default)({
        values: _react2.default.PropTypes.array,
        marginTop: _react2.default.PropTypes.number,
        marginLeft: _react2.default.PropTypes.number,
        innerWidth: _react2.default.PropTypes.number,
        innerHeight: _react2.default.PropTypes.number
      }, (0, _scalesUtils.getScalePropTypesByAttribute)('x'));
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);
  return VerticalGridLines;
}(_pureRenderComponent2.default); // Copyright (c) 2016 Uber Technologies, Inc.
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

VerticalGridLines.displayName = 'VerticalGridLines';

exports.default = VerticalGridLines;