import React from 'react'
import style from './style.css'

import {Link} from 'react-router-dom'
import {Icon} from 'antd';

export const ArticleListCell = (props)=>(
    <div className={`${style.container} `} onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}} >

        <div className={style.bottomContainer}>
            <p className={style.title}>
                {props.data.title}
            </p>
            <p className={style.summary}>
                {props.data.abstract}
            </p>
            <div>
                <p>
                    <span>
                        {/*<img src={require('./calendar.png')} alt="发表日期"/>*/}
                        <Icon type="calendar" style={{paddingTop:'2px',paddingRight:'5px'}}/>
                        {props.data.time}
                    </span>
                    <span>
                        <Icon type="eye" style={{paddingTop:'2px',paddingRight:'5px'}}/>
                        {props.data.viewCount}
                    </span>
                    <span>
                        <Icon type="message" style={{paddingTop:'2px',paddingRight:'5px'}}/>
                        {props.data.commentCount}
                    </span>
                </p>
                <span className={style.lastSpan}>
                    {/*阅读全文 <span>>>></span>*/}
                </span>
                {/*<div className={style.shaftLoad}>
        		  <div className={style.shaft1}></div>
        		  <div className={style.shaft2}></div>
        		  <div className={style.shaft3}></div>
        		  <div className={style.shaft4}></div>
        		  <div className={style.shaft5}></div>
        		</div>*/}
            </div>
        </div>
        {props.data.coverImg?(<div className={style.imgContainer}>
            <img src={props.data.coverImg} alt=""/>
        </div>):null}
        <div className={style.shaftLoad}>
          <div className={style.shaft1}></div>
          <div className={style.shaft2}></div>
          <div className={style.shaft3}></div>
          <div className={style.shaft4}></div>
          <div className={style.shaft5}></div>
        </div>

    </div>
);
