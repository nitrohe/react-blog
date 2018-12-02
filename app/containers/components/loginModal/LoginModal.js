import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'

import { Modal, Button } from 'antd';
import LoginForm from './LoginForm'

export default class LoginModal extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {
            //current:this.props.categories[0]
            //loginMenuShow:'none',
            loading: false,
            visible: true
        }
    }
    onHandleLogin = (e) => {
        onHandleCb={this.handleSubmit} onHandleLogin={login}
    };


    render(){
        let _this = this;
        //let modalVisible = this.props.modalShow;
        const {modalShow, onHandleCancel, onHandleCb} = this.props;
        const loading = this.state.loading;

        return(

            <div>

                <Modal
                    visible={modalShow}
                    title="登录"
                    onOk={onHandleCancel}
                    onCancel={onHandleCancel}
                    width="700"
                    style={{ top: 30 }}
                    footer={[]}
                >

                    <div className={style.loginModal}>
                        <div className={style.loginModalLeft}>
                            <div className={style.loginLabel}>账号登录</div>
                            <LoginForm login={this.onHandleLogin} register={this.props.onHandleRegister}/>
                        </div>


                        <div className={style.loginModalRight}>
                            <div className={style.loginLabel}>快速登录</div>
            				<a className={style.wbLogin} href="javascript:;">
            					<i></i>
            					<span>新浪微博登录</span>
            				</a>
            				<a className={style.qqLogin} href="javascript:;">
            					<i></i>
            					<span>QQ登录</span>
            				</a>
                        </div>
                    </div>



                </Modal>

            </div>



        )
    }

    componentDidMount() {
        this.setState({
            //current:this.props.history.location.pathname.replace('\/','')||'首页'
        })
    }

}
