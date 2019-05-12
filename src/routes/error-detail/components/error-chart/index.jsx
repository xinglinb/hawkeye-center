import React from 'react';
// import { Card } from 'antd';
// import moment from 'moment';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';

import './index.less';

export default class ErrorCard extends React.Component {
  state = {
    // data: [50, 40, 30, 20, 10, 0].map(item => ({
    //   stat_date: moment().subtract(item, 'second').format('HH:mm:ss'),
    //   tatol: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    // })),
  }

  render() {
    const { myErrorStatData = {} } = this.props;
    const { statData = [] } = myErrorStatData;
    const data = statData.map(item => ({
      ...item,
      stat_date: item.stat_date.split(' ')[1],
    }));


    return (
      <Chart
        height={254}
        data={data}
        padding="auto"
        forceFit
        className="errorCard-chart"
      >
        <Axis
          name="stat_date"
          line={{
            stroke: '#E6E6E6',
          }}
        />
        <Axis name="tatol" />
        <Tooltip />
        <Geom
          type="line"
          position="stat_date*tatol"
          size={2}
          color="l (270) 0:#75cd9e .3:#cdced0 1:#fa674a"
          shape="smooth"
          style={{
            shadowColor: 'l (270) 0:rgba(21, 146, 255, 0)',
            shadowBlur: 60,
            shadowOffsetY: 6,
          }}
        />
      </Chart>
    );
  }
}

