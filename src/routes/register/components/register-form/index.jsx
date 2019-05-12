import React from 'react';
import { Card, Form, Icon, Input, Button } from 'antd';
import Logo from 'ROOT/components/Logo/';

import './index.less';

@Form.create({ name: 'normal_login' })
export default class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/register',
          payload: values,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="back">
        <Logo className="register-logo" />
        <Card bordered={false} className="register-card">
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(
                <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="name" />
              )}
            </Form.Item>
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
            <Form.Item>
              {getFieldDecorator('e_mail', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="e_mail" />
              )}
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" className="register-form-button">
                注册
              </Button>
              <a
                onClick={() => {
                  this.props.history.push('/login');
                }}
                className="login-now"
              >login now!</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
