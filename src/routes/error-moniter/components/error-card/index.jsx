import React from 'react';
import { Card } from 'antd';
import moment from 'moment';
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
    data: [{
      time: moment().subtract(0, 'second').format('HH:mm:ss'),
      errorNum: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    }, {
      time: moment().subtract(10, 'second').format('HH:mm:ss'),
      errorNum: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    }, {
      time: moment().subtract(20, 'second').format('HH:mm:ss'),
      errorNum: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    }, {
      time: moment().subtract(30, 'second').format('HH:mm:ss'),
      errorNum: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    }, {
      time: moment().subtract(40, 'second').format('HH:mm:ss'),
      errorNum: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    }, {
      time: moment().subtract(50, 'second').format('HH:mm:ss'),
      errorNum: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    }],
  }

  componentDidMount() {
    setInterval(() => {
      this.changeData();
    }, 10000);
  }

  changeData = () => {
    const { data } = this.state;
    const newData = [...data];
    newData.shift();
    newData.push({
      time: moment().format('HH:mm:ss'),
      errorNum: Math.round(Math.random() * 10) > 3 ? Math.round(Math.random() * 10) : 0,
    });
    this.setState({ data: newData });
  }

  render() {
    const { data } = this.state;
    const { title } = this.props;
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
      <Card title={title} extra={<a onClick={() => {}}>设置</a>}>
        <Chart height={254} data={data} padding="auto" forceFit className="errorCard-chart">
          <Axis
            name="time"
            line={{
              stroke: '#E6E6E6',
            }}
          />
          <Axis name="errorNum" />
          <Tooltip />
          <Geom
            type="line"
            position="time*errorNum"
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

