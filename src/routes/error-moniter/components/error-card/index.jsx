import React from 'react';
import { Card } from 'antd';
// import moment from 'moment';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Animate,
} from 'bizcharts';

import './index.less';

export default class ErrorCard extends React.Component {
  state = {
    // data: [50, 40, 30, 20, 10, 0].map(item => ({
    //   stat_date: moment().subtract(item, 'second').format('HH:mm:ss'),
    //   tatol: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    // })),
  }

  componentDidMount() {

  }

  toDetailHandle = (mid) => {
    const { history } = this.props;
    history.push(`/errorDetail/${mid}`);
  }

  render() {
    const { errorStatData } = this.props;
    const { type_name, statData, mid } = errorStatData;
    const data = statData.map(item => ({
      ...item,
      stat_date: item.stat_date.split(' ')[1],
    }));
    Animate.registerAnimation('lineUpdate', (updateShape, animateCfg) => {
      const cacheShape = updateShape.get('cacheShape'); // 该动画 shape 的前一个状态
      const cacheAttrs = cacheShape.attrs; // 上一个 shape 属性
      const oldPoints = cacheAttrs.points; // 上一个状态的关键点
      const newPoints = updateShape.attr('points'); // 当前 shape 的关键点

      const oldLength = oldPoints.length;
      const newLength = newPoints.length;
      const deltaLength = newLength - oldLength;

      const lastPoint = newPoints[newPoints.length - 1];
      for (let i = 0; i < deltaLength; i++) {
        oldPoints.push(lastPoint);
      }

      updateShape.attr(cacheAttrs);
      updateShape.animate().to({
        attrs: {
          points: newPoints,
        },
        duration: 800,
        easing: animateCfg.easing,
      });
    });


    return (
      <Card title={type_name} extra={<a onClick={() => {}}>设置</a>}>
        <Chart
          height={254}
          data={data}
          padding="auto"
          forceFit
          className="errorCard-chart"
          onClick={() => {
            this.toDetailHandle(mid);
          }}
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
            animate={{
              update: {
                animation: 'lineUpdate',
              },
            }}
          />
        </Chart>
      </Card>
    );
  }
}

