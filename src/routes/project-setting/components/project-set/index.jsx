import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button } from 'antd';

import './index.less';

const { TextArea } = Input;
const Option = Select.Option;

@connect(({ addProject, projectSetting }) => ({ addProject, projectSetting }))
@Form.create({ name: 'project_set' })
export default class ProjectSet extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'addProject/getUsers',
    });
    this.props.dispatch({
      type: 'projectSetting/getOldProjectSetting',
    });
  }
  handleSubmit = (e) => {
    const { projectSetting } = this.props;
    const { projectInfo = {} } = projectSetting.bizData;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'projectSetting/updateprojectSetting',
          payload: {
            ...projectInfo,
            ...values,
          },
        });
      }
    });
  }

  render() {
    const { form, addProject, projectSetting } = this.props;
    const { getFieldDecorator } = form;
    const { users = [] } = addProject.bizData;
    const { projectInfo = {} } = projectSetting.bizData;
    const { name, e_mail, introduction, members = [] } = projectInfo;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };

    return (
      <div className="project-set">
        <Form className="setting-form" {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="项目名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
              initialValue: name,
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item label="绑定的邮箱" >
            {getFieldDecorator('e_mail', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
              initialValue: e_mail,
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item label="项目成员">
            {getFieldDecorator('members', {
              initialValue: members,
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                onChange={() => {}}
              >
                {
                  users.map(item => (
                    <Option value={item.Id} key={item.Id}>{item.name}</Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>

          <Form.Item label="简介">
            {getFieldDecorator('introduction', {
              rules: [{ required: true }],
              initialValue: introduction,
            })(
              <TextArea autosize={{ minRows: 3, maxRows: 6 }} />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
          </Form.Item>

        </Form>
      </div>
    );
  }
}
