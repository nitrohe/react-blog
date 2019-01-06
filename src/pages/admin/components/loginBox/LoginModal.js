import React,{Component} from 'react'
import style from './style.css'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//import {actions as FrontActinos} from '../../../reducers/frontReducer'
import {actions as IndexActions} from '@reducers/index'
const {get_login,get_register} = IndexActions;

import { Modal, Button } from 'antd';
import LoginForm from './LoginForm'

class LoginModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            //current:this.props.categories[0]
            //loginMenuShow:'none',
            loading: false,
            visible: true
        }
    }
    handleLogin = (e) => {

    };


    render(){
        let _this = this;
        //let modalVisible = this.props.modalShow;
        const {modalShow, modalState, onHandleCb} = this.props;
        const {login, register} = this.props;
        //const loading = this.state.loading;
        let modalTitle = modalState?"登录" : "注册";

        return(

            <div>

                <Modal
                    visible={modalShow}
                    title={modalTitle}
                    onOk={() => onHandleCb(false)}
                    onCancel={() => onHandleCb(false)}
                    width="700px"
                    style={{ top: 30 }}
                    footer={[]}
                >

                    <div className={style.loginModal}>
                        <div className={style.loginModalLeft}>
                            <div className={style.loginLabel}>{`账号${modalTitle} `}</div>
                            <LoginForm login={login} register={register} callBack={onHandleCb} modalState={modalState}/>
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

}

LoginModal.defaultProps = {
    userInfo:[]
};

LoginModal.propTypes = {

};

function mapStateToProps(state) {
    return{
        userInfo: state.globalState.userInfo,
        isFetching: state.globalState.isFetching
    }
}
function mapDispatchToProps(dispatch) {
    return{
        login: bindActionCreators(get_login, dispatch),
        register: bindActionCreators(get_register, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal)
