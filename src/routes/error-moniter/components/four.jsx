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
        style={{ height: 200 }}
        option={{
          title: {
            text: '当月问题平台地区',
            x: 'center',
            textStyle: {
              color: '#fff',
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          // legend: {
          //   orient: 'vertical',
          //   left: 'left',
          //   textStyle: {
          //     color: '#fff',
          //   },
          //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          // },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '苏州' },
                { value: 310, name: '福建' },
                { value: 234, name: '广东' },
                { value: 135, name: '北京' },
                { value: 548, name: '山东' },
                { value: 348, name: '湖北' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }}
      />
    );
  }
}

