import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './index.less';

@Form.create({ name: 'normal_login' })
export default class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.history.push('/');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your e_mail!' }, {
              type: 'email', message: 'The input is not valid E-mail!',
            }],
          })(
            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <div >
          <Checkbox>记住密码</Checkbox>
          <a className="forget" >忘记密码!</a>
        </div>
        <div >
          <Button size="large" type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </div>
        <div >
          <a
            onClick={() => {
              this.props.history.push('/register');
            }}
            className="register-now"
          >注册账户!</a>
        </div>
      </Form>
    );
  }
}
