import React from 'react';
import {
  Form, Input, Button, Switch, Icon,
} from 'antd';

import './index.less';


@Form.create({ name: 'project_message' })
export default class ProjectMessage extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push('/addProject/addSdk');
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
        <Form className="project-setting" {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="pid">
            {getFieldDecorator('pid', {
              initialValue: 'chhdhjsjhbdchjsb',
              rules: [{ required: true }],
            })(
              <Input disabled />
            )}
          </Form.Item>

          <Form.Item label="性能是否开启">
            {getFieldDecorator('three', {
              initialValue: true,
            })(
              <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
            )}
          </Form.Item>

          <Form.Item label="错误报警是否开启">
            {getFieldDecorator('one', {
              initialValue: true,
            })(
              <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
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
