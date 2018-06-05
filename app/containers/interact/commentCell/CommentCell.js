import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'
import styleEditor from './styleEditor.css'

import ReactMarkdownEditor from '@webscopeio/react-markdown-editor';

export default class CommentCell extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        //this.state = {
        //    current:this.props.categories[0]
        //}
        this.state = {
          submitted: false,
          text: "",
          value: 'Hello world',
          commentShow:false
        }

    }
    handleClick(userName) {
        this.setState({commentShow: !this.state.commentShow});
        if(Object.prototype.toString.call(userName) === "[object String]") {
            this.setState({value: `@${userName} `});
        } else {
            this.setState({value: ''});
        }
    }

    render(){
        let _this = this;
        let {commentShow} = this.state;
        let userName = 'ceshi';
        let comment = this.props.comment;
        let list = this.props.list;

        let childList = [];
        this.props.list.forEach(function(item, index){
            if(item.parent == comment.visitor)
                childList.push(item)
        })

        let childNode = childList.map((item,index) => {
            return (<div  className={style.comentChild} key={index}>
                <div className={style.comentImg}>
                    <img src={require('./29.jpg')} />
                </div>
                <div className={style.comentRightContain}>
                    <div className={style.comentInfo}>
                        <div>
                            <span>{item.visitor}</span>
                            <span>{item.time}</span>
                        </div>
                        <a onClick={_this.handleClick.bind(_this,userName)}>huifu</a>
                    </div>
                    <div className={style.comentContent}>
                        <p>{item.comment}</p>
                    </div>
                </div>
            </div>)
        })

        return(
            <div className={style.comentContainer}>
                <div className={style.comentImg}>
                    <img src={require('./28.jpg')} />
                </div>

                <div className={style.comentRightContain}>
                    <div className={style.comentInfo}>
                        <div>
                            <span>{comment.visitor}</span>
                            <span>{comment.time}</span>
                        </div>
                        <a onClick={this.handleClick.bind(this)}>回复</a>
                    </div>
                    <div className={style.comentContent}>
                        <p>{comment.comment}</p>
                    </div>

                    {childNode}

                    {commentShow?
                    <div className={style.comentEditor}>
                        <ReactMarkdownEditor
                           placeholder={'Write something ...'}
                           value={this.state.value}
                           onChange={({ target: { value } }) => this.setState({ value })}
                           classes={styleEditor}
                         />
                         <div className={style.footer}>
                             <div className={style.cdSeeAll}>
                                 <a className={style.btnF} href="#about">Comment</a>
                             </div>
                         </div>
                    </div> : null}

                </div>


            </div>

        )
    }


}
