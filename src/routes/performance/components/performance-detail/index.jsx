import React from 'react';
import { Card, Radio } from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';


import './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
    return (
      <Card
        title="各项消耗时间"
        extra={
          <RadioGroup defaultValue="a">
            <RadioButton value="a">今天</RadioButton>
            <RadioButton value="b">本周</RadioButton>
            <RadioButton value="c">本月</RadioButton>
            <RadioButton value="d">全年</RadioButton>
          </RadioGroup>
        }
      >
        <div className="performance-detail">
          <div className="chart">
            <h4>各项指标</h4>
            <Chart height={254} data={data} padding="auto" forceFit>
              <Axis name="year" />
              <Axis name="sales" />
              <Tooltip
                crosshairs={{
                  type: 'y',
                }}
              />
              <Geom type="interval" position="year*sales" />
            </Chart>
          </div>
          <div className="performance-list">
            <h4>各项指标排名</h4>
            <ul>
              {
                data
                  .filter((item, index) => index < 7)
                  .map((item, index) => (
                    <li key={item.year}>
                      <span className={`num ${index > 2 && 'num-down'}`}>{index + 1}</span>
                      <span className="list-title">{item.year}</span>
                      <span className="list-content">{item.sales}</span>
                    </li>
                  ))
              }
            </ul>
          </div>
        </div>
      </Card>
    );
  }
}

