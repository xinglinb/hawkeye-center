import React from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';

import ErrorChart from './components/error-chart/index';
import ErrorTable from './components/error-table/';

import './index.less';

import app from '../../app';
import errorDetailModel from './models/error-detail';

app.model(errorDetailModel);

@connect(({ errorDetail }) => ({ errorDetail }))
export default class ErrorDetail extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div className="error-detail">
        <Row gutter={16}>
          <Col span={24}>
            <Card title={`错误数据详情（${match.params.mid}）`}>
              <ErrorChart />

              <ErrorTable />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

