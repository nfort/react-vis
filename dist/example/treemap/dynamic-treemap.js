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

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DynamicTreemapExample = function (_React$Component) {
  (0, _inherits3.default)(DynamicTreemapExample, _React$Component);

  function DynamicTreemapExample(props) {
    (0, _classCallCheck3.default)(this, DynamicTreemapExample);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(DynamicTreemapExample).call(this, props));

    _this.state = {
      treemapData: _this._getRandomData()
    };
    return _this;
  }

  (0, _createClass3.default)(DynamicTreemapExample, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _window2.default.setInterval(function () {
        return _this2.setState({ treemapData: _this2._getRandomData() });
      }, 5000);
    }
  }, {
    key: '_getRandomData',
    value: function _getRandomData() {
      var totalLeaves = Math.random() * 20;
      var leaves = [];
      var title = void 0;
      for (var i = 0; i < totalLeaves; i++) {
        title = Math.random();
        if (Math.random() > 0.5) {
          title = _react2.default.createElement(
            'b',
            null,
            title
          );
        }
        leaves.push({
          title: title,
          size: Math.random() * 1000,
          color: Math.random()
        });
      }
      return {
        title: '',
        color: 1,
        children: leaves
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_.Treemap, {
        animation: true,
        data: this.state.treemapData,
        height: 300,
        width: 350 });
    }
  }]);
  return DynamicTreemapExample;
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

exports.default = DynamicTreemapExample;