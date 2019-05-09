import React from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Modal } from 'antd';

import ErrorCard from './components/error-card/';
import AddForm from './components/add-form/';

import './index.less';

import app from '../../app';
import errorMoniterModel from './models/error-moniter';

app.model(errorMoniterModel);

@connect(({ errorMoniter }) => ({ errorMoniter }))
export default class ErrorMoniter extends React.Component {
  state = {
    visible: false,
  }

  changeModelVisible = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    const { history } = this.props;
    return (
      <div className="error-moniter">
        <Row gutter={16}>
          <Col span={8}>
            <ErrorCard history={history} title="all Error" />
          </Col>
          <Col span={8}>
            <ErrorCard history={history} title="api Error" />
          </Col>
          <Col span={8}>
            <ErrorCard history={history} title="effect Error" />
          </Col>
          <Col span={8} className="moniter-row">
            <ErrorCard history={history} title="component Error" />
          </Col>
          <Col span={8} className="moniter-row">
            <div className="add-moniter" onClick={() => { this.changeModelVisible(); }}>
              <Icon type="plus" />
              <p>添加监控项</p>
            </div>
          </Col>
        </Row>
        <Modal
          title="添加监控项"
          okText="确定"
          visible={this.state.visible}
          onOk={() => { this.changeModelVisible(); }}
          onCancel={() => { this.changeModelVisible(); }}
        >
          <AddForm />
        </Modal>
      </div>
    );
  }
}

