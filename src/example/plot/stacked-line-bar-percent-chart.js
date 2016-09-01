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
import moment from 'moment';
import { maxBy } from 'lodash';
import { getRandomSeriesData, getRandomDataPercent } from '../../lib/utils/mock-utils';
import {
  XYPlot,
  XAxis,
  YAxis,
  Crosshair,
  HorizontalGridLines,
  VerticalBarSeries,
  BackgroundPlot} from '../../';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.widthBar = ((props.XYPlot.width - props.XYPlot.margin.left
      + props.XYPlot.margin.right) / props.chart.length) - 2;
  }

  static get defaultProps() {
    return {
      XYPlot: {
        width: 720,
        height: 118,
        stackBy: 'y',
        margin: {
          left: 50,
          right: 10,
          top: 10,
          bottom: 50
        }
      },
      chart: getRandomSeriesData(15),
      timeMarker: 12,
      planFact: 40,
    };
  }

  _labelFormatY = (value, index, arrayLabel) => {
    if (value === 0) return;
    return Numeral(value).format('0%').toUpperCase();
  };

  _formatCrosshairTitleResult = () => {
    return {
      title: 'План/Факт',
      value: `${this.props.planFact}%`
    };
  };

  _formatCrosshairItemsResult = () => {
    return null;
  };

  render() {
    return (
      <XYPlot {...this.props.XYPlot}>
        <YAxis labelFormat={this._labelFormatY} />
        <BackgroundPlot
          values={this.props.chart.map(item => item.xAxisLabel)} />
        <HorizontalGridLines />
        <VerticalBarSeries
          beginPlotFromZeroCoordinate
          negativeValueColor="#ff4538"
          positiveValueColor="#00a05c"
          data={getRandomDataPercent(15)}
        />
        <Crosshair values={[{x: this.props.timeMarker}]}
                   hoverShow
                   lineRight
                   itemsFormat={this._formatCrosshairItemsResult}
                   titleFormat={this._formatCrosshairTitleResult}/>
      </XYPlot>
    );
  }
}
