import React from 'react';
import { connect } from 'dva';
import { Statistic, Card, Row, Col } from 'antd';

import PerformanceDetail from './components/performance-detail';
import PerformanceOne from './components/performance-one';
import PerformanceTwo from './components/performance-two';

import './index.less';

import app from '../../app';
import performanceModel from './models/performance';

app.model(performanceModel);

@connect(({ performance }) => ({ performance }))
export default class Performance extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'performance/getPerformanceData',
    });
  }
  render() {
    const { performance } = this.props;
    const { statData = {}, sevenAvgAllTime = [] } = performance.bizData;
    const { toDayStatData = {}, allStatData = {} } = statData;
    return (
      <div className="performance">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="今日总访问量" value={toDayStatData.tatol || 0} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="今日平均访问时间 (ms)" value={toDayStatData.avg_all_time} precision={4} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="历史总访问量" value={allStatData.tatol || 0} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="历史平均访问时间 (ms)" value={allStatData.avg_all_time} precision={4} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} className="performance-row">
          <Col span={24}>
            <PerformanceDetail statData={statData} />
          </Col>
        </Row>
        <Row gutter={16} className="performance-row">
          <Col span={12}>
            <PerformanceOne sevenAvgAllTime={sevenAvgAllTime} />
          </Col>
          <Col span={12}>
            <PerformanceTwo statData={statData} />
          </Col>
        </Row>
      </div>
    );
  }
}

