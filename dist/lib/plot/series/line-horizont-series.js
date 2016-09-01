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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvbGluZS1ob3Jpem9udC1zZXJpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7SUFBWSxXOztBQUVaOzs7O0FBQ0E7Ozs7OztBQXhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFRTSxhOzs7Ozs7Ozs7O3dDQVlnQjtBQUNsQixXQUFLLGFBQUw7QUFDRDs7O3lDQUVvQjtBQUNuQixXQUFLLGFBQUw7QUFDRDs7O29DQUVlO0FBQ2QsVUFBTSxZQUFZLDRCQUFXLEtBQUssSUFBTCxDQUFVLFNBQXJCLENBQWxCO0FBRGMsbUJBU0ssS0FBSyxLQVRWO0FBQUEsVUFHWixRQUhZLFVBR1osUUFIWTtBQUFBLFVBSVosSUFKWSxVQUlaLElBSlk7QUFBQSxVQUtaLFlBTFksVUFLWixZQUxZO0FBQUEsVUFNWixZQU5ZLFVBTVosWUFOWTtBQUFBLFVBT1osV0FQWSxVQU9aLFdBUFk7QUFBQSxVQVFaLFdBUlksVUFRWixXQVJZO0FBQUEsVUFTWixhQVRZLFVBU1osYUFUWTtBQUFBLG9CQWFTLEtBQUssS0FiZDtBQUFBLDBDQVlaLGFBWlk7QUFBQSxVQVlaLGFBWlkseUNBWUksQ0FaSjtBQUFBLDBDQWFaLGFBYlk7QUFBQSxVQWFaLGFBYlkseUNBYUksQ0FiSjs7O0FBZWQsVUFBSSxDQUFDLElBQUQsSUFBUyxDQUFDLEtBQUssTUFBbkIsRUFBMkI7QUFDekI7QUFDRDs7QUFFRCxVQUFNLFdBQVcsS0FBSyxpQkFBTCxDQUF1QixXQUF2QixDQUFqQjtBQUNBLFVBQU0sY0FBYyxLQUFLLG9CQUFMLENBQTBCLFdBQTFCLENBQXBCO0FBQ0EsVUFBTSxlQUFlLEtBQUssb0JBQUwsQ0FBMEIsWUFBMUIsQ0FBckI7QUFDQSxVQUFNLGdCQUFnQixLQUFLLGdCQUFMLENBQXNCLFlBQXRCLENBQXRCOztBQUVBLFVBQUksYUFBYSxZQUFqQixFQUErQjtBQUM3Qix3QkFBZ0IsQ0FBaEI7QUFDQSx3QkFBZ0IsQ0FBaEI7QUFDRDs7QUFFRCxVQUFNLFFBQVEsWUFBWSxNQUFaLENBQW1CLFNBQW5CLEVBQThCLFNBQTlCLENBQXdDLE1BQXhDLEVBQ1gsSUFEVyxDQUNOLElBRE0sRUFFWCxFQUZXLENBRVIsV0FGUSxFQUVLLEtBQUssbUJBRlYsRUFHWCxFQUhXLENBR1IsVUFIUSxFQUdJLEtBQUssa0JBSFQsRUFJWCxFQUpXLENBSVIsT0FKUSxFQUlDLEtBQUssZUFKTixDQUFkOztBQU1BLFVBQU0sV0FBWSxXQUFXLENBQVosR0FBaUIsSUFBbEM7QUFDQSxXQUFLLGdCQUFMLENBQXNCLEtBQXRCLEVBQ0csS0FESCxDQUNTLFNBRFQsRUFDb0IsS0FBSyxvQkFBTCxDQUEwQixTQUExQixDQURwQixFQUVHLEtBRkgsQ0FFUyxRQUZULEVBRW1CLEtBQUssb0JBQUwsQ0FBMEIsUUFBMUIsS0FDZixLQUFLLG9CQUFMLENBQTBCLE9BQTFCLENBSEosRUFJRyxJQUpILENBSVEsSUFKUixFQUljO0FBQUEsZUFBSyxZQUFZLENBQVosSUFBaUIsUUFBakIsR0FBNkIsV0FBVyxDQUFYLEdBQWUsYUFBZixHQUErQixhQUFqRTtBQUFBLE9BSmQsRUFLRyxJQUxILENBS1EsSUFMUixFQUtjO0FBQUEsZUFBSyxZQUFZLENBQVosSUFBaUIsUUFBakIsR0FBNkIsV0FBVyxDQUFYLEdBQWUsYUFBZixHQUErQixhQUE1RCxHQUE4RSxXQUFXLENBQVgsR0FBZSxhQUFsRztBQUFBLE9BTGQsRUFNRyxJQU5ILENBTVEsSUFOUixFQU1jLGFBQUs7QUFDZixZQUFJLElBQUksS0FBSyxHQUFMLENBQVMsQ0FBQyxjQUFjLENBQWQsQ0FBRCxHQUFvQixhQUFhLENBQWIsQ0FBN0IsQ0FBUjtBQUNBLFlBQUksS0FBSyxLQUFLLEdBQUwsQ0FBUyxjQUFjLENBQWQsQ0FBVCxFQUEyQixhQUFhLENBQWIsQ0FBM0IsQ0FBVDtBQUNBLGVBQU8sY0FBYyxDQUFyQjtBQUNELE9BVkgsRUFXRyxJQVhILENBV1EsSUFYUixFQVdjLGFBQUs7QUFDZixZQUFJLElBQUksS0FBSyxHQUFMLENBQVMsQ0FBQyxjQUFjLENBQWQsQ0FBRCxHQUFvQixhQUFhLENBQWIsQ0FBN0IsQ0FBUjtBQUNBLFlBQUksS0FBSyxLQUFLLEdBQUwsQ0FBUyxjQUFjLENBQWQsQ0FBVCxFQUEyQixhQUFhLENBQWIsQ0FBM0IsQ0FBVDtBQUNBLGVBQU8sY0FBYyxDQUFyQjtBQUNELE9BZkg7QUFnQkQ7Ozs2QkFFUTtBQUFBLG9CQUMrQixLQUFLLEtBRHBDO0FBQUEsVUFDQSxJQURBLFdBQ0EsSUFEQTtBQUFBLFVBQ00sVUFETixXQUNNLFVBRE47QUFBQSxVQUNrQixTQURsQixXQUNrQixTQURsQjs7QUFFUCxVQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1QsZUFBTyxJQUFQO0FBQ0Q7QUFDRCxhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFVLDRDQURaO0FBRUUsZUFBSTtBQUNKO0FBSEYsWUFJRSwyQkFBd0IsYUFBYSxDQUFyQyxVQUEwQyxTQUExQyxNQUpGO0FBS0csYUFBSyxHQUFMLENBQVMsVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLGlCQUFVLHdDQUFNLE9BQU8sRUFBQyxTQUFTLENBQVYsRUFBYixFQUEyQixLQUFLLENBQWhDLEdBQVY7QUFBQSxTQUFUO0FBTEgsT0FERjtBQVNEOzs7d0JBdEZzQjtBQUNyQix3Q0FDTSx5QkFBZSxTQURyQjtBQUVFLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsTUFGL0I7QUFHRSxzQkFBYyxnQkFBTSxTQUFOLENBQWdCLE1BSGhDO0FBSUUsc0JBQWMsZ0JBQU0sU0FBTixDQUFnQixNQUpoQztBQUtFLHVCQUFlLGdCQUFNLFNBQU4sQ0FBZ0I7QUFMakM7QUFPRDs7Ozs7QUFpRkgsY0FBYyxXQUFkLEdBQTRCLGVBQTVCOztrQkFFZSxhIiwiZmlsZSI6ImxpbmUtaG9yaXpvbnQtc2VyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIGQzU2VsZWN0aW9uIGZyb20gJ2QzLXNlbGVjdGlvbic7XG5cbmltcG9ydCBBYnN0cmFjdFNlcmllcyBmcm9tICcuL2Fic3RyYWN0LXNlcmllcyc7XG5pbXBvcnQge2dldERPTU5vZGV9IGZyb20gJy4uLy4uL3V0aWxzL3JlYWN0LXV0aWxzJztcblxuY2xhc3MgTGluZU9uZVNlcmllcyBleHRlbmRzIEFic3RyYWN0U2VyaWVzIHtcblxuICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uIEFic3RyYWN0U2VyaWVzLnByb3BUeXBlcyxcbiAgICAgIGxpbmVQb3NBdHRyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdmFsdWVQb3NBdHRyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbGluZVNpemVBdHRyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdmFsdWVTaXplQXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl91cGRhdGVTZXJpZXMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl91cGRhdGVTZXJpZXMoKTtcbiAgfVxuXG4gIF91cGRhdGVTZXJpZXMoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZ2V0RE9NTm9kZSh0aGlzLnJlZnMuY29udGFpbmVyKTtcbiAgICBjb25zdCB7XG4gICAgICBfc3RhY2tCeSxcbiAgICAgIGRhdGEsXG4gICAgICBsaW5lU2l6ZUF0dHIsXG4gICAgICB2YWx1ZVBvc0F0dHIsXG4gICAgICBsaW5lUG9zQXR0cixcbiAgICAgIGlubmVySGVpZ2h0LFxuICAgICAgdmFsdWVTaXplQXR0cn0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHtcbiAgICAgIHNhbWVUeXBlVG90YWwgPSAxLFxuICAgICAgc2FtZVR5cGVJbmRleCA9IDB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghZGF0YSB8fCAhZGF0YS5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuX2dldFNjYWxlRGlzdGFuY2UobGluZVBvc0F0dHIpO1xuICAgIGNvbnN0IGxpbmVGdW5jdG9yID0gdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3RvcihsaW5lUG9zQXR0cik7XG4gICAgY29uc3QgdmFsdWVGdW5jdG9yID0gdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3Rvcih2YWx1ZVBvc0F0dHIpO1xuICAgIGNvbnN0IHZhbHVlMEZ1bmN0b3IgPSB0aGlzLl9nZXRBdHRyMEZ1bmN0b3IodmFsdWVQb3NBdHRyKTtcblxuICAgIGlmIChfc3RhY2tCeSA9PT0gdmFsdWVQb3NBdHRyKSB7XG4gICAgICBzYW1lVHlwZVRvdGFsID0gMTtcbiAgICAgIHNhbWVUeXBlSW5kZXggPSAwO1xuICAgIH1cblxuICAgIGNvbnN0IHJlY3RzID0gZDNTZWxlY3Rpb24uc2VsZWN0KGNvbnRhaW5lcikuc2VsZWN0QWxsKCdsaW5lJylcbiAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAub24oJ21vdXNlb3ZlcicsIHRoaXMuX21vdXNlT3ZlcldpdGhWYWx1ZSlcbiAgICAgIC5vbignbW91c2VvdXQnLCB0aGlzLl9tb3VzZU91dFdpdGhWYWx1ZSlcbiAgICAgIC5vbignY2xpY2snLCB0aGlzLl9jbGlja1dpdGhWYWx1ZSk7XG5cbiAgICBjb25zdCBpdGVtU2l6ZSA9IChkaXN0YW5jZSAvIDIpICogMC44NTtcbiAgICB0aGlzLl9hcHBseVRyYW5zaXRpb24ocmVjdHMpXG4gICAgICAuc3R5bGUoJ29wYWNpdHknLCB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdvcGFjaXR5JykpXG4gICAgICAuc3R5bGUoJ3N0cm9rZScsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ3N0cm9rZScpIHx8XG4gICAgICAgIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ2NvbG9yJykpXG4gICAgICAuYXR0cihcIngxXCIsIGQgPT4gbGluZUZ1bmN0b3IoZCkgLSBpdGVtU2l6ZSArIChpdGVtU2l6ZSAqIDIgLyBzYW1lVHlwZVRvdGFsICogc2FtZVR5cGVJbmRleCkpXG4gICAgICAuYXR0cihcIngyXCIsIGQgPT4gbGluZUZ1bmN0b3IoZCkgLSBpdGVtU2l6ZSArIChpdGVtU2l6ZSAqIDIgLyBzYW1lVHlwZVRvdGFsICogc2FtZVR5cGVJbmRleCkgKyAoaXRlbVNpemUgKiAyIC8gc2FtZVR5cGVUb3RhbCkpXG4gICAgICAuYXR0cihcInkxXCIsIGQgPT4ge1xuICAgICAgICB2YXIgdCA9IE1hdGguYWJzKC12YWx1ZTBGdW5jdG9yKGQpICsgdmFsdWVGdW5jdG9yKGQpKTtcbiAgICAgICAgdmFyIHQxID0gTWF0aC5tYXgodmFsdWUwRnVuY3RvcihkKSwgdmFsdWVGdW5jdG9yKGQpKTtcbiAgICAgICAgcmV0dXJuIGlubmVySGVpZ2h0IC0gdDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInkyXCIsIGQgPT4ge1xuICAgICAgICB2YXIgdCA9IE1hdGguYWJzKC12YWx1ZTBGdW5jdG9yKGQpICsgdmFsdWVGdW5jdG9yKGQpKTtcbiAgICAgICAgdmFyIHQxID0gTWF0aC5tYXgodmFsdWUwRnVuY3RvcihkKSwgdmFsdWVGdW5jdG9yKGQpKTtcbiAgICAgICAgcmV0dXJuIGlubmVySGVpZ2h0IC0gdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtkYXRhLCBtYXJnaW5MZWZ0LCBtYXJnaW5Ub3B9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGdcbiAgICAgICAgY2xhc3NOYW1lPVwicnYteHktcGxvdF9fc2VyaWVzIHJ2LXh5LXBsb3RfX3Nlcmllcy0tYmFyXCJcbiAgICAgICAgcmVmPVwiY29udGFpbmVyXCJcbiAgICAgICAgLy8gbWFyZ2lubGVmdCBpbmNyZW1lbnQgYmVjYXVzZSB3ZSBkZWNyZW1lbnQgd2lkdGggbGluZSBmb3IgYXhpc2VzXG4gICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbkxlZnQgKyAxfSwke21hcmdpblRvcH0pYH0+XG4gICAgICAgIHtkYXRhLm1hcCgoZCwgaSkgPT4gPGxpbmUgc3R5bGU9e3tvcGFjaXR5OiAwfX0ga2V5PXtpfS8+KX1cbiAgICAgIDwvZz5cbiAgICApO1xuICB9XG59XG5cbkxpbmVPbmVTZXJpZXMuZGlzcGxheU5hbWUgPSAnTGluZU9uZVNlcmllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IExpbmVPbmVTZXJpZXM7XG4iXX0=