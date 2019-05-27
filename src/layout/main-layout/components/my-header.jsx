import React from 'react';
import { connect } from 'dva';
import { Menu, Icon, Avatar, Input, Dropdown } from 'antd';

import './index.less';

const Search = Input.Search;

@connect(({ login }) => ({ login }))
export default class MyHeader extends React.Component {
  state = {
    pathname: '',
  }

  componentDidMount() {
    const { history = {} } = this.props;
    // dispatch({
    //   type: 'login/getUserInfo',
    // });
    history.listen(({ pathname }) => {
      this.setState({ pathname });
    });
  }
  changeProject = (pid) => {
    this.props.dispatch({
      type: 'login/changeProject',
      payload: pid,
    });
  }
  loginout = () => {
    const { history = {} } = this.props;
    history.push('/login');
  }
  render() {
    const { pathname } = this.state;
    const { login, history } = this.props;
    const { userInfo = {} } = login.bizData;

    const userMenu = (
      <Menu>
        <Menu.Item key="0" onClick={this.loginout}>
          <Icon type="poweroff" />注销
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="header-content">
        <div className="header-left">
          {/* <i className="iconfont logo">&#xe61d;</i> */}
          <p className="logo-title">P2P借贷平台的风险预测系统</p>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[pathname]}
            style={{ lineHeight: '64px' }}
            onSelect={({ key }) => { history.push(key); }}
          >
            <Menu.Item key="/">
              <Icon type="dashboard" />平台基本信息
            </Menu.Item>
            <Menu.Item key="/1111">
              <Icon type="dot-chart" />平台风险预测
            </Menu.Item>
            <Menu.Item key="/errorMoniter">
              <Icon type="warning" />行业风险分析
            </Menu.Item>
            <Menu.Item key="/projectSetting">
              <Icon type="setting" />个人中心
            </Menu.Item>
          </Menu>
        </div>
        <div className="header-right">
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />

          <Dropdown overlay={userMenu}>
            <div className="header-avatar">
              <Avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
              <span>{userInfo.name}</span>
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}
