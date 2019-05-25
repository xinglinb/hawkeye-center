import React from 'react';
import { Form, Select, Input, Button } from 'antd';

import './index.less';

const InputGroup = Input.Group;
const Option = Select.Option;

@Form.create({ name: 'normal_login' })
export default class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);

        this.props.history.push('/register');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, { required: true, message: '邮箱' }],
          })(
            <Input size="large" placeholder="邮箱" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '至少6位密码，区分大小写' }],
          })(
            <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '确认密码' }],
          })(
            <Input size="large" type="password" placeholder="确认密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('e_mail', {
            rules: [{
              required: true, message: '输入手机号！',
            }],
          })(
            <InputGroup compact>
              <Select size="large" style={{ width: '20%' }} defaultValue="Option1">
                <Option value="Option1">+86</Option>
                <Option value="Option2">Option2</Option>
              </Select>
              <Input size="large" style={{ width: '80%' }} placeholder="手机号" />
            </InputGroup>
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
