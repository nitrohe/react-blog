import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'

export default class BackTop extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {
            //current:this.props.categories[0]
        }

    }
    render(){
        let _this = this;
        const {handleClick} = this.props;

        return(

            <div className={style.rollbar} id="back-to-top" >
                <ul>
                    <li>
                        <a onClick={this.props.handleClick}><i className={style.topArrow1}></i><i className={style.topArrow2}></i></a>
                    </li>
                </ul>
            </div>

        )
    }

    componentDidMount() {
        this.setState({
            //current:this.props.history.location.pathname.replace('\/','')||'首页'
        })
    }

}
