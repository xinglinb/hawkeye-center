import React from 'react';
import { Row, Col, Card } from 'antd';

import One from './components/one';
import Two from './components/two';
import Three from './components/three';
import Four from './components/four';

import './index.less';

export default class ErrorMoniter extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="error-moniter">
        <Row gutter={16}>
          <Col span={16}>
            <Card className="error-one">
              <One />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="error-one">
              <div className="card-box">
                <Two />
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card className="error-one">
              <div className="card-box">
                <Three />
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="error-one">
              <div className="card-box">
                <Four />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

