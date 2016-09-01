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

var LineOneSeries = function (_AbstractSeries) {
  (0, _inherits3.default)(LineOneSeries, _AbstractSeries);

  function LineOneSeries() {
    (0, _classCallCheck3.default)(this, LineOneSeries);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(LineOneSeries).apply(this, arguments));
  }

  (0, _createClass3.default)(LineOneSeries, [{
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
      var container = (0, _reactUtils.getDOMNode)(this.refs.container);
      var _props = this.props;
      var _stackBy = _props._stackBy;
      var data = _props.data;
      var lineSizeAttr = _props.lineSizeAttr;
      var valuePosAttr = _props.valuePosAttr;
      var linePosAttr = _props.linePosAttr;
      var innerHeight = _props.innerHeight;
      var valueSizeAttr = _props.valueSizeAttr;
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

      var rects = d3Selection.select(container).selectAll('line').data(data).on('mouseover', this._mouseOverWithValue).on('mouseout', this._mouseOutWithValue).on('click', this._clickWithValue);

      var itemSize = distance / 2 * 0.85;
      this._applyTransition(rects).style('opacity', this._getAttributeFunctor('opacity')).style('stroke', this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color')).attr("x1", function (d) {
        return lineFunctor(d) - itemSize + itemSize * 2 / sameTypeTotal * sameTypeIndex;
      }).attr("x2", function (d) {
        return lineFunctor(d) - itemSize + itemSize * 2 / sameTypeTotal * sameTypeIndex + itemSize * 2 / sameTypeTotal;
      }).attr("y1", function (d) {
        var t = Math.abs(-value0Functor(d) + valueFunctor(d));
        var t1 = Math.max(value0Functor(d), valueFunctor(d));
        return innerHeight - t;
      }).attr("y2", function (d) {
        var t = Math.abs(-value0Functor(d) + valueFunctor(d));
        var t1 = Math.max(value0Functor(d), valueFunctor(d));
        return innerHeight - t;
      });
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
          ref: 'container'
          // marginleft increment because we decrement width line for axises
          , transform: 'translate(' + (marginLeft + 1) + ',' + marginTop + ')' },
        data.map(function (d, i) {
          return _react2.default.createElement('line', { style: { opacity: 0 }, key: i });
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
        valueSizeAttr: _react2.default.PropTypes.string
      });
    }
  }]);
  return LineOneSeries;
}(_abstractSeries2.default);

LineOneSeries.displayName = 'LineOneSeries';

