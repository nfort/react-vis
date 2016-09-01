'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var d3Selection = _interopRequireWildcard(_d3Selection);

var _pureRenderComponent = require('../../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _scalesUtils = require('../../utils/scales-utils');

var _animationUtils = require('../../utils/animation-utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AbstractSeries = function (_PureRenderComponent) {
  (0, _inherits3.default)(AbstractSeries, _PureRenderComponent);
  (0, _createClass3.default)(AbstractSeries, null, [{
    key: 'propTypes',
    get: function get() {
      return (0, _extends3.default)({}, (0, _scalesUtils.getScalePropTypesByAttribute)('x'), (0, _scalesUtils.getScalePropTypesByAttribute)('y'), (0, _scalesUtils.getScalePropTypesByAttribute)('size'), (0, _scalesUtils.getScalePropTypesByAttribute)('opacity'), (0, _scalesUtils.getScalePropTypesByAttribute)('color'), {
        width: _react2.default.PropTypes.number,
        height: _react2.default.PropTypes.number,
        data: _react2.default.PropTypes.array,
        onValueMouseOver: _react2.default.PropTypes.func,
        onValueMouseOut: _react2.default.PropTypes.func,
        onValueClick: _react2.default.PropTypes.func,
        onSeriesMouseOver: _react2.default.PropTypes.func,
        onSeriesMouseOut: _react2.default.PropTypes.func,
        onSeriesClick: _react2.default.PropTypes.func,
        onNearestX: _react2.default.PropTypes.func,
        animation: _animationUtils.AnimationPropType
      });
    }
  }]);

  function AbstractSeries(props) {
    (0, _classCallCheck3.default)(this, AbstractSeries);

    /**
     * Mouse over handler for the series without single values.
     * @type {function}
     * @protected
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(AbstractSeries).call(this, props));

    _this._mouseOver = _this._mouseOverHandler.bind(_this, false);

    /**
     * Mouse over handler for the series **with** single values.
     * @type {function}
     * @protected
     */
    _this._mouseOverWithValue = _this._mouseOverHandler.bind(_this, true);

    /**
     * Mouse out handler for the series without single values.
     * @type {function}
     * @protected
     */
    _this._mouseOut = _this._mouseOutHandler.bind(_this, false);

    /**
     * Mouse out handler for the series **with** single values.
     * @type {function}
     * @protected
     */
    _this._mouseOutWithValue = _this._mouseOutHandler.bind(_this, true);

    /**
     * Click handler for the series without single values.
     * @type {function}
     * @protected
     */
    _this._click = _this._clickHandler.bind(_this, false);

    /**
     * Click handler for the series **with** single values.
     * @type {function}
     * @protected
     */
    _this._clickWithValue = _this._clickHandler.bind(_this, true);
    return _this;
  }

  /**
   * Mouse over handler for all series.
   * @param {boolean} useValue Use value handler if true.
   * @param {Object} d Value object
   * @private
   */


  (0, _createClass3.default)(AbstractSeries, [{
    key: '_mouseOverHandler',
    value: function _mouseOverHandler(useValue, d) {
      var _props = this.props;
      var onValueMouseOver = _props.onValueMouseOver;
      var onSeriesMouseOver = _props.onSeriesMouseOver;

      if (useValue && onValueMouseOver) {
        onValueMouseOver(d, { event: d3Selection.event });
      }
      if (onSeriesMouseOver) {
        onSeriesMouseOver({ event: d3Selection.event });
      }
    }

    /**
     * Mouse out handler for all series.
     * @param {boolean} useValue Use value handler if true.
     * @param {Object} d Value object
     * @private
     */

  }, {
    key: '_mouseOutHandler',
    value: function _mouseOutHandler(useValue, d) {
      var _props2 = this.props;
      var onValueMouseOut = _props2.onValueMouseOut;
      var onSeriesMouseOut = _props2.onSeriesMouseOut;

      if (useValue && onValueMouseOut) {
        onValueMouseOut(d, { event: d3Selection.event });
      }
      if (onSeriesMouseOut) {
        onSeriesMouseOut({ event: d3Selection.event });
      }
    }

    /**
     * Click handler for all series.
     * @param {boolean} useValue Use value handler if true.
     * @param {Object} d Value object
     * @private
     */

  }, {
    key: '_clickHandler',
    value: function _clickHandler(useValue, d) {
      var _props3 = this.props;
      var onValueClick = _props3.onValueClick;
      var onSeriesClick = _props3.onSeriesClick;

      if (useValue && onValueClick) {
        onValueClick(d, { event: d3Selection.event });
      }
      if (onSeriesClick) {
        onSeriesClick({ event: d3Selection.event });
      }
    }

    /**
     * Tells the rest of the world that it requires SVG to work.
     * @returns {boolean} Result.
     */

  }, {
    key: '_getAttributeFunctor',


    /**
     * Get attribute functor.
     * @param {string} attr Attribute name
     * @returns {*} Functor.
     * @protected
     */
    value: function _getAttributeFunctor(attr) {
      return (0, _scalesUtils.getAttributeFunctor)(this.props, attr);
    }

    /**
     * Get the attr0 functor.
     * @param {string} attr Attribute name.
     * @returns {*} Functor.
     * @private
     */

  }, {
    key: '_getAttr0Functor',
    value: function _getAttr0Functor(attr) {
      return (0, _scalesUtils.getAttr0Functor)(this.props, attr);
    }

    /**
     * Get the attribute value if it is available.
     * @param {string} attr Attribute name.
     * @returns {*} Attribute value if available, fallback value or undefined
     * otherwise.
     * @protected
     */

  }, {
    key: '_getAttributeValue',
    value: function _getAttributeValue(attr) {
      return (0, _scalesUtils.getAttributeValue)(this.props, attr);
    }

    /**
     * Get the scale object distance by the attribute from the list of properties.
     * @param {string} attr Attribute name.
     * @returns {number} Scale distance.
     * @protected
     */

  }, {
    key: '_getScaleDistance',
    value: function _getScaleDistance(attr) {
      var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(this.props, attr);
      return scaleObject ? scaleObject.distance : 0;
    }

    /**
     * Apply transition to the elements and return the new elements instead.
     * @param {d3.selection} elements Elements.
     * @returns {d3.selection} Animated elements if animation is available.
     * @protected
     */

  }, {
    key: '_applyTransition',
    value: function _applyTransition(elements) {
      return (0, _animationUtils.applyTransition)(this.props, elements);
    }
  }, {
    key: 'onParentMouseMove',
    value: function onParentMouseMove(event) {
      var _props4 = this.props;
      var _props4$marginLeft = _props4.marginLeft;
      var marginLeft = _props4$marginLeft === undefined ? 0 : _props4$marginLeft;
      var onNearestX = _props4.onNearestX;
      var data = _props4.data;

      if (!onNearestX || !data) {
        return;
      }
      var minDistance = Number.POSITIVE_INFINITY;
      var value = null;

      // TODO(antonb): WAT?
      d3Selection.event = event.nativeEvent;
      var coordinate = d3Selection.mouse(event.currentTarget)[0] - marginLeft;
      var xScaleFn = this._getAttributeFunctor('x');

      data.forEach(function (item) {
        var currentCoordinate = xScaleFn(item);
        var newDistance = Math.abs(coordinate - currentCoordinate);
        if (newDistance < minDistance) {
          minDistance = newDistance;
          value = item;
        }
      });
      if (!value) {
        return;
      }
      onNearestX(value, {
        innerX: xScaleFn(value),
        event: event.nativeEvent
      });
    }
  }], [{
    key: 'getParentConfig',


    /**
     * Get a default config for the parent.
     * @returns {Object} Empty config.
     */
    value: function getParentConfig() {
      return {};
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);
  return AbstractSeries;
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

exports.default = AbstractSeries;