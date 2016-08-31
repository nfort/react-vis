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

import React from 'react';

import PureRenderComponent from '../pure-render-component';
import {getAttributeFunctor, getScaleObjectFromProps, getAttr0Functor} from '../utils/scales-utils';
import { getColorProfileForDateRange } from '../utils/date-utils';

const PADDING_RIGHT_BAR = 1.7;

/**
 * Format title by detault.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */
function defaultTitleFormat(values) {
  const value = getFirstNonEmptyValue(values);
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
  return values.map((v, i) => {
    if (v) {
      return {value: v.y, title: i};
    }
  });
}

/**
 * Get the first non-empty item from an array.
 * @param {Array} values Array of values.
 * @returns {*} First non-empty value or undefined.
 */
function getFirstNonEmptyValue(values) {
  return (values || []).find(v => Boolean(v));
}

class BackgroundPlot extends PureRenderComponent {

  static get propTypes() {
    return {
      values: React.PropTypes.array,
      series: React.PropTypes.object,
      innerWidth: React.PropTypes.number,
      innerHeight: React.PropTypes.number,
      marginLeft: React.PropTypes.number,
      marginTop: React.PropTypes.number,
      itemsFormat: React.PropTypes.func,
      titleFormat: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      titleFormat: defaultTitleFormat,
      itemsFormat: defaultItemsFormat
    };
  }

  static get requiresSVG() {
    return true;
  }

  _getScaleDistance(attr) {
    const scaleObject = getScaleObjectFromProps(this.props, attr);
    return scaleObject ? scaleObject.distance : 0;
  }

  calculatePosX(item) {
    const distance = this._getScaleDistance('x');
    const itemSize = (distance / 2) * 0.95;
    const sameTypeTotal = 1;
    const sameTypeIndex = 0;
    const lineFunctor = this.getPositionX(item);
    return (lineFunctor) - itemSize +
      (itemSize * 2 / sameTypeTotal * sameTypeIndex);
  }

  getPositionX(value) {
    const x = getAttributeFunctor(this.props, 'x');
    return x(value);
  }

  _getAttributeFunctor(attr) {
    return getAttributeFunctor(this.props, attr);
  }

  calculatePosY() {
    const poxY = {x: 0, y: this.props.plan};
    const valueFunctor = this._getAttributeFunctor('y');
    const value0Functor = getAttr0Functor(this.props, 'y');
    return Math.abs(-value0Functor(poxY) + valueFunctor(poxY));
  }

  renderRectangleWithFixedHeight() {
    const {
      innerWidth,
      innerHeight} = this.props;

    return (
      <rect
        className="rv-xy-plot__background-plot"
        x={0}
        y={innerHeight - this.calculatePosY()}
        opacity={0.1}
        fill={'#999999'}
        ref="container"
        width={innerWidth}
        height={this.calculatePosY()}
      />
    );
  }

  getRect(index, color) {
    const { innerHeight } = this.props;

    const distance = this._getScaleDistance('x');
    const itemSize = (distance / 2) * 0.95;

    let firstPositionX = this.calculatePosX({x: 0, y: 0});

    if (index !== 0) {
      firstPositionX = firstPositionX * 2;
    }

    const left = this.calculatePosX({x: index, y: 0}) - firstPositionX;
    const width = (itemSize * 2) + firstPositionX;

    return (
        <rect
          className="rv-xy-plot__background-plot"
          x={left}
          y={0}
          opacity={0.9}
          fill={color}
          ref="container"
          key={index}
          width={width}
          height={innerHeight}
        />
    );
  }

  renderPlot() {
    const { values, plan } = this.props;

    if (values) {
      const colorize = getColorProfileForDateRange(values);
      return values.map((item, index) => {
        return this.getRect(index, colorize[index])
      });
    }

    if (plan) return this.renderRectangleWithFixedHeight();

    return null;
  }

  render() {
    const {
      marginTop,
      marginLeft} = this.props;

    return (
      <g transform={`translate(${marginLeft},${marginTop})`}>
        {this.renderPlot()}
      </g>
    )
  }
}

BackgroundPlot.displayName = 'BackgroundPlot';

export default BackgroundPlot;
