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
import * as d3Selection from 'd3-selection';
import * as d3Shape from 'd3-shape';

import AbstractSeries from './abstract-series';
import {getDOMNode} from '../../utils/react-utils';

import {DEFAULT_OPACITY} from '../../theme';

const STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

class LineOneSeries extends AbstractSeries {

  static get propTypes() {
    return {
      ... AbstractSeries.propTypes,
      linePosAttr: React.PropTypes.string,
      valuePosAttr: React.PropTypes.string,
      lineSizeAttr: React.PropTypes.string,
      valueSizeAttr: React.PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      strokeStyle: 'solid',
      opacity: 1
    };
  }

  componentDidMount() {
    this._updateSeries();
  }

  componentDidUpdate() {
    this._updateSeries();
  }

  _updateSeries() {
    const container = getDOMNode(this.refs.container);
    const {
      _stackBy,
      data,
      lineSizeAttr,
      valuePosAttr,
      linePosAttr,
      valueSizeAttr} = this.props;

    let {
      sameTypeTotal = 1,
      sameTypeIndex = 0} = this.props;

    if (!data || !data.length) {
      return;
    }

    const distance = this._getScaleDistance(linePosAttr);
    const lineFunctor = this._getAttributeFunctor(linePosAttr);
    const valueFunctor = this._getAttributeFunctor(valuePosAttr);
    const value0Functor = this._getAttr0Functor(valuePosAttr);

    if (_stackBy === valuePosAttr) {
      sameTypeTotal = 1;
      sameTypeIndex = 0;
    }

    const line = d3Selection.select(container).selectAll('line')
      .data(data);

    const itemSize = (distance / 2) * 0.85;

    debugger;
    this._applyTransition(line)
      .attr(linePosAttr, d => lineFunctor(d) - itemSize +
        (itemSize * 2 / sameTypeTotal * sameTypeIndex)
      )
      .attr(lineSizeAttr, itemSize * 2 / sameTypeTotal)
      .attr(valuePosAttr,
        d => Math.min(value0Functor(d), valueFunctor(d)))
      .attr(valueSizeAttr,
        d => Math.abs(-value0Functor(d) + valueFunctor(d)));
  }

  render() {
    const {data, strokeWidth, marginLeft, marginTop} = this.props;
    console.log(this);
    if (!data) {
      return null;
    }
    return (
      <g
        className="rv-xy-plot__series rv-xy-plot__series--bar"
        ref="container"
        transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => {
          return <line
            key={i}
            style={{
              stroke: 'rgb(255,0,0)',
              strokeWidth
            }}/>
        })}
      </g>
    );
  }
}

LineOneSeries.displayName = 'LineOneSeries';

export default LineOneSeries;
