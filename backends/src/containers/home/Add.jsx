import React, { Component } from 'react';
import { Form, Input, Select,Button} from 'antd';
import {addUser} from '@/api/login'
const { Option } = Select;

@Form.create({
  name: 'adduserFrom', mapPropsToFields(props) {
      return {
          username: Form.createFormField({
              ...props.username,
              value: 'peiqi',
          }),
          password: Form.createFormField({
              ...props.password,
              value: '123321',
          }),
          type: Form.createFormField({
            ...props.type,
            value:0,
        }),
      };
  },
})
class Add extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
          addUser(values).then(res=>{
            console.log(res.data);
          })
        }
    });
};
    render() {
      const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span:6 }} onSubmit={this.handleSubmit}>
            <Form.Item label="用户名">
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input />)}
        </Form.Item>
       <Form.Item label="密码">
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input />)}
        </Form.Item>
            <Form.Item label="身份">
            {
              getFieldDecorator('type', {
                rules: [{ required: true, message: 'Please input your acount!' }],
            })( <Select>
                <Option value={0}>游客</Option>
                <Option value={1}>管理员</Option>
              </Select>)}
            </Form.Item>
            <Form.Item wrapperCol={{ span:12, offset: 7 }}>
            <Button type="primary" htmlType="submit">
               添加
            </Button>
          </Form.Item>
          </Form>
        )
    }
}

export default Add;