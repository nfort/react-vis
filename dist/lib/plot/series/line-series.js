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

var _d3Selection = require('d3-selection');

var d3Selection = _interopRequireWildcard(_d3Selection);

var _d3Shape = require('d3-shape');

var d3Shape = _interopRequireWildcard(_d3Shape);

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _reactUtils = require('../../utils/react-utils');

var _theme = require('../../theme');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

var LineSeries = function (_AbstractSeries) {
  (0, _inherits3.default)(LineSeries, _AbstractSeries);

  function LineSeries() {
    (0, _classCallCheck3.default)(this, LineSeries);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(LineSeries).apply(this, arguments));
  }

  (0, _createClass3.default)(LineSeries, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateSeries();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updateSeries();
    }
  }, {
    key: '_updateSeries',
    value: function _updateSeries() {
      var lineElement = (0, _reactUtils.getDOMNode)(this.refs.line);
      var data = this.props.data;

      if (!data) {
        return;
      }
      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');
      var stroke = this._getAttributeValue('stroke') || this._getAttributeValue('color');
      var opacity = this._getAttributeValue('opacity') || _theme.DEFAULT_OPACITY;
      var line = d3Shape.line().x(x).y(y);
      var d = line(data);
      var path = d3Selection.select(lineElement).on('mouseover', this._mouseOver).on('mouseout', this._mouseOut).on('click', this._click);
      this._applyTransition(path).attr('d', d).style('stroke', stroke).style('opacity', opacity);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var strokeStyle = _props.strokeStyle;
      var strokeWidth = _props.strokeWidth;
      var marginLeft = _props.marginLeft;
      var marginTop = _props.marginTop;

      if (!data) {
        return null;
      }
      return _react2.default.createElement('path', {
        ref: 'line',
        className: 'rv-xy-plot__series rv-xy-plot__series--line',
        transform: 'translate(' + marginLeft + ',' + marginTop + ')',
        style: {
          opacity: 0,
          strokeDasharray: STROKE_STYLES[strokeStyle],
          strokeWidth: strokeWidth
        } });
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        strokeStyle: 'solid',
        opacity: 1
      };
    }
  }]);
  return LineSeries;
}(_abstractSeries2.default);

LineSeries.displayName = 'LineSeries';

exports.default = LineSeries;