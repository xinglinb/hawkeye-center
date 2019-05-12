import React from 'react';
import { connect } from 'dva';
import { Icon, Row, Col, Button } from 'antd';

import './index.less';

@connect(({ addProject }) => ({ addProject }))
export default class AddFinished extends React.Component {
  state = {
    result: [{
      title: 'pid',
      content: 'jcbdsjbhjsbdsjh',
    }, {
      title: '项目名称',
      content: 'hawk eye',
    }, {
      title: '绑定的邮箱',
      content: '986294216@qq.com',
    }, {
      title: '项目成员',
      content: 'xingli',
    }, {
      title: '简介',
      content: 'This is a good project',
    }],
  }
  render() {
    const { addProject } = this.props;
    const { newPid, newProject, users } = addProject.bizData;
    const {
      name = '',
      introduction = '',
      e_mail = '',
      members = [],
    } = newProject;
    let memberStr = '';
    members.forEach((uid) => {
      memberStr += `${users.find(({ Id }) => Id === uid).name}, `;
    });
    memberStr = memberStr.slice(0, memberStr.length - 2);
    const result = [{
      title: 'pid',
      content: newPid,
    }, {
      title: '项目名称',
      content: name,
    }, {
      title: '绑定的邮箱',
      content: e_mail,
    }, {
      title: '项目成员',
      content: memberStr,
    }, {
      title: '简介',
      content: introduction,
    }];
    return (
      <div className="add-finished">
        <div className="add-finished-box">
          <Icon className="box-icon" theme="filled" type="check-circle" />
          <p className="box-title">添加成功</p>
        </div>
        <div className="add-finished-result">
          {
            result.map(item => (
              <Row key={item.title} gutter={16}>
                <Col className="result-title" span={8}>
                  {item.title}:
                </Col>
                <Col className="result-content" span={16}>
                  {item.content}
                </Col>
              </Row>
            ))
          }

        </div>

        <Button
          type="primary"
          onClick={() => {
            this.props.history.push('/');
          }}
        >查看监控数据</Button>
      </div>
    );
  }
}
