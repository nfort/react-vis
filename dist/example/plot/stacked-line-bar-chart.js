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

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mockUtils = require('../../lib/utils/mock-utils');

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Example = function (_React$Component) {
  (0, _inherits3.default)(Example, _React$Component);

  function Example(props) {
    (0, _classCallCheck3.default)(this, Example);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Example).call(this, props));

    _this._labelFormatX = function () {
      var widthBar = _this.widthBar;
      var that = _this.props;
      var minWidthBar = 4;
      var maxWidthBar = 7;

      return function (value, index, arrayLabel) {
        if (index % 2 === 0 && widthBar > minWidthBar && widthBar < maxWidthBar) {
          return _this._getDateFormat(that.chart[index].xAxisLabel);
        } else if (widthBar > maxWidthBar) {
          return _this._getDateFormat(that.chart[index].xAxisLabel);
        }
      };
    };

    _this._getDateFormat = function (timestamp) {
      return _moment2.default.unix(timestamp).format('DD:MM');
    };

    _this._getDateFormatForCrosshair = function (timestamp) {
      return _moment2.default.unix(timestamp).format('DD.MM.YY, HH:MM');
    };

    _this._labelFormatY = function (value, index, arrayLabel) {
      if (value === 0) return;
      return (0, _numeral2.default)(value).format('0a').toUpperCase();
    };

    _this._formatCrosshairItems = function (values) {
      var index = values[0].x;
      var date = _this._getDateFormatForCrosshair(_this.props.chart[index].xAxisLabel);
      return [{
        title: 'Дата',
        value: date
      }];
    };

    _this._formatCrosshairTitleResult = function () {
      return {
        title: 'Откручено',
        value: _this.props.unscrewed + '%'
      };
    };

    _this._formatCrosshairItemsResult = function () {
      return [{
        title: 'Осталось',
        value: _this.props.leftDay + ' дней'
      }];
    };

    _this.state = {
      crosshairValues: []
    };
    _this._crosshairValues = [];

    _this._onMouseLeave = _this._onMouseLeave.bind(_this);
    _this._onNearestXs = [_this._onNearestX.bind(_this, 0), _this._onNearestX.bind(_this, 1)];

    _this.widthBar = (props.XYPlot.width - props.XYPlot.margin.left + props.XYPlot.margin.right) / props.chart.length - 2;
    return _this;
  }

  (0, _createClass3.default)(Example, [{
    key: '_onNearestX',


    /**
     * Event handler for onNearestX.
     * @param {number} seriesIndex Index of the series.
     * @param {Object} value Selected value.
     * @private
     */
    value: function _onNearestX(seriesIndex, value) {
      this._crosshairValues = this._crosshairValues.concat();
      this._crosshairValues[seriesIndex] = value;
      this.setState({ crosshairValues: this._crosshairValues });
    }
    /**
     * Event handler for onMouseLeave.
     * @private
     */

  }, {
    key: '_onMouseLeave',
    value: function _onMouseLeave() {
      this._crosshairValues = [];
      this.setState({ crosshairValues: this._crosshairValues });
    }
  }, {
    key: '_formatCrosshairTitle',
    value: function _formatCrosshairTitle(values) {
      var countClick = values.reduce(function (summary, item) {
        return summary + item.y;
      }, 0);
      return {
        title: 'Кликов',
        value: countClick
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _.XYPlot,
        (0, _extends3.default)({}, this.props.XYPlot, { onMouseLeave: this._onMouseLeave }),
        _react2.default.createElement(_.YAxis, { labelFormat: this._labelFormatY }),
        _react2.default.createElement(_.BackgroundPlot, {
          values: this.props.chart.map(function (item) {
            return item.xAxisLabel;
          }) }),
        _react2.default.createElement(_.HorizontalGridLines, null),
        _react2.default.createElement(_.BackgroundPlot, {
          plan: this.props.planClick }),
        _react2.default.createElement(_.VerticalBarSeries, {
          beginPlotFromZeroCoordinate: true,
          onNearestX: this._onNearestXs[0],
          data: this.props.chart.map(function (item) {
            return item.desktop;
          })
        }),
        _react2.default.createElement(_.VerticalBarSeries, {
          beginPlotFromZeroCoordinate: true,
          onNearestX: this._onNearestXs[1],
          data: this.props.chart.map(function (item) {
            return item.mobile;
          })
        }),
        _react2.default.createElement(_.XAxis, { orientationText: 'vertical',
          labelFormat: this._labelFormatX(),
          labelValues: this.props.chart.map(function (item, index) {
            return index;
          }) }),
        _react2.default.createElement(_.Crosshair, {
          itemsFormat: this._formatCrosshairItems,
          titleFormat: this._formatCrosshairTitle,
          values: this.state.crosshairValues }),
        _react2.default.createElement(_.Crosshair, { values: [{ x: this.props.timeMarker }],
          hoverShow: true,
          lineRight: true,
          itemsFormat: this._formatCrosshairItemsResult,
          titleFormat: this._formatCrosshairTitleResult })
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        XYPlot: {
          width: 720,
          height: 160,
          stackBy: 'y',
          margin: {
            left: 50,
            right: 10,
            top: 10,
            bottom: 50
          }
        },
        chart: (0, _mockUtils.getRandomSeriesData)(45),
        unscrewed: 20,
        leftDay: 12,
        timeMarker: 12,
        planClick: 25000
      };
    }
  }]);
  return Example;
}(_react2.default.Component); // Copyright (c) 2016 Uber Technologies, Inc.
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

exports.default = Example;