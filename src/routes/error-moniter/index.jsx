import React from 'react';
import { connect } from 'dva';
import { Row, Col, Icon } from 'antd';

import ErrorCard from './components/error-card/';
import AddForm from './components/add-form/';

import './index.less';

import app from '../../app';
import errorMoniterModel from './models/error-moniter';

app.model(errorMoniterModel);

@connect(({ errorMoniter }) => ({ errorMoniter }))
export default class ErrorMoniter extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'errorMoniter/getErrorMoniterData',
    });
    setInterval(() => {
      this.props.dispatch({
        type: 'errorMoniter/getErrorMoniterData',
      });
    }, 1000 * 60);
  }

  render() {
    const { history, dispatch } = this.props;
    const { errorMoniter } = this.props;
    const { errorStatData = [] } = errorMoniter.bizData;
    const { isAddTypeModelVisible } = errorMoniter.uiData;
    return (
      <div className="error-moniter">
        <Row gutter={16}>
          {
            errorStatData.map((item, index) => (
              <Col span={8} key={item.mid} className={index > 2 ? 'moniter-row' : ''}>
                <ErrorCard history={history} errorStatData={item} dispatch={dispatch} />
              </Col>
            ))
          }
          <Col span={8} className={errorStatData.length > 2 ? 'moniter-row' : ''}>
            <div
              className="add-moniter"
              onClick={() => {
                dispatch({
                  type: 'errorMoniter/showVisible',
                  payload: 'isAddTypeModelVisible',
                });
              }}
            >
              <Icon type="plus" />
              <p>添加监控项</p>
            </div>
          </Col>
        </Row>
        <AddForm isAddTypeModelVisible={isAddTypeModelVisible} dispatch={dispatch} />
      </div>
    );
  }
}

