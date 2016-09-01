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

var _axis = require('./axis');

var _axis2 = _interopRequireDefault(_axis);

var _axisUtils = require('../utils/axis-utils');

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

var XAxis = function (_PureRenderComponent) {
  (0, _inherits3.default)(XAxis, _PureRenderComponent);

  function XAxis() {
    (0, _classCallCheck3.default)(this, XAxis);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(XAxis).apply(this, arguments));
  }

  (0, _createClass3.default)(XAxis, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var innerWidth = _props.innerWidth;
      var innerHeight = _props.innerHeight;
      var marginTop = _props.marginTop;
      var marginLeft = _props.marginLeft;

      return _react2.default.createElement(_axis2.default, (0, _extends3.default)({}, this.props, {
        className: 'rv-xy-plot__axis--x',
        orientation: 'bottom',
        titleStyle: {
          transform: 'translate(' + innerWidth + 'px, -5px)'
        },
        ticksTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
        top: innerHeight + marginTop,
        left: marginLeft,
        attr: 'x' }));
    }
  }], [{
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);
  return XAxis;
}(_pureRenderComponent2.default);

XAxis.displayName = 'XAxis';

exports.default = XAxis;