import React from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Steps } from 'antd';
import { Route, Switch } from 'dva/router';

import './index.less';

import app from '../../app';
import AddProjectrModel from './models/add-project';

import ProjectMessage from './components/project-message';
import ProjectSetting from './components/project-setting';
import AddSdk from './components/add-sdk/';
import AddFinished from './components/add-finished/';

const Step = Steps.Step;

app.model(AddProjectrModel);

@connect(({ AddProject }) => ({ AddProject }))
export default class AddProject extends React.Component {
  state = {
    current: 0,
  }

  render() {
    const { match, location } = this.props;
    let current = 0;
    switch (location.pathname) {
      case '/addProject/projectMessage':
        current = 0; break;
      case '/addProject/projectSetting':
        current = 1; break;
      case '/addProject/addSdk':
        current = 2; break;
      case '/addProject/addFinished':
        current = 3; break;
      default: break;
    }
    return (
      <div className="add-project">
        <Row gutter={16} className="performance-row">
          <Col span={24}>
            <Card className="card">
              <Steps current={current}>
                <Step title="填写项目信息" />
                <Step title="填写项目设置" />
                <Step title="在项目中植入 SDk" />
                <Step title="完成" />
              </Steps>

              <Switch>
                <Route path={`${match.url}/projectMessage`} component={ProjectMessage} />
                <Route path={`${match.url}/projectSetting`} component={ProjectSetting} />
                <Route path={`${match.url}/addSdk`} component={AddSdk} />
                <Route path={`${match.url}/addFinished`} component={AddFinished} />
              </Switch>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

