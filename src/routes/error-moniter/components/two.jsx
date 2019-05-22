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
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            textStyle: {
              color: '#fff',
            },
            data: ['民营', '风投', '上市公司', '银行', '国资'],
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '成交' },
              { name: '运营平台' },
              { name: '当月问题平台' },
              { name: '累计问题平台' },
              { name: '当月投资人数' },
              { name: '当月借款人数' },
            ],
          },
          series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [742.92, 2037, 75, 1596, 175.57, 40.03],
                name: '民营',
              },
              {
                value: [303.41, 80, 0, 0, 63.2, 16.93],
                name: '风投',
              },
              {
                value: [222.5, 68, 0, 0, 46.34, 12.42],
                name: '上市公司',
              },
              {
                value: [126.08, 17, 0, 0, 26.26, 7.04],
                name: '银行',
              },
              {
                value: [134.81, 76, 2, 2, 28.08, 7.52],
                name: '国资',
              },
            ],
          }],
        }}
      />
    );
  }
}

