import React from 'react';
import { Menu, Icon, Select, Avatar, Button } from 'antd';

import './index.less';

const Option = Select.Option;

export default class MyHeader extends React.Component {
  state = {

  }
  render() {
    const { history } = this.props;
    return (
      <div className="header-content">
        <div className="header-left">
          <i className="iconfont logo">&#xe61d;</i>
          <p className="logo-title">Hawk eye</p>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[history.location.pathname]}
            style={{ lineHeight: '64px' }}
            onSelect={({ key }) => { history.push(key); }}
          >
            <Menu.Item key="/">
              <Icon type="dashboard" />性能监控
            </Menu.Item>
            <Menu.Item key="/errorMoniter">
              <Icon type="warning" />错误报警
            </Menu.Item>
            <Menu.Item key="/projectSetting">
              <Icon type="setting" />项目设置
            </Menu.Item>
          </Menu>
        </div>
        <div className="header-right">
          <Select
            value={['jack']}
            showSearch
            className="project-select"
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={() => { }}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">HFUT online</Option>
            <Option value="lucy">Hawk eye</Option>
          </Select>

          <Button onClick={() => { history.push('/addProject/projectMessage'); }} className="add-button" type="dashed" icon="plus">添加项目</Button>
          <div className="header-avatar">
            <Avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
            <span>Hawk eye</span>
          </div>
        </div>
      </div>
    );
  }
}
