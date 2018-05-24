import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'
import LoginModal from "../loginModal/LoginModal";

export default class LoginBox extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {
            //current:this.props.categories[0]
            loginMenuShow:'none',
            modalVisible: false

        }
    }

    handleMousemove = (e) => {
        this.setState({loginMenuShow: 'block'});
    };
    handleMouseout = (e) => {
        this.setState({loginMenuShow: 'none'});
    };
    handleLoginClick = (e) => {
        this.setState({loginMenuShow: 'none'});
    };
    handleShowModal = () => {
      this.setState({modalVisible: true});
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
             this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ modalVisible: false });
    }
    handleSubmit = () => {
        this.setState({ modalVisible: false });
    }
    render(){
        let _this = this;
        let visible = this.state.loginMenuShow;

        return(


            <div className={style.loginBox}>

                <div className={style.loginInfo} onMouseMove={this.handleMousemove.bind(this)}  onMouseOut={this.handleMouseout.bind(this)}>
                    <img src={require('./visitor.png')} />
                    <a href="###">注册</a>

                    <div className={style.loginMenu} style={{display:visible}}>
                        <a  href="###" onClick={this.handleShowModal.bind(this)}>账号登录</a>
                        <a href="###">QQ登录</a>
                    </div>
                </div>

                <LoginModal modalShow={this.state.modalVisible} onHandleCancel={this.handleCancel} onHandleSubmit={this.handleSubmit}/>

            </div>



        )
    }

    componentDidMount() {
        this.setState({
            //current:this.props.history.location.pathname.replace('\/','')||'首页'
        })
    }

}
