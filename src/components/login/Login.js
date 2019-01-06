import React, {Component} from 'react'
import style from './style.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as IndexActions} from '@reducers/index'
import PureRenderMixin from 'react-addons-pure-render-mixin'
const {get_login} = IndexActions;

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class LoginForm  extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.userName,values.password);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {login} = this.props;
        return (
            <div className={style.login}>
                <Form onSubmit={this.handleLoginSubmit} className={style.loginForm}>
                    <FormItem>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(
                        <Checkbox>记住我</Checkbox>
                      )}
                      <a className={style.loginFormForgot} href="">忘记密码</a>
                      <Button type="primary" htmlType="submit" className={style.loginFormButton}>
                        登陆
                      </Button>
                      <a href="" className={style.loginFormRegister} onClick={()=>{this.props.history.push(`/admin.html/register/`)}}>注册</a>
                    </FormItem>
                  </Form>

            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        //console.log("nextProps---",nextProps);
        if(nextProps.userInfo && nextProps.userInfo.userType) {
            console.log('this.props.userInfo--2=',this.props.userInfo)
            this.props.history.push(`/admin.html/`);
        }
    }

}


function mapStateToProps(state) {
    return{
        userInfo: state.globalState.userInfo,
        isFetching: state.globalState.isFetching
    }
}
function mapDispatchToProps(dispatch) {
    return{
        login: bindActionCreators(get_login, dispatch)
    }
}

const Login = Form.create()(LoginForm);

Login.defaultProps = {
    userInfo:[]
};

Login.propTypes = {

};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
