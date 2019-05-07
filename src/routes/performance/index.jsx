import React from 'react';
import { connect } from 'dva';
import { Statistic, Card, Row, Col, Icon } from 'antd';

import PerformanceDetail from './components/performance-detail';
import PerformanceOne from './components/performance-one';
import PerformanceTwo from './components/performance-two';

import './index.less';

import app from '../../app';
import performanceModel from './models/performance';

app.model(performanceModel);

@connect(({ performance }) => ({ performance }))
export default class Performance extends React.Component {
  render() {
    return (
      <div className="performance">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="Active Users" value={112893} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="arrow-up" />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<Icon type="arrow-down" />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} className="performance-row">
          <Col span={24}>
            <PerformanceDetail />
          </Col>
        </Row>
        <Row gutter={16} className="performance-row">
          <Col span={12}>
            <PerformanceOne />
          </Col>
          <Col span={12}>
            <PerformanceTwo />
          </Col>
        </Row>
      </div>
    );
  }
}

