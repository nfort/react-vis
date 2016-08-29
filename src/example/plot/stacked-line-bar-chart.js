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
import { getRandomSeriesData } from '../../lib/utils/mock-utils';
import {
  XYPlot,
  XAxis,
  YAxis,
  Crosshair,
  HorizontalGridLines,
  makeWidthFlexible,
  VerticalBarSeries,
  BackgroundPlot} from '../../';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

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
        height: 160,
        stackBy: 'y',
        margin: {
          left: 50,
          right: 10,
          top: 10,
          bottom: 50
        }
      },
      chart: getRandomSeriesData(45),
    };
  }

  _labelFormatX = () => {
    const widthBar  = this.widthBar;
    const that = this.props;
    const minWidthBar = 4;
    const maxWidthBar = 7;

    return (value, index, arrayLabel) => {
      if (index % 2 === 0 && (widthBar > minWidthBar && widthBar < maxWidthBar)) {
        return this._getDateFormat(that.chart[index].xAxisLabel);
      } else if (widthBar > maxWidthBar) {
        return this._getDateFormat(that.chart[index].xAxisLabel);
      }
    }
  };

  _getDateFormat = (timestamp) => {
    return moment.unix(timestamp).format('DD:MM');
  };

  _labelFormatY = (value, index, arrayLabel) => {
    if (value === 0) return;
    return Numeral(value).format('0a').toUpperCase();
  };

  render() {
    return (
      <XYPlot {...this.props.XYPlot}>
        <YAxis labelFormat={this._labelFormatY} />
        <BackgroundPlot
          values={this.props.chart.map(item => item.xAxisLabel)} />
        <HorizontalGridLines />
        <BackgroundPlot
          plan={17600}
          values={this.props.chart.map(item => item.plan)} />
        <VerticalBarSeries
          beginPlotFromZeroCoordinate
          data={this.props.chart.map(item => item.desktop)}
        />
        <VerticalBarSeries
          beginPlotFromZeroCoordinate
          data={this.props.chart.map(item => item.mobile)}
        />
        <XAxis orientationText="vertical"
               labelFormat={this._labelFormatX()}
               labelValues={this.props.chart.map((item, index) => index)} />
        <Crosshair values={[{x: 0, y: 'Вывод информация'}]}/>
      </XYPlot>
    );
  }
}
