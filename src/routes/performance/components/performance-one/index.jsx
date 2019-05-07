import React from 'react';
import { Card } from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';


import './index.less';

export default class PerformanceDetail extends React.Component {
  state = {
    data: [
      {
        year: '1951 年',
        sales: 38,
      },
      {
        year: '1952 年',
        sales: 52,
      },
      {
        year: '1956 年',
        sales: 61,
      },
      {
        year: '1957 年',
        sales: 145,
      },
      {
        year: '1958 年',
        sales: 48,
      },
      {
        year: '1959 年',
        sales: 38,
      },
      {
        year: '1960 年',
        sales: 38,
      },
      {
        year: '1962 年',
        sales: 38,
      },
      {
        year: '1964 年',
        sales: 38,
      },
      {
        year: '1966 年',
        sales: 38,
      },
      {
        year: '1968 年',
        sales: 38,
      },
    ],
  }
  render() {
    const { data } = this.state;
    const cols = {
      value: {
        min: 0,
      },
      year: {
        range: [0, 1],
      },
    };

    return (
      <Card title="首屏时间走势图">
        <div className="performance-one">
          <Chart className="chart" padding="auto" height={270} data={data} scale={cols} forceFit>
            <Axis name="year" />
            <Axis name="sales" />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom type="line" position="year*sales" size={2} />
            <Geom
              type="point"
              position="year*sales"
              size={4}
              shape={'circle'}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
        </div>
      </Card>
    );
  }
}

