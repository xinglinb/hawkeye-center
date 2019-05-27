import React from 'react';
import { Form, Select, Input, Button, message } from 'antd';

import './index.less';

// const InputGroup = Input.Group;
const Option = Select.Option;

@Form.create({ name: 'normal_login' })
export default class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        message.success('注册成功');
        this.props.history.push('/');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item>
          {getFieldDecorator('e_mail', {
            rules: [{
              type: 'email', message: '输入正确的邮箱格式',
            }, { required: true, message: '邮箱' }],
          })(
            <Input size="large" placeholder="邮箱" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '输入密码' }, { min: 6, message: '至少6位密码，区分大小写' }],
          })(
            <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '确认密码' }, { min: 6, message: '至少6位密码，区分大小写' }],
          })(
            <Input size="large" type="password" placeholder="确认密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{
              required: true, message: '输入手机号！',
            }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="手机号" size="large" />
          )}
        </Form.Item>
        <div >
          <Button size="large" type="primary" htmlType="submit" className="register-form-button">
            注册
          </Button>
          <a
            onClick={() => {
              this.props.history.push('/login');
            }}
            className="login-now"
          >使用已有账户登录</a>
        </div>

      </Form>

    );
  }
}
