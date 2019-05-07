import React from 'react';
import {
  Form, Input, Slider,
} from 'antd';

import './index.less';


@Form.create({ name: 'add_form' })
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

    const marks = {
      0: 0,
      0.5: 0.5,
      1: 1,
    };

    return (
      <div>
        <Form className="add-form" {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="监控项名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="mid">
            {getFieldDecorator('mid', {
              initialValue: 11,
              rules: [{ required: true }],
            })(
              <Input disabled />
            )}
          </Form.Item>
          <Form.Item label="采样率">
            {getFieldDecorator('slider', {
              initialValue: 1,
            })(
              <Slider max={1} min={0} marks={marks} />
            )}
          </Form.Item>

          <Form.Item label="自定义字段1">
            {getFieldDecorator('one', {
              initialValue: 'message',
              rules: [{ required: true }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item label="字段2">
            {getFieldDecorator('two', {
              initialValue: 'actionType',
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="字段3">
            {getFieldDecorator('three', {
              initialValue: 'req',
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="字段4">
            {getFieldDecorator('four', {
              initialValue: 'res',
            })(
              <Input />
            )}
          </Form.Item>

        </Form>
      </div>
    );
  }
}
