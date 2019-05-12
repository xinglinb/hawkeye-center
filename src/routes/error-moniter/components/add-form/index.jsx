import React from 'react';
import {
  Form, Input, Slider, Modal,
} from 'antd';

import './index.less';


@Form.create({ name: 'add_form' })
export default class LoginForm extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'errorMoniter/addErrorType',
          payload: values,
        });
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { isAddTypeModelVisible, form, dispatch } = this.props;
    const { getFieldDecorator } = form;

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
      <Modal
        title="添加监控项"
        okText="确定"
        visible={isAddTypeModelVisible}
        onOk={() => { this.handleSubmit(); }}
        onCancel={() => {
          dispatch({
            type: 'errorMoniter/hideVisible',
            payload: 'isAddTypeModelVisible',
          });
        }}
      >
        <Form className="add-form" {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="监控项名称">
            {getFieldDecorator('type_name', {
              rules: [{ required: true, message: 'Please input your type_name!', whitespace: true }],
            })(
              <Input />
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
            {getFieldDecorator('param_one', {
              initialValue: 'message',
              rules: [{ required: true }],
            })(
              <Input disabled />
            )}
          </Form.Item>

          <Form.Item label="字段2">
            {getFieldDecorator('param_two', {
              initialValue: 'actionType',
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="字段3">
            {getFieldDecorator('param_three', {
              // initialValue: 'req',
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="字段4">
            {getFieldDecorator('param_four', {
              // initialValue: 'res',
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="字段5">
            {getFieldDecorator('param_five', {
              // initialValue: 'res',
            })(
              <Input />
            )}
          </Form.Item>

        </Form>
      </Modal>
    );
  }
}
