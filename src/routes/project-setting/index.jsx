import React from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';

import './index.less';

import MySetting from './components/my-setting/index';
import ProjectSet from './components/project-set/index';

import app from '../../app';
import projectSettingModel from './models/project-setting';

app.model(projectSettingModel);

@connect(({ projectSetting }) => ({ projectSetting }))
export default class ProjectSetting extends React.Component {
  state = {
    currentSetting: 'people',
  }
  render() {
    const { currentSetting } = this.state;
    return (
      <div className="error-detail">
        <Menu
          style={{ width: 256 }}
          selectedKeys={[currentSetting]}
          onSelect={({ key }) => {
            this.setState({
              currentSetting: key,
            });
          }}
          mode="inline"
        >
          <Menu.Item key="people">
                  个人设置
          </Menu.Item>
          <Menu.Item key="project">
                  项目设置
          </Menu.Item>
        </Menu>
        {currentSetting === 'people' && <MySetting />}
        {currentSetting === 'project' && <ProjectSet />}
      </div>
    );
  }
}

