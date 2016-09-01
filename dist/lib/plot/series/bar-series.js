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

var _d3Selection = require('d3-selection');

var d3Selection = _interopRequireWildcard(_d3Selection);

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _reactUtils = require('../../utils/react-utils');

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

var BarSeries = function (_AbstractSeries) {
  (0, _inherits3.default)(BarSeries, _AbstractSeries);

  function BarSeries() {
    (0, _classCallCheck3.default)(this, BarSeries);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(BarSeries).apply(this, arguments));
  }

  (0, _createClass3.default)(BarSeries, [{
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
      var _this2 = this;

      var container = (0, _reactUtils.getDOMNode)(this.refs.container);
      var _props = this.props;
      var _stackBy = _props._stackBy;
      var data = _props.data;
      var lineSizeAttr = _props.lineSizeAttr;
      var valuePosAttr = _props.valuePosAttr;
      var linePosAttr = _props.linePosAttr;
      var valueSizeAttr = _props.valueSizeAttr;
      var beginPlotFromZeroCoordinate = _props.beginPlotFromZeroCoordinate;
      var _props2 = this.props;
      var _props2$sameTypeTotal = _props2.sameTypeTotal;
      var sameTypeTotal = _props2$sameTypeTotal === undefined ? 1 : _props2$sameTypeTotal;
      var _props2$sameTypeIndex = _props2.sameTypeIndex;
      var sameTypeIndex = _props2$sameTypeIndex === undefined ? 0 : _props2$sameTypeIndex;


      if (!data || !data.length) {
        return;
      }

      var distance = this._getScaleDistance(linePosAttr);
      var lineFunctor = this._getAttributeFunctor(linePosAttr);
      var valueFunctor = this._getAttributeFunctor(valuePosAttr);
      var value0Functor = this._getAttr0Functor(valuePosAttr);

      if (_stackBy === valuePosAttr) {
        sameTypeTotal = 1;
        sameTypeIndex = 0;
      }

      var rects = d3Selection.select(container).selectAll('rect').data(data).on('mouseover', this._mouseOverWithValue).on('mouseout', this._mouseOutWithValue).on('click', this._clickWithValue);

      var itemSize = distance / 2 * 0.95;
      var valueY = itemSize * 2 / sameTypeTotal;

      this._applyTransition(rects).style('opacity', this._getAttributeFunctor('opacity')).attr('fill', this._getAttributeFunctor('fill') || this._getAttributeFunctor('color')).attr(linePosAttr, function (d) {
        return lineFunctor(d) - itemSize + itemSize * 2 / sameTypeTotal * sameTypeIndex;
      }).attr(lineSizeAttr, valueY).attr(valuePosAttr, function (d) {
        return Math.min(value0Functor(d), valueFunctor(d));
      }).attr(valueSizeAttr, function (d, index, arr) {
        return _this2.calculateHeightRect(d, valueFunctor, value0Functor, index, arr);
      });
    }
  }, {
    key: 'calculatePosX',
    value: function calculatePosX(item, coordinateX) {
      var linePosAttr = this.props.linePosAttr;

      var lineFunctor = this._getAttributeFunctor(linePosAttr);
      return lineFunctor(item) - coordinateX;
    }
  }, {
    key: 'calculateHeightRect',
    value: function calculateHeightRect(coordinateArray, valueFunctor, value0Functor, index, arr) {
      var value = -value0Functor(coordinateArray) + valueFunctor(coordinateArray);
      if (this.props.negativeValueColor && this.props.positiveValueColor) {
        var currentRect = arr[index];
        if (value > 0) {
          currentRect.setAttribute('fill', this.props.negativeValueColor);
        } else {
          currentRect.setAttribute('fill', this.props.positiveValueColor);
        }
      }
      return Math.abs(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var data = _props3.data;
      var marginLeft = _props3.marginLeft;
      var marginTop = _props3.marginTop;

      if (!data) {
        return null;
      }
      return _react2.default.createElement(
        'g',
        {
          className: 'rv-xy-plot__series rv-xy-plot__series--bar',
          ref: 'container',
          transform: 'translate(' + marginLeft + ',' + marginTop + ')' },
        data.map(function (d, i) {
          return _react2.default.createElement('rect', { style: { opacity: 0 }, key: i });
        })
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return (0, _extends3.default)({}, _abstractSeries2.default.propTypes, {
        linePosAttr: _react2.default.PropTypes.string,
        valuePosAttr: _react2.default.PropTypes.string,
        lineSizeAttr: _react2.default.PropTypes.string,
        valueSizeAttr: _react2.default.PropTypes.string,
        beginPlotFromZeroCoordinate: _react2.default.PropTypes.bool,
        negativeValueColor: _react2.default.PropTypes.string,
        positiveValueColor: _react2.default.PropTypes.string
      });
    }
  }]);
  return BarSeries;
}(_abstractSeries2.default);

BarSeries.displayName = 'BarSeries';

exports.default = BarSeries;