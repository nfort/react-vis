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

import Numeral from 'numeral';
import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  Crosshair,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalLineBarSeries} from '../../';

/**
 * Get the array of x and y pairs.
 * The function tries to avoid too large changes of the chart.
 * @param {number} total Total number of points
 * @returns {Array} Array of data.
 * @private
 */
function getRandomSeriesData(total) {
  const result = [];
  let lastY = (Math.random() * 40 - 20) * 1000;
  let y;
  const firstY = lastY;
  for (let i = 0; i <= total; i++) {
    y = Math.abs(Math.random() * firstY - firstY / 2 + lastY);
    result.push({
      x: i,
      y
    });
    lastY = y;
  }
  return result;
}

function getRandomArray(count) {
  let a = [];
  for (let i = 0; i <= count; i++) {
    a.push(i);
  }
  return a;
}

const data = getRandomArray(5);
const dataLabel = ['01:12','02:12','03:12','04:12','05:12'];

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.widthBar = ((props.XYPlot.width - props.XYPlot.margin.left
      + props.XYPlot.margin.right) / props.VerticalBarSeries[0].data.length) - 2;
  }

  static get defaultProps() {
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
      VerticalBarSeries: [
        { data: getRandomSeriesData(30) }
      ],
      VerticalLineBarSeries: [
        { data: getRandomSeriesData(30) }
      ]
    };
  }

  _labelFormatX = () => {
    const widthBar  = this.widthBar;
    const minWidthBar = 4;
    const maxWidthBar = 7;

    return (value, index, arrayLabel) => {
      if (value % 2 === 0 && (widthBar > minWidthBar && widthBar < maxWidthBar)) {
        return dataLabel[value];
      } else if (widthBar > maxWidthBar) {
        return dataLabel[value];
      }
    }
  };

  _labelFormatY = (value, index, arrayLabel) => {
    // remove padding from zero y-axis
    arrayLabel[0].setAttribute('dy', 0);
    return Numeral(value).format('0a').toUpperCase();
  };

  widthBars = (value) => {
    if (typeof value !== 'undefined') {
      this.widthBar = value;
    } else {
      return this.widthBar;
    }
  };

  render() {
    return (
      <XYPlot {...this.props.XYPlot}>
        <HorizontalGridLines />
        <VerticalBarSeries
          {...this.props.VerticalBarSeries[0]}
          widthBar={this.widthBars}
        />
        <VerticalLineBarSeries
          {...this.props.VerticalLineBarSeries[0]}
        />
        <XAxis orientationText="vertical" labelFormat={this._labelFormatX()} labelValues={data} />
        <YAxis labelFormat={this._labelFormatY} />
        <Crosshair widthBar={this.widthBars} values={[{x: 12, y: 105}, {x: 3, y: 107}]}/>
      </XYPlot>
    );
  }
}
