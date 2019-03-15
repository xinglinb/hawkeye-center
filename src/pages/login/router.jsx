
import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import LoginForm from './login-form/';

export default({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/loginer" component={LoginForm} />
      <Redirect from="*" to="/loginer" />
    </Switch>
  </Router>
);

