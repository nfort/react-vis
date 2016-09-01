'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pureRenderComponent = require('../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _scalesUtils = require('../utils/scales-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Format title by detault.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */
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

// Отступ слева от линии пересечения
var PADDING_FROM_LINE_CROSSHAIR = 5;

var Crosshair = function (_PureRenderComponent) {
  (0, _inherits3.default)(Crosshair, _PureRenderComponent);

  function Crosshair() {
    (0, _classCallCheck3.default)(this, Crosshair);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Crosshair).apply(this, arguments));
  }

  (0, _createClass3.default)(Crosshair, [{
    key: '_getScaleDistance',


    /**
     * Get the scale object distance by the attribute from the list of properties.
     * @param {string} attr Attribute name.
     * @returns {number} Scale distance.
     * @protected
     */
    value: function _getScaleDistance(attr) {
      var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(this.props, attr);
      return scaleObject ? scaleObject.distance : 0;
    }

    /**
     * Render crosshair title.
     * @returns {*} Container with the crosshair title.
     * @private
     */

  }, {
    key: '_renderCrosshairTitle',
    value: function _renderCrosshairTitle() {
      var _props = this.props;
      var values = _props.values;
      var titleFormat = _props.titleFormat;

      var titleItem = titleFormat(values);
      if (!titleItem) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'rv-crosshair__title', key: 'title' },
        _react2.default.createElement(
          'span',
          { className: 'rv-crosshair__title__title' },
          titleItem.title
        ),
        ': ',
        _react2.default.createElement(
          'span',
          { className: 'rv-crosshair__title__value' },
          titleItem.value
        )
      );
    }

    /**
     * Render crosshair items (title + value for each series).
     * @returns {*} Array of React classes with the crosshair values.
     * @private
     */

  }, {
    key: '_renderCrosshairItems',
    value: function _renderCrosshairItems() {
      var _props2 = this.props;
      var values = _props2.values;
      var itemsFormat = _props2.itemsFormat;

      var items = itemsFormat(values);
      if (!items) {
        return null;
      }
      return items.filter(function (i) {
        return i;
      }).map(function renderValue(item, i) {
        return _react2.default.createElement(
          'div',
          { className: 'rv-crosshair__item', key: 'item' + i },
          _react2.default.createElement(
            'span',
            { className: 'rv-crosshair__item__title' },
            item.title
          ),
          ': ',
          _react2.default.createElement(
            'span',
            { className: 'rv-crosshair__item__value' },
            item.value
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var children = _props3.children;
      var values = _props3.values;
      var marginTop = _props3.marginTop;
      var marginLeft = _props3.marginLeft;
      var innerWidth = _props3.innerWidth;
      var hoverShow = _props3.hoverShow;
      var lineRight = _props3.lineRight;
      var innerHeight = _props3.innerHeight;

      var value = getFirstNonEmptyValue(values);
      if (!value) {
        return null;
      }

      var distance = this._getScaleDistance('x');
      var x = (0, _scalesUtils.getAttributeFunctor)(this.props, 'x');
      var innerLeft = x(value);
      var itemSize = distance / 2 * 0.95;

      var orientation = innerLeft > innerWidth / 2 ? 'left' : 'right';
      var leftInitial = marginLeft + innerLeft;
      var left = lineRight ? leftInitial + itemSize - PADDING_FROM_LINE_CROSSHAIR : leftInitial;
      var top = marginTop;
      var innerClassName = 'rv-crosshair__inner rv-crosshair__inner--' + orientation;

      var className = (0, _classnames2.default)('rv-crosshair', (0, _defineProperty3.default)({}, 'rv-crosshair--hover', hoverShow));

      return _react2.default.createElement(
        'div',
        {
          className: className,
          style: { left: left + 'px', top: top + 'px' } },
        _react2.default.createElement('div', {
          className: 'rv-crosshair__line',
          style: { height: innerHeight + 'px' } }),
        _react2.default.createElement(
          'div',
          { className: innerClassName },
          children ? children : _react2.default.createElement(
            'div',
            { className: 'rv-crosshair__inner__content' },
            _react2.default.createElement(
              'div',
              null,
              this._renderCrosshairTitle(),
              this._renderCrosshairItems()
            )
          )
        )
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
        titleFormat: _react2.default.PropTypes.func,
        hoverShow: _react2.default.PropTypes.bool,
        lineRight: _react2.default.PropTypes.bool
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        titleFormat: defaultTitleFormat,
        itemsFormat: defaultItemsFormat,
        hoverShow: false,
        lineRight: false
      };
    }
  }]);
  return Crosshair;
}(_pureRenderComponent2.default);

Crosshair.displayName = 'Crosshair';

exports.default = Crosshair;