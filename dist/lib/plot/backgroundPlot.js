'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _scalesUtils = require('../utils/scales-utils');

var _dateUtils = require('../utils/date-utils');

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

var PADDING_RIGHT_BAR = 1.7;

/**
 * Format title by detault.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */
function defaultTitleFormat(values) {
  var value = getFirstNonEmptyValue(values);
  if (value) {
    return {
      title: 'x',
      value: value.x
    };
  }
}

/**
 * Format items by default.
 * @param {Array} values Array of values.
 * @returns {*} Formatted list of items.
 */
function defaultItemsFormat(values) {
  return values.map(function (v, i) {
    if (v) {
      return { value: v.y, title: i };
    }
  });
}

/**
 * Get the first non-empty item from an array.
 * @param {Array} values Array of values.
 * @returns {*} First non-empty value or undefined.
 */
function getFirstNonEmptyValue(values) {
  return (values || []).find(function (v) {
    return Boolean(v);
  });
}

var BackgroundPlot = function (_PureRenderComponent) {
  (0, _inherits3.default)(BackgroundPlot, _PureRenderComponent);

  function BackgroundPlot() {
    (0, _classCallCheck3.default)(this, BackgroundPlot);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(BackgroundPlot).apply(this, arguments));
  }

  (0, _createClass3.default)(BackgroundPlot, [{
    key: '_getScaleDistance',
    value: function _getScaleDistance(attr) {
      var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(this.props, attr);
      return scaleObject ? scaleObject.distance : 0;
    }
  }, {
    key: 'calculatePosX',
    value: function calculatePosX(item) {
      var distance = this._getScaleDistance('x');
      var itemSize = distance / 2 * 0.95;
      var sameTypeTotal = 1;
      var sameTypeIndex = 0;
      var lineFunctor = this.getPositionX(item);
      return lineFunctor - itemSize + itemSize * 2 / sameTypeTotal * sameTypeIndex;
    }
  }, {
    key: 'getPositionX',
    value: function getPositionX(value) {
      var x = (0, _scalesUtils.getAttributeFunctor)(this.props, 'x');
      return x(value);
    }
  }, {
    key: '_getAttributeFunctor',
    value: function _getAttributeFunctor(attr) {
      return (0, _scalesUtils.getAttributeFunctor)(this.props, attr);
    }
  }, {
    key: 'calculatePosY',
    value: function calculatePosY() {
      var poxY = { x: 0, y: this.props.plan };
      var valueFunctor = this._getAttributeFunctor('y');
      var value0Functor = (0, _scalesUtils.getAttr0Functor)(this.props, 'y');
      return Math.abs(-value0Functor(poxY) + valueFunctor(poxY));
    }
  }, {
    key: 'renderRectangleWithFixedHeight',
    value: function renderRectangleWithFixedHeight() {
      var _props = this.props;
      var innerWidth = _props.innerWidth;
      var innerHeight = _props.innerHeight;


      return _react2.default.createElement('rect', {
        className: 'rv-xy-plot__background-plot',
        x: 0,
        y: innerHeight - this.calculatePosY(),
        opacity: 0.1,
        fill: '#999999',
        ref: 'container',
        width: innerWidth,
        height: this.calculatePosY()
      });
    }
  }, {
    key: 'getRect',
    value: function getRect(index, color) {
      var innerHeight = this.props.innerHeight;


      var distance = this._getScaleDistance('x');
      var itemSize = distance / 2 * 0.95;

      var firstPositionX = this.calculatePosX({ x: 0, y: 0 });

      if (index !== 0) {
        firstPositionX = firstPositionX * 2;
      }

      var left = this.calculatePosX({ x: index, y: 0 }) - firstPositionX;
      var width = itemSize * 2 + firstPositionX;

      return _react2.default.createElement('rect', {
        className: 'rv-xy-plot__background-plot',
        x: left,
        y: 0,
        opacity: 0.9,
        fill: color,
        ref: 'container',
        key: index,
        width: width,
        height: innerHeight
      });
    }
  }, {
    key: 'renderPlot',
    value: function renderPlot() {
      var _this2 = this;

      var _props2 = this.props;
      var values = _props2.values;
      var plan = _props2.plan;


      if (values) {
        var _ret = function () {
          var colorize = (0, _dateUtils.getColorProfileForDateRange)(values);
          return {
            v: values.map(function (item, index) {
              return _this2.getRect(index, colorize[index]);
            })
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
      }

      if (plan) return this.renderRectangleWithFixedHeight();

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var marginTop = _props3.marginTop;
      var marginLeft = _props3.marginLeft;


      return _react2.default.createElement(
        'g',
        { transform: 'translate(' + marginLeft + ',' + marginTop + ')' },
        this.renderPlot()
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        values: _react2.default.PropTypes.array,
        series: _react2.default.PropTypes.object,
        innerWidth: _react2.default.PropTypes.number,
        innerHeight: _react2.default.PropTypes.number,
        marginLeft: _react2.default.PropTypes.number,
        marginTop: _react2.default.PropTypes.number,
        itemsFormat: _react2.default.PropTypes.func,
        titleFormat: _react2.default.PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        titleFormat: defaultTitleFormat,
        itemsFormat: defaultItemsFormat
      };
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);
  return BackgroundPlot;
}(_pureRenderComponent2.default);

BackgroundPlot.displayName = 'BackgroundPlot';

exports.default = BackgroundPlot;