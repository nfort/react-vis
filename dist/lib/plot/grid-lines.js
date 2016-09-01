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

var _pureRenderComponent = require('../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _reactUtils = require('../utils/react-utils');

var _scalesUtils = require('../utils/scales-utils');

var _axisUtils = require('../utils/axis-utils');

var _animationUtils = require('../utils/animation-utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridLines = function (_PureRenderComponent) {
  (0, _inherits3.default)(GridLines, _PureRenderComponent);

  function GridLines() {
    (0, _classCallCheck3.default)(this, GridLines);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(GridLines).apply(this, arguments));
  }

  (0, _createClass3.default)(GridLines, [{
    key: '_render',


    /**
     * Renders the grid lines in a given container.
     * @private
     */
    value: function _render() {
      var _props = this.props;
      var attr = _props.attr;
      var tickSize = _props.tickSize;
      var orientation = _props.orientation;
      var ticksTotal = _props.ticksTotal;
      var values = _props.values;

      var scale = (0, _scalesUtils.getAttributeScale)(this.props, attr);
      if (!scale) {
        return;
      }
      var container = d3Selection.select((0, _reactUtils.getDOMNode)(this.refs.container));
      var axisFn = (0, _axisUtils.getAxisFnByOrientation)(orientation);
      var axis = axisFn(scale).tickFormat('').tickSize(tickSize, 0, 0);
      if (!values) {
        axis.ticks(ticksTotal);
      } else {
        axis.tickValues(values);
      }
      (0, _animationUtils.applyTransition)(this.props, container).call(axis);
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
      var _props2 = this.props;
      var top = _props2.top;
      var left = _props2.left;
      var marginTop = _props2.marginTop;
      var marginLeft = _props2.marginLeft;

      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(' + marginLeft + ', ' + marginTop + ')',
          className: 'rv-xy-plot__grid-lines' },
        _react2.default.createElement('g', {
          ref: 'container',
          transform: 'translate(' + left + ', ' + top + ')' })
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        tickSize: _react2.default.PropTypes.number,
        ticksTotal: _react2.default.PropTypes.number,
        values: _react2.default.PropTypes.array,
        attr: _react2.default.PropTypes.string.isRequired,
        orientation: _react2.default.PropTypes.oneOf(_axisUtils.AXIS_ORIENTATIONS),
        top: _react2.default.PropTypes.number,
        left: _react2.default.PropTypes.number,
        marginTop: _react2.default.PropTypes.number,
        marginLeft: _react2.default.PropTypes.number,
        animation: _animationUtils.AnimationPropType
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        top: 0,
        left: 0
      };
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);
  return GridLines;
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

GridLines.displayName = 'GridLines';

exports.default = GridLines;