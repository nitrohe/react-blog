import React,{Component} from 'react'
import style from './style.css'
//import styleEditor from './styleEditor.css'
import dateFormat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//import ReactMarkdownEditor from '@webscopeio/react-markdown-editor';
//import ReactMarkdownEditor from '../../../../mlib/@webscopeio/react-markdown-editor';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import emoji from "@jukben/emoji-search";
import "@webscopeio/react-textarea-autocomplete/style.css";

export default class CommentCell extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

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
        //if(typeof )
        console.log("this.textarea.value--",this.textarea);
        if(Object.prototype.toString.call(userName) === "[object String]") {
            this.setState({value: `@${userName} `});
        } else {
            this.setState({value: ''});
        }
        this.props.onHandleClick(parentName);

    }
    handleSubmit = () => {
        let commentData = {};
        let commentType = this.props.type || 1;
        let articleId = this.props.articleid || '';
        commentData.visitor = 'submit2';
        commentData.parent = this.state.parent;
        commentData.type = commentType;
        commentData.aId = articleId;
        //commentData.comment = this.state.value;
        commentData.comment = this.textarea.value;
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

        const Loading = ({ data }) => <div>Loading</div>;
        const Item = ({ entity: { name, char } }) => <div>{`${name}: ${char}`}</div>;

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
                        {/*
                        <ReactMarkdownEditor
                           placeholder={''}
                           value={this.state.value}
                           onChange={({ target: { value } }) => this.setState({ value })}
                           classes={styleEditor}
                           ref={ref => this.editor=ref}
                         />
                         */}

                         <ReactTextareaAutocomplete
                            className={style.textarea}
                            loadingComponent={Loading}
                            containerStyle={{background: "#f6f8fa"}}
                            style={{fontSize: "14px",lineHeight: "16px",margin: "0 auto",width:"95%",background: "#f6f8fa"}}
                            ref={(rta) => { this.rta = rta; } }
                            innerRef={(textarea) => { this.textarea = textarea; if(this.textarea&&this.textarea.value.length==0) {this.textarea.value=this.state.value;this.textarea.focus()}} }

                            minChar={0}
                            trigger={{
                                ":": {
                                    dataProvider: token => {
                                        return emoji(token).slice(0, 5).map(({ name, char }) => ({ name, char}));
                                    },
                                    component: Item,
                                    output: (item, trigger) => item.char
                               }
                            }}
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
