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
  }
  render() {
    const { sevenAvgAllTime } = this.props;
    const data = sevenAvgAllTime.map(item => ({
      stat_date: item.stat_date,
      avg_all_time: Number((Number(item.avg_all_time) / 1000).toFixed(3)),
    }));

    const cols = {
      // value: {
      //   min: 0,
      // },
      // stat_date: {
      //   range: [0, 1],
      // },
    };

    return (
      <Card title="首屏时间走势图">
        <div className="performance-one">
          <Chart className="chart" padding="auto" height={270} data={data} scale={cols} forceFit>
            <Axis name="stat_date" />
            <Axis
              name="avg_all_time"
              label={{
                formatter: val => `${val}s`,
              }}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom type="line" position="stat_date*avg_all_time" size={2} />
            <Geom
              type="point"
              position="stat_date*avg_all_time"
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

