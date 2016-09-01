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

var _d3Hierarchy = require('d3-hierarchy');

var d3Hierarchy = _interopRequireWildcard(_d3Hierarchy);

var _d3Color = require('d3-color');

var d3Color = _interopRequireWildcard(_d3Color);

var _animationUtils = require('../utils/animation-utils');

var _scalesUtils = require('../utils/scales-utils');

var _theme = require('../theme');

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

var TREEMAP_TILE_MODES = {
  squarify: d3Hierarchy.treemapSquarify,
  slice: d3Hierarchy.treemapSlice,
  dice: d3Hierarchy.treemapDice,
  slicedice: d3Hierarchy.treemapSliceDice
};

function getFontColorFromBackground(background) {
  if (background) {
    return d3Color.hsl(background).l > 0.57 ? '#222' : '#fff';
  }
  return null;
}

var Treemap = function (_React$Component) {
  (0, _inherits3.default)(Treemap, _React$Component);
  (0, _createClass3.default)(Treemap, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired,
        data: _react2.default.PropTypes.object.isRequired,
        mode: _react2.default.PropTypes.oneOf(Object.keys(TREEMAP_TILE_MODES)),
        padding: _react2.default.PropTypes.number.isRequired,
        animation: _animationUtils.AnimationPropType
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        mode: 'squarify',
        padding: 1,
        data: {
          children: []
        },
        colorRange: _theme.CONTINUOUS_COLOR_RANGE,
        _colorValue: _theme.DEFAULT_COLOR,
        opacityRange: _theme.OPACITY_RANGE,
        _opacityValue: 1
      };
    }
  }]);

  function Treemap(props) {
    (0, _classCallCheck3.default)(this, Treemap);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Treemap).call(this, props));

    _this._renderLeaf = _this._renderLeaf.bind(_this);
    _this.state = { scales: _this._getScaleFns(props) };
    return _this;
  }

  (0, _createClass3.default)(Treemap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({ scales: this._getScaleFns(props) });
    }

    /**
     * Get the map of scale functions from the given props.
     * @param {Object} props Props for the component.
     * @returns {Object} Map of scale functions.
     * @private
     */

  }, {
    key: '_getScaleFns',
    value: function _getScaleFns(props) {
      var data = props.data;

      // Adding _allData property to the object to reuse the existing
      // getAttributeFunctor function.

      var compatibleProps = (0, _extends3.default)({}, props, {
        _allData: data.children || []
      });
      return {
        opacity: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'opacity'),
        color: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'color')
      };
    }

    /**
     * Create the list of nodes to render.
     * @returns {Array} Array of nodes.
     * @private
     */

  }, {
    key: '_getNodesToRender',
    value: function _getNodesToRender() {
      var _props = this.props;
      var data = _props.data;
      var height = _props.height;
      var width = _props.width;
      var mode = _props.mode;
      var padding = _props.padding;


      if (data) {
        var tileFn = TREEMAP_TILE_MODES[mode];
        return d3Hierarchy.treemap(tileFn).tile(d3Hierarchy.treemapSquarify).size([width, height]).padding(padding)(d3Hierarchy.hierarchy(data).sort(function (a, b) {
          return a.size - b.size;
        }).sum(function (d) {
          return d.size;
        })).descendants();
      }
      return [];
    }
  }, {
    key: '_renderLeaf',
    value: function _renderLeaf(node, i) {
      if (!i) {
        return null;
      }
      var scales = this.state.scales;


      var background = scales.color(node);
      var opacity = scales.opacity(node);
      var color = getFontColorFromBackground(background);
      var x0 = node.x0;
      var x1 = node.x1;
      var y0 = node.y0;
      var y1 = node.y1;
      var title = node.data.title;


      var style = (0, _animationUtils.getCSSAnimation)(this.props, {
        top: y0 + 'px',
        left: x0 + 'px',
        width: x1 - x0 + 'px',
        height: y1 - y0 + 'px',
        background: background,
        opacity: opacity,
        color: color
      });
      return _react2.default.createElement(
        'div',
        {
          key: i,
          className: 'rv-treemap__leaf',
          style: style },
        _react2.default.createElement(
          'div',
          { className: 'rv-treemap__leaf__content' },
          title
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;

      var nodes = this._getNodesToRender();
      return _react2.default.createElement(
        'div',
        {
          className: 'rv-treemap',
          style: {
            width: width + 'px',
            height: height + 'px'
          } },
        nodes.map(this._renderLeaf)
      );
    }
  }]);
  return Treemap;
}(_react2.default.Component);

Treemap.displayName = 'Treemap';

exports.default = Treemap;