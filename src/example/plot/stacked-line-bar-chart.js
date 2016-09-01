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
import { getRandomSeriesData } from '../../lib/utils/mock-utils';
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

    this.state = {
      crosshairValues: [],
    };
    this._crosshairValues = [];

    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestXs = [
      this._onNearestX.bind(this, 0),
      this._onNearestX.bind(this, 1)
    ];

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
      unscrewed: 20,
      leftDay: 12,
      timeMarker: 12,
      planClick: 25000,
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

  _getDateFormatForCrosshair = (timestamp) => {
    return moment.unix(timestamp).format('DD.MM.YY, HH:MM');
  };

  _labelFormatY = (value, index, arrayLabel) => {
    if (value === 0) return;
    return Numeral(value).format('0a').toUpperCase();
  };

  /**
   * Event handler for onNearestX.
   * @param {number} seriesIndex Index of the series.
   * @param {Object} value Selected value.
   * @private
   */
  _onNearestX(seriesIndex, value) {
    this._crosshairValues = this._crosshairValues.concat();
    this._crosshairValues[seriesIndex] = value;
    this.setState({crosshairValues: this._crosshairValues});
  }
  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave() {
    this._crosshairValues = [];
    this.setState({crosshairValues: this._crosshairValues});
  }

  _formatCrosshairTitle(values) {
    const countClick = values.reduce((summary, item) => summary + item.y, 0);
    return {
      title: 'Кликов',
      value: countClick
    };
  }

  _formatCrosshairItems = (values) => {
    const index = values[0].x;
    const date = this._getDateFormatForCrosshair(this.props.chart[index].xAxisLabel);
    return [{
      title: 'Дата',
      value: date
    }];
  };

  _formatCrosshairTitleResult = () => {
    return {
      title: 'Откручено',
      value: `${this.props.unscrewed}%`
    };
  };

  _formatCrosshairItemsResult = () => {
    return [{
      title: 'Осталось',
      value: `${this.props.leftDay} дней`
    }];
  };

  render() {
    return (
      <XYPlot {...this.props.XYPlot} onMouseLeave={this._onMouseLeave}>
        <YAxis labelFormat={this._labelFormatY} />
        <BackgroundPlot
          values={this.props.chart.map(item => item.xAxisLabel)} />
        <HorizontalGridLines />
        <BackgroundPlot
          plan={this.props.planClick} />
        <VerticalBarSeries
          beginPlotFromZeroCoordinate
          onNearestX={this._onNearestXs[0]}
          data={this.props.chart.map(item => item.desktop)}
        />
        <VerticalBarSeries
          beginPlotFromZeroCoordinate
          onNearestX={this._onNearestXs[1]}
          data={this.props.chart.map(item => item.mobile)}
        />
        <XAxis orientationText="vertical"
               labelFormat={this._labelFormatX()}
               labelValues={this.props.chart.map((item, index) => index)} />
        <Crosshair
          itemsFormat={this._formatCrosshairItems}
          titleFormat={this._formatCrosshairTitle}
          values={this.state.crosshairValues}/>
        <Crosshair values={[{x: this.props.timeMarker}]}
                   hoverShow
                   lineRight
                   itemsFormat={this._formatCrosshairItemsResult}
                   titleFormat={this._formatCrosshairTitleResult}/>
      </XYPlot>
    );
  }
}
