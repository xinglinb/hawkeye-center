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
        <RegisterForm dispatch={dispatch} history={history} />
      </div>
    );
  }
}

