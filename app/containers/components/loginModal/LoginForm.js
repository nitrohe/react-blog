import React, {Component} from 'react'
import {Input, Form, Icon, Button} from 'antd'
const FormItem = Form.Item;
import style from './style.css'

class LoginFormCom extends Component {
    constructor(props) {
        super(props);
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.userName,values.password)
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleLogin} className={style.loginFormStyle}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 14}}/>} placeholder="账号"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 14}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const LoginForm = Form.create()(LoginFormCom);

export default LoginForm
