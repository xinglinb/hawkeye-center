
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './entry';

export default({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={IndexPage} />
    </Switch>
  </Router>
);

