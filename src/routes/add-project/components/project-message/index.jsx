import React from 'react';
import {
  Form, Input, Select, Button,
} from 'antd';

import './index.less';

const { TextArea } = Input;
const Option = Select.Option;


@Form.create({ name: 'project_message' })
export default class ProjectMessage extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push('/addProject/projectSetting');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item label="绑定的邮箱" >
            {getFieldDecorator('email', {
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
            {getFieldDecorator('three', {
              initialValue: ['jack', 'lucy'],
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={() => {}}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled">Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="简介">
            {getFieldDecorator('one', {
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
