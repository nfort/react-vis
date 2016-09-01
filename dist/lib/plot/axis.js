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

var _lodash = require('lodash');

var _pureRenderComponent = require('../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _reactUtils = require('../utils/react-utils');

var _axisUtils = require('../utils/axis-utils');

var _scalesUtils = require('../utils/scales-utils');

var _animationUtils = require('../utils/animation-utils');

var _theme = require('../theme');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Применяем эти константы когда ориентация оси Х идет вертикально
// Отступ для оси X сверху
var TOP_FROM_XAXIS = -10;
// Высота контеинера в котором лежит label для оси X
// !!! Так как контеинер для оси перевернут на -270 градусовов, то соотвественно высота и ширина поменялись местами
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

var HEIGHT_FONT_CONTAINER = 7;

/**
 * Get axis component for the chart/plot.
 * @param {string} displayName Display name for the component.
 * @param {string} classSet Class name postfix for the axis container.
 * @param {string} orientation d3's orientation.
 * @param {function(Number, Number, Object):Number} tickNumberCallback Callback
 *   to calculate the number of ticks passed.
 * @returns {React.Component} Axis component.
 */

var Axis = function (_PureRenderComponent) {
  (0, _inherits3.default)(Axis, _PureRenderComponent);

  function Axis() {
    (0, _classCallCheck3.default)(this, Axis);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Axis).apply(this, arguments));
  }

  (0, _createClass3.default)(Axis, [{
    key: '_setAxisLabels',


    /**
     * Set axis labels.
     * @param {Object} axis Axis object.
     * @returns {Object} Axis object.
     * @private
     */
    value: function _setAxisLabels(axis) {
      var _props = this.props;
      var labelFormat = _props.labelFormat;
      var labelValues = _props.labelValues;
      var ticksTotal = _props.ticksTotal;


      if (!labelValues) {
        axis.ticks(ticksTotal);
      } else {
        axis.tickValues(labelValues);
      }
      if (labelFormat) {
        axis.tickFormat(labelFormat);
      }
      axis.tickSize(0, 0);
      axis.tickSizeOuter(0);
      axis.tickPadding(7);
      return axis;
    }

    /**
     * Set axis ticks.
     * @param {Object} axis Axis object.
     * @returns {Object} Axis object.
     * @private
     */

  }, {
    key: '_setAxisTicks',
    value: function _setAxisTicks(axis) {
      var _props2 = this.props;
      var tickValues = _props2.tickValues;
      var ticksTotal = _props2.ticksTotal;
      var tickSize = _props2.tickSize;

      if (!tickValues) {
        axis.ticks(ticksTotal);
      } else {
        axis.tickValues(tickValues);
      }
      axis.tickFormat('');
      axis.tickSize(tickSize);
      axis.tickSizeOuter(0);
      return axis;
    }

    /**
     * Renders the axis inside the existing container.
     * @private
     */

  }, {
    key: '_render',
    value: function _render() {
      var _props3 = this.props;
      var orientation = _props3.orientation;
      var attr = _props3.attr;

      var scale = (0, _scalesUtils.getAttributeScale)(this.props, attr);
      if (!scale) {
        return;
      }

      var _refs = this.refs;
      var labels = _refs.labels;
      var ticks = _refs.ticks;

      var selectedLabels = d3Selection.select((0, _reactUtils.getDOMNode)(labels));
      var selectedTicks = d3Selection.select((0, _reactUtils.getDOMNode)(ticks));
      var axisFn = (0, _axisUtils.getAxisFnByOrientation)(orientation);
      var axis = this._setAxisLabels(axisFn(scale));

      (0, _animationUtils.applyTransition)(this.props, selectedLabels).call(this._setAxisLabels(axis));
      (0, _animationUtils.applyTransition)(this.props, selectedTicks).call(this._setAxisTicks(axis));

      var selectedText = selectedLabels.selectAll('text');
      this._setOrientationLabels(selectedText);
    }
  }, {
    key: '_getScaleDistance',
    value: function _getScaleDistance(attr) {
      var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(this.props, attr);
      return scaleObject ? scaleObject.distance : 0;
    }
  }, {
    key: 'calculateWidth',
    value: function calculateWidth() {
      var distance = this._getScaleDistance('x');
      return distance / 2 * 0.95;
    }
  }, {
    key: 'getPositionX',
    value: function getPositionX(value) {
      var x = (0, _scalesUtils.getAttributeFunctor)(this.props, 'x');
      return x(value);
    }
  }, {
    key: '_setOrientationLabels',
    value: function _setOrientationLabels(text) {
      var _this2 = this;

      var orientationText = this.props.orientationText;


      text.attr("fill", "currentColor");

      if (!orientationText) return;

      var ticks = this.refs.labels.childNodes;
      (0, _lodash.forEach)(ticks, function (item, index) {
        if (item.classList.contains('tick')) {
          var transform = item.getAttribute('transform');
          var leftTransform = transform.match(/\((([0-9]*[.])?[0-9]+),/gmi)[0];
          leftTransform = parseFloat((0, _lodash.trim)(leftTransform, '(,'));

          if (index === 1) {
            _this2.firstTickPositionLeft = leftTransform;
          }

          var newTransform = transform.replace(leftTransform, leftTransform - _this2.firstTickPositionLeft);
          item.setAttribute('transform', newTransform);
        }
      });

      text.attr("transform", "rotate(270)").attr("dy", 0).attr("x", TOP_FROM_XAXIS).attr("y", this.calculateWidth() + HEIGHT_FONT_CONTAINER / 2).style("text-anchor", "end");
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._render();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var title = _props4.title;
      var left = _props4.left;
      var top = _props4.top;
      var className = _props4.className;

      var hasTitle = title && title !== '';
      return _react2.default.createElement(
        'g',
        { className: 'rv-xy-plot__axis ' + className,
          transform: 'translate(' + left + ',' + top + ')',
          ref: 'container' },
        _react2.default.createElement('g', {
          ref: 'labels',
          className: 'rv-xy-plot__axis__labels' }),
        false ? _react2.default.createElement('g', {
          ref: 'ticks',
          className: 'rv-xy-plot__axis__ticks'
        }) : null,
        hasTitle ? _react2.default.createElement(
          'g',
          {
            className: 'rv-xy-plot__axis__title',
            style: this.props.titleStyle },
          _react2.default.createElement(
            'text',
            null,
            title
          )
        ) : null
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        title: _react2.default.PropTypes.string,
        classSet: _react2.default.PropTypes.object,
        attr: _react2.default.PropTypes.string.isRequired,
        orientation: _react2.default.PropTypes.oneOf(_axisUtils.AXIS_ORIENTATIONS),
        labelFormat: _react2.default.PropTypes.func,
        labelValues: _react2.default.PropTypes.array,
        tickValues: _react2.default.PropTypes.array,
        ticksTotal: _react2.default.PropTypes.number,
        tickSize: _react2.default.PropTypes.number,
        animation: _animationUtils.AnimationPropType
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        tickSize: _theme.DEFAULT_TICK_SIZE
      };
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);
  return Axis;
}(_pureRenderComponent2.default);

Axis.displayName = 'Axis';

exports.default = Axis;