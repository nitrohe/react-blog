import style from '../style.css'
import React from 'react'
import {Button} from 'antd'
export const ManageArticleCell = (props)=>(
    <div className={style.cellContainer}>
    
        <div className={style.cellAboutArticle}>
            <p className={style.articleTitle}>{props.data.title}</p>
            <p className={style.articleInfo}>
                <span>作者:{props.data.author}</span>
                <span>阅读数:{props.data.viewCount}</span>
                <span>评论数:{props.data.commentCount}</span>
                <span>发表时间:{props.data.time}</span>
            </p>
        </div>
        <div className={style.cellState}>
            <span>
                {props.data.isPublish?'已发布':'草稿'}
            </span>
        </div>
        <div className={style.cellOperation}>
            <Button onClick={()=>{props.edit_article(props.data._id);props.history.push('/admin.html/manageArticleAdd')}}>编辑</Button>
            <Button  style={{marginLeft:'15px'}} onClick={()=>props.delete(props.data._id)}>删除</Button>

        </div>
    </div>
);
