import React,{Component} from 'react'
import style from './style.css'

import {computeTimeAgo} from '@mlib/utils/util.js'

export default class CommentBox extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let _this = this;
        let commentData = this.props.data.length>10?this.props.data.slice(0,10):this.props.data;

        let commentList = commentData.map((item,index)=>(
            <div className={style.commentBoxCell} key={index}>
                <img className={style.commentBoxCellImg} src={item.img} />
                <div className={style.commentBoxCellInfo} >
                    <div className={style.commentBoxCellInfoRow} >
                        <span className={style.commentBoxCellVisitor}>{item.visitor}</span>
                        <span className={style.commentBoxCellTime}>{computeTimeAgo(item.time,1)}</span>
                    </div>
                    <span className={`${style.moTextOverflow} ${style.commentBoxCellComment}`} >
                        {item.comment}
                    </span>
                </div>

            </div>
        ))


        return(


            <div className={style.commentBox}>
                <div >
                    <div className={style.mainRtitle}>
                        <h4><span><em></em>最新评论</span></h4>
                    </div>
                    <div className={style.newCommentList}>
                        {commentList}
                    </div>
                </div>
            </div>



        )
    }

}
