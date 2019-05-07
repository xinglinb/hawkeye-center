import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'dva/router';

import MyHeader from './components/my-header';

import Performance from '../../routes/performance/index';
import ErrorMoniter from '../../routes/error-moniter/index';
import AddProject from '../../routes/add-project/index';

import './index.less';

const { Header, Content, Footer } = Layout;


export default ({ history }) => (
  <div>
    <Layout>
      <Header className="layout-header">
        <MyHeader history={history} />
      </Header>
      <Content className="layout-content">
        <div className="content">
          <Switch>
            <Route path="/errorMoniter" component={ErrorMoniter} />
            <Route path="/addProject" component={AddProject} />
            <Route path="/" exec component={Performance} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
          Hawk eye ©2019 Created by xingli
      </Footer>
    </Layout>
  </div>
);

