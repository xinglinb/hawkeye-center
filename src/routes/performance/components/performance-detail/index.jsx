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
    selectValue: 'toDayStatData',
  }
  render() {
    const { selectValue } = this.state;
    const { statData = {} } = this.props;
    const {
      avg_dns_tcp = 0,
      avg_dom_render = 0,
      avg_parse_resources = 0,
      avg_res_html = 0,
      avg_res_js = 0,
      avg_unload_prePage = 0,
    } = statData[selectValue] || {};
    const data = [
      {
        name: '卸载上个页面',
        value: Number(avg_unload_prePage).toFixed(2),
      },
      {
        name: 'dns + tcp的时间',
        value: Number(avg_dns_tcp).toFixed(2),
      },
      {
        name: '请求html的时间',
        value: Number(avg_res_html).toFixed(2),
      },
      {
        name: '请求js的时间',
        value: Number(avg_res_js).toFixed(2),
      },
      {
        name: 'js dom css解析时间',
        value: Number(avg_parse_resources).toFixed(2),
      },
      {
        name: 'dom 渲染',
        value: Number(avg_dom_render).toFixed(2),
      },
    ];
    return (
      <Card
        title="各项消耗时间"
        extra={
          <RadioGroup
            value={selectValue}
            onChange={(e) => {
              this.setState({
                selectValue: e.target.value,
              });
            }}
          >
            <RadioButton value="toDayStatData">今天</RadioButton>
            <RadioButton value="weekStatData">本周</RadioButton>
            <RadioButton value="monthStatData">本月</RadioButton>
            <RadioButton value="yearStatData">全年</RadioButton>
            <RadioButton value="allStatData">历史所有</RadioButton>
          </RadioGroup>
        }
      >
        <div className="performance-detail">
          <div className="chart">
            <h4>各项指标</h4>
            <Chart height={254} data={data} padding="auto" forceFit>
              <Axis name="name" />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: 'y',
                }}
              />
              <Geom type="interval" position="name*value" />
            </Chart>
          </div>
          <div className="performance-list">
            <h4>各项指标排名</h4>
            <ul>
              {
                data
                  .filter((item, index) => index < 7)
                  .map((item, index) => (
                    <li key={item.name}>
                      <span className={`num ${index > 2 && 'num-down'}`}>{index + 1}</span>
                      <span className="list-title">{item.name}</span>
                      <span className="list-content">{item.value}</span>
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