exports.default = LineOneSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvbGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7OztBQUNBOztJQUFZLFc7O0FBRVo7Ozs7QUFDQTs7Ozs7O0FBeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQVFNLGE7Ozs7Ozs7Ozs7d0NBWWdCO0FBQ2xCLFdBQUssYUFBTDtBQUNEOzs7eUNBRW9CO0FBQ25CLFdBQUssYUFBTDtBQUNEOzs7b0NBRWU7QUFDZCxVQUFNLFlBQVksNEJBQVcsS0FBSyxJQUFMLENBQVUsU0FBckIsQ0FBbEI7QUFEYyxtQkFTSyxLQUFLLEtBVFY7QUFBQSxVQUdaLFFBSFksVUFHWixRQUhZO0FBQUEsVUFJWixJQUpZLFVBSVosSUFKWTtBQUFBLFVBS1osWUFMWSxVQUtaLFlBTFk7QUFBQSxVQU1aLFlBTlksVUFNWixZQU5ZO0FBQUEsVUFPWixXQVBZLFVBT1osV0FQWTtBQUFBLFVBUVosV0FSWSxVQVFaLFdBUlk7QUFBQSxVQVNaLGFBVFksVUFTWixhQVRZO0FBQUEsb0JBYVMsS0FBSyxLQWJkO0FBQUEsMENBWVosYUFaWTtBQUFBLFVBWVosYUFaWSx5Q0FZSSxDQVpKO0FBQUEsMENBYVosYUFiWTtBQUFBLFVBYVosYUFiWSx5Q0FhSSxDQWJKOzs7QUFlZCxVQUFJLENBQUMsSUFBRCxJQUFTLENBQUMsS0FBSyxNQUFuQixFQUEyQjtBQUN6QjtBQUNEOztBQUVELFVBQU0sV0FBVyxLQUFLLGlCQUFMLENBQXVCLFdBQXZCLENBQWpCO0FBQ0EsVUFBTSxjQUFjLEtBQUssb0JBQUwsQ0FBMEIsV0FBMUIsQ0FBcEI7QUFDQSxVQUFNLGVBQWUsS0FBSyxvQkFBTCxDQUEwQixZQUExQixDQUFyQjtBQUNBLFVBQU0sZ0JBQWdCLEtBQUss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dCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBkM1NlbGVjdGlvbiBmcm9tICdkMy1zZWxlY3Rpb24nO1xuXG5pbXBvcnQgQWJzdHJhY3RTZXJpZXMgZnJvbSAnLi9hYnN0cmFjdC1zZXJpZXMnO1xuaW1wb3J0IHtnZXRET01Ob2RlfSBmcm9tICcuLi8uLi91dGlscy9yZWFjdC11dGlscyc7XG5cbmNsYXNzIExpbmVPbmVTZXJpZXMgZXh0ZW5kcyBBYnN0cmFjdFNlcmllcyB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLiBBYnN0cmFjdFNlcmllcy5wcm9wVHlwZXMsXG4gICAgICBsaW5lUG9zQXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHZhbHVlUG9zQXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGxpbmVTaXplQXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHZhbHVlU2l6ZUF0dHI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fdXBkYXRlU2VyaWVzKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fdXBkYXRlU2VyaWVzKCk7XG4gIH1cblxuICBfdXBkYXRlU2VyaWVzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGdldERPTU5vZGUodGhpcy5yZWZzLmNvbnRhaW5lcik7XG4gICAgY29uc3Qge1xuICAgICAgX3N0YWNrQnksXG4gICAgICBkYXRhLFxuICAgICAgbGluZVNpemVBdHRyLFxuICAgICAgdmFsdWVQb3NBdHRyLFxuICAgICAgbGluZVBvc0F0dHIsXG4gICAgICBpbm5lckhlaWdodCxcbiAgICAgIHZhbHVlU2l6ZUF0dHJ9ID0gdGhpcy5wcm9wcztcblxuICAgIGxldCB7XG4gICAgICBzYW1lVHlwZVRvdGFsID0gMSxcbiAgICAgIHNhbWVUeXBlSW5kZXggPSAwfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWRhdGEgfHwgIWRhdGEubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLl9nZXRTY2FsZURpc3RhbmNlKGxpbmVQb3NBdHRyKTtcbiAgICBjb25zdCBsaW5lRnVuY3RvciA9IHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IobGluZVBvc0F0dHIpO1xuICAgIGNvbnN0IHZhbHVlRnVuY3RvciA9IHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IodmFsdWVQb3NBdHRyKTtcbiAgICBjb25zdCB2YWx1ZTBGdW5jdG9yID0gdGhpcy5fZ2V0QXR0cjBGdW5jdG9yKHZhbHVlUG9zQXR0cik7XG5cbiAgICBpZiAoX3N0YWNrQnkgPT09IHZhbHVlUG9zQXR0cikge1xuICAgICAgc2FtZVR5cGVUb3RhbCA9IDE7XG4gICAgICBzYW1lVHlwZUluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBjb25zdCByZWN0cyA9IGQzU2VsZWN0aW9uLnNlbGVjdChjb250YWluZXIpLnNlbGVjdEFsbCgnbGluZScpXG4gICAgICAuZGF0YShkYXRhKVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCB0aGlzLl9tb3VzZU92ZXJXaXRoVmFsdWUpXG4gICAgICAub24oJ21vdXNlb3V0JywgdGhpcy5fbW91c2VPdXRXaXRoVmFsdWUpXG4gICAgICAub24oJ2NsaWNrJywgdGhpcy5fY2xpY2tXaXRoVmFsdWUpO1xuXG4gICAgY29uc3QgaXRlbVNpemUgPSAoZGlzdGFuY2UgLyAyKSAqIDAuODU7XG4gICAgdGhpcy5fYXBwbHlUcmFuc2l0aW9uKHJlY3RzKVxuICAgICAgLnN0eWxlKCdvcGFjaXR5JywgdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3Rvcignb3BhY2l0eScpKVxuICAgICAgLnN0eWxlKCdzdHJva2UnLCB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdzdHJva2UnKSB8fFxuICAgICAgICB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdjb2xvcicpKVxuICAgICAgLmF0dHIoXCJ4MVwiLCBkID0+IGxpbmVGdW5jdG9yKGQpIC0gaXRlbVNpemUgKyAoaXRlbVNpemUgKiAyIC8gc2FtZVR5cGVUb3RhbCAqIHNhbWVUeXBlSW5kZXgpKVxuICAgICAgLmF0dHIoXCJ4MlwiLCBkID0+IGxpbmVGdW5jdG9yKGQpIC0gaXRlbVNpemUgKyAoaXRlbVNpemUgKiAyIC8gc2FtZVR5cGVUb3RhbCAqIHNhbWVUeXBlSW5kZXgpICsgKGl0ZW1TaXplICogMiAvIHNhbWVUeXBlVG90YWwpKVxuICAgICAgLmF0dHIoXCJ5MVwiLCBkID0+IHtcbiAgICAgICAgdmFyIHQgPSBNYXRoLmFicygtdmFsdWUwRnVuY3RvcihkKSArIHZhbHVlRnVuY3RvcihkKSk7XG4gICAgICAgIHZhciB0MSA9IE1hdGgubWF4KHZhbHVlMEZ1bmN0b3IoZCksIHZhbHVlRnVuY3RvcihkKSk7XG4gICAgICAgIHJldHVybiBpbm5lckhlaWdodCAtIHQ7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5MlwiLCBkID0+IHtcbiAgICAgICAgdmFyIHQgPSBNYXRoLmFicygtdmFsdWUwRnVuY3RvcihkKSArIHZhbHVlRnVuY3RvcihkKSk7XG4gICAgICAgIHZhciB0MSA9IE1hdGgubWF4KHZhbHVlMEZ1bmN0b3IoZCksIHZhbHVlRnVuY3RvcihkKSk7XG4gICAgICAgIHJldHVybiBpbm5lckhlaWdodCAtIHQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZGF0YSwgbWFyZ2luTGVmdCwgbWFyZ2luVG9wfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxnXG4gICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RfX3NlcmllcyBydi14eS1wbG90X19zZXJpZXMtLWJhclwiXG4gICAgICAgIHJlZj1cImNvbnRhaW5lclwiXG4gICAgICAgIC8vIG1hcmdpbmxlZnQgaW5jcmVtZW50IGJlY2F1c2Ugd2UgZGVjcmVtZW50IHdpZHRoIGxpbmUgZm9yIGF4aXNlc1xuICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW5MZWZ0ICsgMX0sJHttYXJnaW5Ub3B9KWB9PlxuICAgICAgICB7ZGF0YS5tYXAoKGQsIGkpID0+IDxsaW5lIHN0eWxlPXt7b3BhY2l0eTogMH19IGtleT17aX0vPil9XG4gICAgICA8L2c+XG4gICAgKTtcbiAgfVxufVxuXG5MaW5lT25lU2VyaWVzLmRpc3BsYXlOYW1lID0gJ0xpbmVPbmVTZXJpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBMaW5lT25lU2VyaWVzO1xuIl19