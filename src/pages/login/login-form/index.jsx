import React from 'react';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';
import Logo from 'ROOT/components/Logo/';

import './index.scss';

@Form.create({ name: 'normal_login' })
export default class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="back">
        <Logo className="login-logo" />
        <Card bordered={false} className="login-card">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a href="" className="register-now">register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
