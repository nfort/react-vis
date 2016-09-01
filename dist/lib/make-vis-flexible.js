'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = makeVisFlexible;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactUtils = require('./utils/react-utils');

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTAINER_REF = 'container';

// As a performance enhancement, we want to only listen once
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

var resizeSubscribers = [];
var DEBOUNCE_DURATION = 100;
var timeoutId = null;

/**
 * Calls each subscriber, debounced to the
 */
function debounceEmitResize() {
  _window2.default.clearTimeout(timeoutId);
  timeoutId = _window2.default.setTimeout(emitResize, DEBOUNCE_DURATION);
}

/**
 * Calls each subscriber once syncronously.
 */
function emitResize() {
  resizeSubscribers.forEach(function (cb) {
    return cb();
  });
}

/**
 * Add the given callback to the list of subscribers to be caled when the
 * window resizes. Returns a function that, when called, removes the given
 * callback from the list of subscribers. This function is also resposible for
 * adding and removing the resize listener on `window`.
 *
 * @param {Function} cb - Subscriber callback function
 * @returns {Function} Unsubscribe function
 */
function subscribeToDebouncedResize(cb) {
  resizeSubscribers.push(cb);

  // if we go from zero to one Flexible components instances, add the listener
  if (resizeSubscribers.length === 1) {
    _window2.default.addEventListener('resize', debounceEmitResize);
  }
  return function unsubscribe() {
    removeSubscriber(resizeSubscribers, cb);

    // if we have no Flexible components, remove the listener
    if (resizeSubscribers.length === 0) {
      _window2.default.clearTimeout(timeoutId);
      _window2.default.removeEventListener('resize', debounceEmitResize);
    }
  };
}

/**
 * Helper for removing the given callback from the list of subscribers.
 *
 * @param {Function} item - Subscriber callback function
 */
function removeSubscriber(item) {
  var index = resizeSubscribers.indexOf(item);
  if (index > -1) {
    resizeSubscribers.splice(index, 1);
  }
}

/**
 * Add the ability to stretch the visualization on window resize.
 * @param {*} Component React class for the child component.
 * @returns {*} Flexible component.
 */
function makeVisFlexible(Component) {

  var ResultClass = function (_React$Component) {
    (0, _inherits3.default)(ResultClass, _React$Component);
    (0, _createClass3.default)(ResultClass, null, [{
      key: 'propTypes',
      get: function get() {
        var _Component$propTypes = Component.propTypes;
        var width = _Component$propTypes.width;
        var otherPropTypes = (0, _objectWithoutProperties3.default)(_Component$propTypes, ['width']);

        return otherPropTypes;
      }
    }]);

    function ResultClass(props) {
      (0, _classCallCheck3.default)(this, ResultClass);

      var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ResultClass).call(this, props));

      _this.state = {
        width: 0
      };
      _this._onResize = _this._onResize.bind(_this);
      return _this;
    }

    /**
     * Get the width of the container and assign the width.
     * @private
     */


    (0, _createClass3.default)(ResultClass, [{
      key: '_onResize',
      value: function _onResize() {
        var containerElement = (0, _reactUtils.getDOMNode)(this.refs[CONTAINER_REF]);
        var offsetWidth = containerElement.offsetWidth;
        if (this.state.width !== offsetWidth) {
          this.setState({
            width: offsetWidth
          });
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._onResize();
        this.cancelSubscription = subscribeToDebouncedResize(this._onResize);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps() {
        this._onResize();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.cancelSubscription();
      }
    }, {
      key: 'render',
      value: function render() {
        var width = this.state.width;

        return _react2.default.createElement(
          'div',
          {
            ref: CONTAINER_REF },
          _react2.default.createElement(Component, (0, _extends3.default)({
            width: width
          }, this.props))
        );
      }
    }]);
    return ResultClass;
  }(_react2.default.Component);

  ResultClass.displayName = 'Flexible' + Component.displayName;

  return ResultClass;
}