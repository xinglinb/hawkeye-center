import React from 'react';
import { Card } from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';

import './index.less';


const { DataView } = DataSet;
export default class PerformanceDetail extends React.Component {
  state = {
    data: [
      {
        item: 'Design',
        a: 70,
        b: 30,
      },
      {
        item: 'Development',
        a: 60,
        b: 70,
      },
      {
        item: 'Marketing',
        a: 50,
        b: 60,
      },
      {
        item: 'Users',
        a: 40,
        b: 50,
      },
      {
        item: 'Test',
        a: 60,
        b: 70,
      },
      {
        item: 'Language',
        a: 70,
        b: 50,
      },
      {
        item: 'Technology',
        a: 50,
        b: 40,
      },
      {
        item: 'Support',
        a: 30,
        b: 40,
      },
      {
        item: 'Sales',
        a: 60,
        b: 40,
      },
      {
        item: 'UX',
        a: 50,
        b: 60,
      },
    ],
  }
  render() {
    // const { data } = this.state;
    const { statData } = this.props;
    const { toDayStatData = {}, allStatData = {} } = statData;
    const data = [
      {
        item: '卸载上个页面',
        toDayStatData: Number(Number(toDayStatData.avg_unload_prePage).toFixed(4) / 1000),
        allStatData: Number(Number(allStatData.avg_unload_prePage).toFixed(4) / 1000),
      },
      {
        item: 'dns + tcp的时间',
        toDayStatData: Number(Number(toDayStatData.avg_dns_tcp).toFixed(4) / 1000),
        allStatData: Number(Number(allStatData.avg_dns_tcp).toFixed(4) / 1000),
      },
      {
        item: '请求html的时间',
        toDayStatData: Number(Number(toDayStatData.avg_res_html).toFixed(4) / 1000),
        allStatData: Number(Number(allStatData.avg_res_html).toFixed(4) / 1000),
      },
      {
        item: '请求js的时间',
        toDayStatData: Number(Number(toDayStatData.avg_res_js).toFixed(4) / 1000),
        allStatData: Number(Number(allStatData.avg_res_js).toFixed(4) / 1000),
      },
      {
        item: 'js dom css解析时间',
        toDayStatData: Number(Number(toDayStatData.avg_parse_resources).toFixed(4) / 1000),
        allStatData: Number(Number(allStatData.avg_parse_resources).toFixed(4) / 1000),
      },
      {
        item: 'dom 渲染',
        toDayStatData: Number(Number(toDayStatData.avg_dom_render).toFixed(4) / 1000),
        allStatData: Number(Number(allStatData.avg_dom_render).toFixed(4) / 1000),
      },
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['toDayStatData', 'allStatData'],
      // 展开字段集
      key: 'user',
      // key字段
      value: 'score', // value字段
    });
    const cols = {
      // score: {
      //   min: 0,
      //   max: 80,
      // },
    };

    return (
      <Card title="耗时占比">
        <div className="performance-one">
          <Chart
            height={270}
            data={dv}
            padding="auto"
            scale={cols}
            forceFit
          >
            <Coord type="polar" radius={0.8} />
            <Axis
              name="item"
              line={null}
              tickLine={null}
              grid={{
                lineStyle: {
                  lineDash: null,
                },
                hideFirstLine: false,
              }}
            />
            <Tooltip />
            <Axis
              name="score"
              line={null}
              tickLine={null}
              grid={{
                type: 'polygon',
                lineStyle: {
                  lineDash: null,
                },
                alternateColor: 'rgba(0, 0, 0, 0.04)',
              }}
            />
            <Legend name="user" marker="circle" offset={30} />
            <Geom type="line" position="item*score" color="user" size={2} />
            <Geom
              type="point"
              position="item*score"
              color="user"
              shape="circle"
              size={4}
              style={{
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1,
              }}
            />
          </Chart>
        </div>
      </Card>
    );
  }
}

