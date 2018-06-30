import React,{Component} from 'react'
import style from './style.css'

import LoginBox from "../loginBox/LoginBox";

export default class MenuBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:this.props.categories[0]
        }
        this.scrollTop = 0;
    }

    handleClick = (e) => {
        if(e == this.state.current) {
            return ;
        }

        window.scrollTo(0,0);
        let toPath = e === 'Home'?'/':'/'+e;
        this.setState({
            current: e,
        });
        this.props.history.push(toPath);
    };

    render(){
        let _this = this;

        let liList = this.props.categories.map((item,index)=>(
            <li key={index} className={item.name === _this.state.current ?  style.menuItemSel : style.menuItem} onClick={_this.handleClick.bind(this,item.name)}> {item.index} </li>
        ));
        return(

            <div className={style.menuBar}>

                <div className={style.menuLogo}>
                    <img className={style.menuLogoImg} style={{width:106,height:30}} title="Nitrohe的博客" src={require('./logo_black_2.png')} />
                </div>
                <div className={style.menuNav}>
                    <ul className={style.menuNavUl}>
                        { liList }
                    </ul>
                </div>
                <LoginBox />
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
