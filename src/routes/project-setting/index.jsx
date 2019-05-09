import React from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';


import './index.less';

import app from '../../app';
import projectSettingModel from './models/project-setting';

app.model(projectSettingModel);

@connect(({ projectSetting }) => ({ projectSetting }))
export default class ProjectSetting extends React.Component {
  render() {
    // const { match } = this.props;
    return (
      <div className="error-detail">
        <Menu
          // onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['one']}
          mode="inline"
        >
          <Menu.Item key="one">
                  个人设置
          </Menu.Item>
          <Menu.Item key="two">
                  项目设置
          </Menu.Item>
          <Menu.Item key="three">
                  账户绑定
          </Menu.Item>
        </Menu>
        111
      </div>
    );
  }
}

