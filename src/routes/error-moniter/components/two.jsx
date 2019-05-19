import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';

import 'echarts/map/js/china';
// import geoJson from 'echarts/map/json/china.json';
// import { oneData, oneGeoCoordMap } from '../data';

export default class ErrorMoniter extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <ReactEcharts
        echarts={echarts}
        style={{ height: 460 }}
        option={{
          title: {
            text: '平台类型历史数据',
            x: 'center',
            textStyle: {
              color: '#fff',
            },
          },
          tooltip: {},
          // legend: {
          //   data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
          // },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '当月投资人数', max: 6500 },
              { name: '当月借款人数', max: 16000 },
              { name: '成交', max: 30000 },
              { name: '运营平台', max: 38000 },
              { name: '当月问题平台', max: 52000 },
              { name: '累计问题平台', max: 25000 },
            ],
          },
          series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）',
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）',
              },
            ],
          }],
        }}
      />
    );
  }
}

