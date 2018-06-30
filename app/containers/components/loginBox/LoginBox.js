import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//import {actions as FrontActinos} from '../../../reducers/frontReducer'
import {actions as IndexActions} from '../../../reducers/index'
const {get_login,get_register,get_logout} = IndexActions;

import style from './style.css'
import LoginModal from "./LoginModal";

class LoginBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            //current:this.props.categories[0]
            loginMenuShow:'none',
            modalVisible: false,
            modalState: false,
            userInfo:[]

        }
    }

    handleMousemove = (e) => {
        if(this.state.loginMenuShow != 'block')
            this.setState({loginMenuShow: 'block'});
    };
    handleMouseout = (e) => {
        if(this.state.loginMenuShow != 'none')
            this.setState({loginMenuShow: 'none'});
    };
    handleLoginClick = (e) => {
        this.setState({loginMenuShow: 'none'});
    };
    handleShowModal = (e) => {
      this.setState({modalVisible: true});
      this.setState({modalState: e});
    }
    handleOk = () => {
        //this.setState({ loading: true });
        //setTimeout(() => {
        //     this.setState({ loading: false, visible: false });
        //}, 3000);
    }
    handleCancel = () => {
        //this.setState({ modalVisible: false });
    }
    handleCallback = (visible) => {
        if(this.state.modalVisible != visible)
            this.setState({ modalVisible: visible });
        //if(typeof info != undefined) {
        //    this.setState({ userInfo: info });
        //}
    }
    handleInfoCb = (info) => {
        //this.setState({ userInfo: info });
    }
    handleQuit = (info) => {
        //this.setState({ userInfo: info });
        this.props.get_logout();
        localStorage.setItem('userInfo', '');
    }
    render(){
        let _this = this;
        let visible = this.state.loginMenuShow;
        //const {login, register} = this.props;
        const {userInfo} = this.props;
        //console.log("userInfo 11 ",userInfo);
        let modalState = this.state.modalState;
        let userState = (typeof userInfo.username=='undefined')?true:false;

        return(

            <div className={style.loginBox}>

                <div className={style.loginInfo} onMouseMove={this.handleMousemove.bind(this)}  onMouseOut={this.handleMouseout.bind(this)}>

                    {
                        userState?(
                        <div>
                        <img src={require('./visitor.png')} />
                        <a href="###" onClick={this.handleShowModal.bind(this,false)}>注册</a>
                        <div className={style.loginMenu} style={{display:visible}}>
                            <a  href="###" onClick={this.handleShowModal.bind(this,true)}>登&nbsp;&nbsp;录</a>
                            {/*<a href="###">QQ登录</a>*/}
                        </div></div>):(
                        <div>
                        <img src={userInfo.userimg} />
                        <a href="###" >欢迎</a>
                        <div className={style.loginMenu} style={{display:visible}}>
                            <a  href="###" onClick={this.handleQuit.bind(this,true)}>退&nbsp;&nbsp;出</a>
                        </div></div>)

                    }


                </div>

                <LoginModal modalShow={this.state.modalVisible} modalState={this.state.modalState} onHandleCb={this.handleCallback} />

            </div>



        )
    }

    //componentDidMount() {
    //
    //}

}

LoginBox.defaultProps = {
    userInfo:[]
};

LoginBox.propTypes = {

};

function mapStateToProps(state) {
    return{
        userInfo: state.globalState.userInfo
        //isFetching: state.globalState.isFetching
    }
}
function mapDispatchToProps(dispatch) {
    return{
        //login: bindActionCreators(get_login, dispatch),
        //register: bindActionCreators(get_register, dispatch)
        get_logout: bindActionCreators(get_logout, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginBox)
