import React,{Component} from 'react'
import style from './style.css'

import LoginBox from "../loginBox/LoginBox";
import {Icon} from 'antd';
import QueueAnim from 'rc-queue-anim';

export default class MenuBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:this.props.categories[0],
            menuOpen:false
        }
        this.scrollTop = 0;
    }

    handleClick = (e, align="horizontal") => {
        if(e == this.state.current) {
            return ;
        }

        window.scrollTo(0,0);
        let toPath = e === 'Home'?'/':'/'+e;
        this.setState({
            current: e,
        });
        if(align == 'vertical') {
            this.setState({menuOpen:!this.state.menuOpen});
        }
        this.props.history.push(toPath);
    };
    handleMenuClick = (e) => {
        if(e == this.state.current) {
            return ;
        }

        this.setState({menuOpen:!this.state.menuOpen});
    };

    render(){
        let _this = this;

        let liList = this.props.categories.map((item,index)=>(
            <li key={index} className={item.name === _this.state.current ?  style.menuItemSel : style.menuItem} onClick={_this.handleClick.bind(this,item.name)}> {item.index} </li>
        ));
        let liListCell = this.props.categories.map((item,index)=>(
            <li key={index} className={item.name === _this.state.current ?  style.menuItemSelCell : style.menuItemCell} onClick={_this.handleClick.bind(this,item.name,"vertical")}> {item.index} </li>
        ));
        let ulStyle = {right: _this.state.menuOpen?'0px':'-60px', transition: 'all .3s linear .1s'};
        return(

            <div className={style.menuBar}>

                <div className={style.menuLogo}>
                    <img className={style.menuLogoImg} style={{width:106,height:30}} title="Nitrohe的博客" src={require('./logo_black_2.png')} />
                </div>
                <div className={style.menuLogin}>
                    <LoginBox />
                </div>
                <div className={style.menuNav}>
                    <ul className={style.menuNavUl}>
                        { liList }
                    </ul>
                    <div className={style.menuNavUlIconCell} onClick={_this.handleMenuClick.bind(this)}>
                        {_this.state.menuOpen ? <Icon type="close"  /> : <Icon type="bars"  />}

                    </div>
                    <ul className={ style.menuNavUlCell } style={ulStyle}>
                        { liListCell }
                    </ul>

                </div>

            </div>

        )
    }

    componentDidMount() {
        this.setState({
            //current:this.props.history.location.pathname.replace('\/','')||'首页'
            current:this.props.history.location.pathname.replace('\/','')||'Home'
        })
    }

}
