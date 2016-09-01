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

var _table = require('../../lib/table/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COLORS = ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28']; // Copyright (c) 2016 Uber Technologies, Inc.
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

var TableExample = function (_React$Component) {
  (0, _inherits3.default)(TableExample, _React$Component);

  function TableExample(props) {
    (0, _classCallCheck3.default)(this, TableExample);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(TableExample).call(this, props));

    _this.state = {
      tableData: _this._getTableData(),
      tableHeader: _this._getTableHeader()
    };
    return _this;
  }

  (0, _createClass3.default)(TableExample, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _window2.default.setInterval(function () {
        return _this2.setState({ tableData: _this2._getTableData() });
      }, 5000);
    }
  }, {
    key: '_renderCustomTableCell',
    value: function _renderCustomTableCell(value) {
      return _react2.default.createElement(
        'div',
        {
          className: 'custom-table-cell',
          style: {
            background: COLORS[Math.floor(Math.random() * 6)]
          } },
        value
      );
    }
  }, {
    key: '_getTableData',
    value: function _getTableData() {
      var result = [];
      for (var i = 0; i < 60; i++) {
        result[i] = [];
        for (var j = 0; j < 60; j++) {
          result[i].push(this._renderCustomTableCell(Math.random()));
        }
      }
      return result;
    }
  }, {
    key: '_getTableHeader',
    value: function _getTableHeader() {
      var result = [];
      for (var i = 0; i < 60; i++) {
        result.push(Math.random());
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_table2.default, {
        data: this.state.tableData,
        header: this.state.tableHeader,
        width: 350,
        height: 300 });
    }
  }]);
  return TableExample;
}(_react2.default.Component);

exports.default = TableExample;