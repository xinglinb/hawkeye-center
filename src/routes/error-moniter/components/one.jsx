import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';

import 'echarts/map/js/china';
// import geoJson from 'echarts/map/json/china.json';
import { oneData, oneGeoCoordMap } from '../data';

export default class ErrorMoniter extends React.Component {
  componentDidMount() {

  }

  convertData = function (data) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const geoCoord = oneGeoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  render() {
    return (
      <ReactEcharts
        echarts={echarts}
        style={{ height: 500 }}
        option={{
          backgroundColor: '#404a59',
          title: {
            text: '问题平台地理分布',
            left: 'center',
            textStyle: {
              color: '#fff',
              lineHeight: 40,
            },
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['营业', '停业', '提现困难', '跑路'],
            textStyle: {
              color: '#fff',
            },
          },
          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: false,
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111',
              },
              emphasis: {
                areaColor: '#2a333d',
              },
            },
          },
          series: [
            {
              name: '营业',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.convertData(oneData.filter(i => i.value < 20)),
              symbolSize(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false,
                },
                emphasis: {
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  // color: '#ddb926',
                },
              },
            },
            {
              name: '提现困难',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.convertData(oneData.filter(i => i.value > 20 && i.value < 40)),
              symbolSize(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false,
                },
                emphasis: {
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  // color: '#ddb926',
                },
              },
            },
            {
              name: '跑路',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.convertData(oneData.filter(i => i.value > 40 && i.value < 60)),
              symbolSize(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false,
                },
                emphasis: {
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  // color: '#ddb926',
                },
              },
            },
            {
              name: '停业',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: this.convertData(oneData.filter(i => i.value > 80)),
              symbolSize(val) {
                return val[2] / 10;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke',
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  // color: '#c26c49',
                  shadowBlur: 10,
                  shadowColor: '#333',
                },
              },
              zlevel: 1,
            },
          ],
        }}
      />
    );
  }
}

