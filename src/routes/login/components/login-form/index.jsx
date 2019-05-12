import React from 'react';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';
import Logo from 'ROOT/components/Logo/';

import './index.less';

@Form.create({ name: 'normal_login' })
export default class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/login',
          payload: values,
        });
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
              {getFieldDecorator('username', {
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
              <Checkbox>Remember me</Checkbox>
              <a
                onClick={() => {
                  this.props.history.push('/register');
                }}
                className="register-now"
              >register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
