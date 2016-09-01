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

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _seriesUtils = require('../utils/series-utils');

var _chartUtils = require('../utils/chart-utils');

var _theme = require('../theme');

var _animationUtils = require('../utils/animation-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ATTRIBUTES = ['x', 'y', 'color', 'fill', 'stroke', 'opacity', 'size']; // Copyright (c) 2016 Uber Technologies, Inc.
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

var XYPlot = function (_React$Component) {
  (0, _inherits3.default)(XYPlot, _React$Component);
  (0, _createClass3.default)(XYPlot, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired,
        margin: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.shape({
          left: _react2.default.PropTypes.number,
          top: _react2.default.PropTypes.number,
          right: _react2.default.PropTypes.number,
          bottom: _react2.default.PropTypes.number
        }), _react2.default.PropTypes.number]),
        onMouseLeave: _react2.default.PropTypes.func,
        onMouseMove: _react2.default.PropTypes.func,
        onMouseEnter: _react2.default.PropTypes.func,
        animation: _animationUtils.AnimationPropType,
        stackBy: _react2.default.PropTypes.oneOf(ATTRIBUTES)
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        margin: {
          left: 40,
          right: 10,
          top: 10,
          bottom: 40
        }
      };
    }
  }]);

  function XYPlot(props) {
    (0, _classCallCheck3.default)(this, XYPlot);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(XYPlot).call(this, props));

    _this._mouseLeaveHandler = _this._mouseLeaveHandler.bind(_this);
    _this._mouseEnterHandler = _this._mouseEnterHandler.bind(_this);
    _this._mouseMoveHandler = _this._mouseMoveHandler.bind(_this);
    var stackBy = props.stackBy;

    var children = (0, _seriesUtils.getSeriesChildren)(props.children);
    var data = (0, _seriesUtils.getStackedData)(children, stackBy);
    _this.state = {
      scaleMixins: _this._getScaleMixins(data, props),
      data: data
    };
    return _this;
  }

  (0, _createClass3.default)(XYPlot, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var children = (0, _seriesUtils.getSeriesChildren)(nextProps.children);
      var nextData = (0, _seriesUtils.getStackedData)(children, nextProps.stackBy);
      var scaleMixins = this.state.scaleMixins;

      var nextScaleMixins = this._getScaleMixins(nextData, nextProps);
      if (!(0, _deepEqual2.default)(nextScaleMixins, scaleMixins)) {
        this.setState({
          scaleMixins: nextScaleMixins,
          data: nextData
        });
      }
    }

    /**
     * Trigger movement-related callbacks if they are available.
     * @param {React.SyntheticEvent} event Mouse move event.
     * @private
     */

  }, {
    key: '_mouseMoveHandler',
    value: function _mouseMoveHandler(event) {
      var _this2 = this;

      var _props = this.props;
      var onMouseMove = _props.onMouseMove;
      var children = _props.children;

      if (onMouseMove) {
        onMouseMove(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this2.refs['series' + index];
        if (component && component.onParentMouseMove) {
          component.onParentMouseMove(event);
        }
      });
    }

    /**
     * Trigger onMouseLeave handler if it was passed in props.
     * @param {Event} event Native event.
     * @private
     */

  }, {
    key: '_mouseLeaveHandler',
    value: function _mouseLeaveHandler(event) {
      var onMouseLeave = this.props.onMouseLeave;

      if (onMouseLeave) {
        onMouseLeave({ event: event });
      }
    }

    /**
     * Trigger onMouseEnter handler if it was passed in props.
     * @param {Event} event Native event.
     * @private
     */

  }, {
    key: '_mouseEnterHandler',
    value: function _mouseEnterHandler(event) {
      var onMouseEnter = this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter({ event: event });
      }
    }

    /**
     * Get the list of scale-related settings that should be applied by default.
     * @param {Object} props Object of props.
     * @returns {Object} Defaults.
     * @private
     */

  }, {
    key: '_getScaleDefaults',
    value: function _getScaleDefaults(props) {
      var _getInnerDimensions = (0, _chartUtils.getInnerDimensions)(props);

      var innerWidth = _getInnerDimensions.innerWidth;
      var innerHeight = _getInnerDimensions.innerHeight;

      return {
        xRange: [0, innerWidth],
        yRange: [innerHeight, 0],
        colorRange: _theme.CONTINUOUS_COLOR_RANGE,
        opacityRange: _theme.OPACITY_RANGE,
        sizeRange: _theme.SIZE_RANGE
      };
    }

    /**
     * Get the map of scales from the props, apply defaults to them and then pass
     * them further.
     * @param {Object} data Array of all data.
     * @param {Object} props Props of the component.
     * @returns {Object} Map of scale-related props.
     * @private
     */

  }, {
    key: '_getScaleMixins',
    value: function _getScaleMixins(data, props) {
      var attrProps = {};
      var defaults = this._getScaleDefaults(props);
      var children = (0, _seriesUtils.getSeriesChildren)(props.children);
      Object.keys(props).forEach(function (key) {
        var attr = ATTRIBUTES.find(function (a) {
          return key.indexOf(a) === 0 || key.indexOf('_' + a) === 0;
        });
        if (!attr) {
          return;
        }
        attrProps[key] = props[key];
      });

      var zeroBaseProps = {};
      var adjustBy = new Set();
      var adjustWhat = new Set();
      children.forEach(function (child, index) {
        if (!child || !data[index]) {
          return;
        }
        ATTRIBUTES.forEach(function (attr) {
          var _child$type$getParent = child.type.getParentConfig(attr, child.props);

          var isDomainAdjustmentNeeded = _child$type$getParent.isDomainAdjustmentNeeded;
          var zeroBaseValue = _child$type$getParent.zeroBaseValue;

          if (isDomainAdjustmentNeeded) {
            adjustBy.add(attr);
            adjustWhat.add(index);
          }
          if (zeroBaseValue) {
            zeroBaseProps[attr + 'BaseValue'] = 0;
          }
        });
      });

      return (0, _extends3.default)({}, defaults, zeroBaseProps, attrProps, {
        _allData: data,
        _adjustBy: Array.from(adjustBy),
        _adjustWhat: Array.from(adjustWhat),
        _stackBy: props.stackBy
      });
    }

    /**
     * Checks if the plot is empty or not.
     * Currently checks the data only.
     * @returns {boolean} True for empty.
     * @private
     */

  }, {
    key: '_isPlotEmpty',
    value: function _isPlotEmpty() {
      var data = this.state.data;

      return !data || !data.length || !data.some(function (series) {
        return series && series.some(function (d) {
          return d;
        });
      });
    }

    /**
     * Prepare the child components (including series) for rendering.
     * @returns {Array} Array of child components.
     * @private
     */

  }, {
    key: '_getClonedChildComponents',
    value: function _getClonedChildComponents() {
      var animation = this.props.animation;
      var _state = this.state;
      var scaleMixins = _state.scaleMixins;
      var data = _state.data;

      var dimensions = (0, _chartUtils.getInnerDimensions)(this.props);
      var children = _react2.default.Children.toArray(this.props.children);
      var seriesProps = (0, _seriesUtils.getSeriesPropsFromChildren)(children);
      return children.map(function (child, index) {
        var dataProps = null;
        if (seriesProps[index]) {
          // Get the index of the series in the list of props and retrieve
          // the data property from it.
          var seriesIndex = seriesProps[index].seriesIndex;

          dataProps = { data: data[seriesIndex] };
        }
        return _react2.default.cloneElement(child, (0, _extends3.default)({}, dimensions, {
          animation: animation
        }, seriesProps[index], scaleMixins, child.props, dataProps));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;


      if (this._isPlotEmpty()) {
        return _react2.default.createElement('div', {
          className: 'rv-xy-plot',
          style: {
            width: width + 'px',
            height: height + 'px'
          } });
      }
      var components = this._getClonedChildComponents();

      return _react2.default.createElement(
        'div',
        {
          style: {
            width: width + 'px',
            height: height + 'px'
          },
          className: 'rv-xy-plot' },
        _react2.default.createElement(
          'svg',
          {
            className: 'rv-xy-plot__inner',
            width: width,
            height: height,
            onMouseMove: this._mouseMoveHandler,
            onMouseLeave: this._mouseLeaveHandler,
            onMouseEnter: this._mouseEnterHandler },
          components.filter(function (c) {
            return c && c.type.requiresSVG;
          })
        ),
        components.filter(function (c) {
          return c && !c.type.requiresSVG;
        })
      );
    }
  }]);
  return XYPlot;
}(_react2.default.Component);

XYPlot.displayName = 'XYPlot';

exports.default = XYPlot;