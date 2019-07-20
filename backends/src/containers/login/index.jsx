import '../../assets/css/login.css'
import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Button} from 'antd';
import 'antd/dist/antd.css'

const mapState2Props = (state) => {
    return state.login
}
@connect(mapState2Props)
@Form.create({
    name: 'loginFrom', mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: 'Pigpig',
            }),
            password: Form.createFormField({
                ...props.password,
                value: '123321',
            }),
        };
    },
})
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'login/login',
                    payload: values
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return <div className='login'>
            <div className='mask'>
                <div>
                    <dl>
                        <dt>
                            <img src='logo.svg' alt='' />
                        </dt>
                        <dd>
                            赚赚金融渠道管理系统
                             </dd>
                    </dl>
                </div>
                <div><Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
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
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit"  onClick={()=>{
                        if(this.props.token){
                           this.props.history.push('/home'); 
                        }  
                    }}>
                        登录
                    </Button>
                </Form.Item>
                </Form>
                </div>
            </div>
        </div>
    }
}


export default Login;
