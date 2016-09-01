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

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _lineHorizontalSeries = require('./line-horizontal-series');

var _lineHorizontalSeries2 = _interopRequireDefault(_lineHorizontalSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerticalLineBarSeries = function (_AbstractSeries) {
  (0, _inherits3.default)(VerticalLineBarSeries, _AbstractSeries);

  function VerticalLineBarSeries() {
    (0, _classCallCheck3.default)(this, VerticalLineBarSeries);
    return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(VerticalLineBarSeries).apply(this, arguments));
  }

  (0, _createClass3.default)(VerticalLineBarSeries, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_lineHorizontalSeries2.default, (0, _extends3.default)({}, this.props, {
        linePosAttr: 'x',
        valuePosAttr: 'y',
        stroke: '#039DAB'
      }));
    }
  }], [{
    key: 'getParentConfig',
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === 'x';
      var zeroBaseValue = attr === 'y';
      return {
        isDomainAdjustmentNeeded: isDomainAdjustmentNeeded,
        zeroBaseValue: zeroBaseValue
      };
    }
  }]);
  return VerticalLineBarSeries;
}(_abstractSeries2.default); // Copyright (c) 2016 Uber Technologies, Inc.
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

VerticalLineBarSeries.displayName = 'VerticalLineBarSeries';

exports.default = VerticalLineBarSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvdmVydGljYWwtbGluZS1iYXItc2VyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0lBRU0scUI7Ozs7Ozs7Ozs7NkJBV0s7QUFDUCxhQUNBLHlGQUNNLEtBQUssS0FEWDtBQUVFLHFCQUFZLEdBRmQ7QUFHRSxzQkFBYSxHQUhmO0FBSUUsZ0JBQU87QUFKVCxTQURBO0FBUUQ7OztvQ0FsQnNCLEksRUFBTTtBQUMzQixVQUFNLDJCQUEyQixTQUFTLEdBQTFDO0FBQ0EsVUFBTSxnQkFBZ0IsU0FBUyxHQUEvQjtBQUNBLGFBQU87QUFDTCwwREFESztBQUVMO0FBRkssT0FBUDtBQUlEOzs7NkJBbENIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQThCQSxzQkFBc0IsV0FBdEIsR0FBb0MsdUJBQXBDOztrQkFFZSxxQiIsImZpbGUiOiJ2ZXJ0aWNhbC1saW5lLWJhci1zZXJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQWJzdHJhY3RTZXJpZXMgZnJvbSAnLi9hYnN0cmFjdC1zZXJpZXMnO1xuaW1wb3J0IExpbmVPbmVTZXJpZXMgZnJvbSAnLi9saW5lLWhvcml6b250YWwtc2VyaWVzJztcblxuY2xhc3MgVmVydGljYWxMaW5lQmFyU2VyaWVzIGV4dGVuZHMgQWJzdHJhY3RTZXJpZXMge1xuXG4gIHN0YXRpYyBnZXRQYXJlbnRDb25maWcoYXR0cikge1xuICAgIGNvbnN0IGlzRG9tYWluQWRqdXN0bWVudE5lZWRlZCA9IGF0dHIgPT09ICd4JztcbiAgICBjb25zdCB6ZXJvQmFzZVZhbHVlID0gYXR0ciA9PT0gJ3knO1xuICAgIHJldHVybiB7XG4gICAgICBpc0RvbWFpbkFkanVzdG1lbnROZWVkZWQsXG4gICAgICB6ZXJvQmFzZVZhbHVlXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgIDxMaW5lT25lU2VyaWVzXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIGxpbmVQb3NBdHRyPVwieFwiXG4gICAgICB2YWx1ZVBvc0F0dHI9XCJ5XCJcbiAgICAgIHN0cm9rZT1cIiMwMzlEQUJcIlxuICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5WZXJ0aWNhbExpbmVCYXJTZXJpZXMuZGlzcGxheU5hbWUgPSAnVmVydGljYWxMaW5lQmFyU2VyaWVzJztcblxuZXhwb3J0IGRlZmF1bHQgVmVydGljYWxMaW5lQmFyU2VyaWVzO1xuIl19