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

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
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
  let lastY = Math.random() * 40 - 20;
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

function getLabel(x) {

}

export default class Example extends React.Component {
  render() {
    return (
      <XYPlot
        width={720}
        height={165}
        stackBy="y">
        <HorizontalGridLines />
        <XAxis labelFormat={x => dataLabel[x]} labelValues={data} />
        <YAxis />
        <VerticalBarSeries
          data={getRandomSeriesData(30)}
        />
        <VerticalLineBarSeries
          data={getRandomSeriesData(30)}
        />
      </XYPlot>
    );
  }
}
