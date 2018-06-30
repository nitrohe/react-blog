import React,{Component} from 'react'
import style from './style.css'

export default class FootBar extends Component{
    constructor(props){
        super(props);
    }


    render(){

        return(

            <div className={style.footBar}>
                <div className={style.footContent}>
                    <a  data-index="关于本站">关于本站</a>
                    <a  data-index="联系博主">联系博主</a>
                    <a  data-index="意见反馈">意见反馈</a>
                    <p>Copyright © 2017 Nitrohe. All Rights Reserved | 京ICP备17035861</p>
                </div>
            </div>

        )
    }

}
