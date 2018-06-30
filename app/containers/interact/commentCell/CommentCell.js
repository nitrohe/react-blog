import React,{Component} from 'react'
import style from './style.css'
import styleEditor from './styleEditor.css'
import dateFormat from 'dateformat'

//import ReactMarkdownEditor from '@webscopeio/react-markdown-editor';
import ReactMarkdownEditor from '../../../../mlib/@webscopeio/react-markdown-editor';

export default class CommentCell extends Component{
    constructor(props){
        super(props);

        this.state = {
            submitted: false,
            text: "",
            value: '',
            commentShow:false,
            parent: ""
        }

    }
    handleClick(parentName,userName) {
        this.setState({commentShow: !this.state.commentShow});
        this.setState({parent: parentName});
        if(Object.prototype.toString.call(userName) === "[object String]") {
            this.setState({value: `@${userName} `});
        } else {
            this.setState({value: ''});
        }
        this.props.onHandleClick(parentName);

    }
    handleSubmit = () => {
        let commentData = {};
        commentData.visitor = 'submit2';
        commentData.parent = this.state.parent;
        commentData.type = '1';
        commentData.comment = this.state.value;
        commentData.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        //console.log("commentData=",commentData);
        this.props.onHandleAddComment(commentData);
    }

    render(){
        let _this = this;
        let {commentShow} = this.state;
        let {list, comment, cellShow} = this.props;
        let parentName = comment.visitor;
        let childList = [];
        this.props.list.forEach(function(item, index){
            if(item.parent == comment._id)
                childList.push(item)
        })

        let childNode = childList.map((item,index) => {
            return (<div  className={style.comentChild} key={index}>
                <div className={style.comentImg}>
                    <img src={item.img} />
                </div>
                <div className={style.comentRightContain}>
                    <div className={style.comentInfo}>
                        <div>
                            <span>{item.visitor}</span>
                            <span>{item.time}</span>
                        </div>
                        <a onClick={_this.handleClick.bind(_this,comment._id,item.visitor)}>回复</a>
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
                    <img src={comment.img} />
                </div>

                <div className={style.comentRightContain}>
                    <div className={style.comentInfo}>
                        <div>
                            <span>{comment.visitor}</span>
                            <span>{comment.time}</span>
                        </div>
                        <a onClick={this.handleClick.bind(this,comment._id)}>回复</a>
                    </div>
                    <div className={style.comentContent}>
                        <p>{comment.comment}</p>
                    </div>

                    {childNode}

                    {(cellShow==comment._id)?
                    <div className={style.comentEditor}>
                        <ReactMarkdownEditor
                           placeholder={''}
                           value={this.state.value}
                           onChange={({ target: { value } }) => this.setState({ value })}
                           classes={styleEditor}
                           ref={ref => this.editor=ref}
                         />
                         <div className={style.footer}>
                             <div className={style.cdSeeAll}>
                                 <a className={style.btnF} href="javascript:void(0);" onClick={this.handleSubmit.bind(this)}>评论</a>
                             </div>
                         </div>
                    </div> : null}

                </div>


            </div>

        )
    }


}
