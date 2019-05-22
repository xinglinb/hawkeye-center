import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Avatar } from 'antd';

import './index.less';

@connect(({ login }) => ({ login }))
@Form.create({ name: 'set_my_login' })
export default class MySetting extends React.Component {
  handleSubmit = (e) => {
    const { login } = this.props;
    const { userInfo = {} } = login.bizData;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.dispatch({
        //   type: 'projectSetting/updateMySetting',
        //   payload: {
        //     ...userInfo,
        //     ...values,
        //   },
        // });
      }
    });
  }

  render() {
    const { login, form } = this.props;
    const { getFieldDecorator } = form;
    const { userInfo = {} } = login.bizData;
    return (
      <div className="my-setting">
        <Form onSubmit={this.handleSubmit} className="setting-form">

          <Form.Item>
            {getFieldDecorator('e_mail', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
              initialValue: userInfo.e_mail,
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="e_mail" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: userInfo.password,
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
              initialValue: userInfo.name,
            })(
              <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="phone" />
            )}
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" className="setting-button">
                提交
            </Button>
          </Form.Item>
        </Form>
        <Avatar className="setting-avatar" size={100} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
      </div>
    );
  }
}
