import React from 'react';
import { connect } from 'dva';

import './index.less';


import RegisterForm from './components/register-form/index';

@connect(({ login }) => ({ login }))
export default class Register extends React.Component {
  render() {
    const { dispatch, history } = this.props;
    return (
      <div className="register">
        <p className="register-title">P2P平台的风险预测系统</p>
        <p className="register-note">史上最强的P2P平台的风险预测系统</p>
        <RegisterForm dispatch={dispatch} history={history} />
      </div>
    );
  }
}

