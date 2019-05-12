import React from 'react';
import { connect } from 'dva';
import { Menu, Icon, Select, Avatar, Button, Dropdown } from 'antd';

import './index.less';

const Option = Select.Option;

@connect(({ login }) => ({ login }))
export default class MyHeader extends React.Component {
  state = {
    pathname: '',
  }

  componentDidMount() {
    const { history = {}, dispatch } = this.props;
    dispatch({
      type: 'login/getUserInfo',
    });
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
    this.props.dispatch({
      type: 'login/loginout',
    });
  }
  render() {
    const { pathname } = this.state;
    const { login, history } = this.props;
    const { userInfo = {}, projects = [], pid } = login.bizData;

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
          <i className="iconfont logo">&#xe61d;</i>
          <p className="logo-title">Hawk eye</p>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[pathname]}
            style={{ lineHeight: '64px' }}
            onSelect={({ key }) => { history.push(key); }}
          >
            <Menu.Item key="/" disabled={!projects.length}>
              <Icon type="dashboard" />性能监控
            </Menu.Item>
            <Menu.Item key="/errorMoniter" disabled={!projects.length}>
              <Icon type="warning" />错误报警
            </Menu.Item>
            <Menu.Item key="/projectSetting" disabled={!projects.length}>
              <Icon type="setting" />项目设置
            </Menu.Item>
          </Menu>
        </div>
        <div className="header-right">
          <Select
            value={[pid ? Number(pid) : '']}
            showSearch
            className="project-select"
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.changeProject}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              projects.map(item => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))
            }
          </Select>

          <Button onClick={() => { history.push('/addProject/projectMessage'); }} className="add-button" type="dashed" icon="plus">添加项目</Button>

          <Dropdown overlay={userMenu}>
            <div className="header-avatar">
              <Avatar size="small" src={userInfo.avatar} />
              <span>{userInfo.name}</span>
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}
