import React from 'react';
import { connect } from 'dva';

import './index.less';

import app from '../../app';
import loginModel from './models/index';

import LoginForm from './components/login-form/index';

app.model(loginModel);

@connect(({ login }) => ({ login }))
export default class Entry extends React.Component {
  render() {
    const { dispatch, history } = this.props;
    return (
      <div className="login">
        <LoginForm dispatch={dispatch} history={history} />
      </div>
    );
  }
}

