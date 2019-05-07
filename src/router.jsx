
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/login/index';
import MainLayout from './layout/main-layout/index';

export default({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={MainLayout} />
    </Switch>
  </Router>
);

