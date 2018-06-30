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
                if(this.props.modalState)
                    this.props.login(values.userName,values.password);
                else
                    this.props.register(values);
                this.props.callBack(false);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let _this = this;
        const {modalState} = this.props;
        let modalBut = modalState?"登录" : "注册";
        return (
            <Form onSubmit={_this.handleLogin.bind(_this)} className={style.loginFormStyle}>
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
                {
                    !modalState&&
                    <FormItem>
                        {getFieldDecorator('passwordRe', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="再次输入密码"/>
                        )}
                    </FormItem>
                }

                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        {modalBut}
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const LoginForm = Form.create()(LoginFormCom);

export default LoginForm
