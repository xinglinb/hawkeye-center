import React from 'react';
import { connect } from 'dva';
import {
  Form, Input, Select, Button,
} from 'antd';

import './index.less';

const { TextArea } = Input;
const Option = Select.Option;

@connect(({ addProject, login }) => ({ addProject, login }))
@Form.create({ name: 'project_message' })
export default class ProjectMessage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'addProject/getUsers',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'addProject/createProject',
          payload: values,
        });
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { form, addProject, login } = this.props;

    const { getFieldDecorator } = form;
    const { users = [] } = addProject.bizData;
    const { userInfo = {} } = login.bizData;

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
      <div>
        <Form className="project-message" {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="项目名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
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
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item label="项目成员">
            {getFieldDecorator('members', {
              initialValue: [userInfo.Id || ''],
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
            })(
              <TextArea autosize={{ minRows: 3, maxRows: 6 }} />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>下一步</Button>
          </Form.Item>

        </Form>
      </div>
    );
  }
}
