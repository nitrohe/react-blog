import React,{Component} from 'react'
import style from './style.css'

export default class BackTop extends Component{
    constructor(props){
        super(props);
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

}
