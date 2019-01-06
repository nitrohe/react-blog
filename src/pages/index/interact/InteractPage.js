import React,{Component, PropTypes} from 'react'
import style from './stylePage.css'
import DocumentTitle from 'react-document-title';
import CommentCell from './commentCell/CommentCell';
//import EmojiTextarea from 'react-emoji-textarea';
//import ReactMarkdownEditor from '@webscopeio/react-markdown-editor';
//import ReactMarkdownEditor from '../../../mlib/@webscopeio/react-markdown-editor';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import emoji from "@jukben/emoji-search";
//import emoji from "../../../mlib/jukben/emoji-search";
import "@webscopeio/react-textarea-autocomplete/style.css";
//import './styleauto.css';

import dateFormat from 'dateformat'
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '@reducers/frontReducer'
const {get_comment_list,add_comment,set_editor_show, set_editor_value} = frontActions;


class InteractPage extends Component{
    constructor(props){
        super(props);
    }

    handleSubmit = () => {
        let commentData = {};
        let commentType = this.props.type || 1;
        let articleId = this.props.articleid || '';
        commentData.visitor = '';
        commentData.parent = '';
        commentData.type = commentType;
        commentData.aId = articleId;
        //commentData.comment = this.state.value;
        commentData.comment = this.textarea.value;
        commentData.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        //console.log("commentData=",this.textarea.val);
        this.props.add_comment(commentData);
        this.props.set_editor_value('');
    }
    onHandleAddComment = (data) => {
        //console.log("handleAddComment=",data);
        this.props.add_comment(data);
    }
    onHandleClick = (show) => {

        if(this.props.editorShow != show) {
            this.props.set_editor_show(show);
        }

    }

    render(){
        let _this = this;
        let webTitle = "Nitrohe's Blog";
        const ovClass = {header:style.header};

        let commentList = [];
        let commentType = this.props.type || 1;
        let articleId = this.props.articleid || '';


        ///*
        this.props.commentList.forEach(function(item, index){
            if(item.parent == '' && item.type == commentType && item.aId == articleId)
                commentList.push(<CommentCell key={index} comment={item} type={_this.props.type || 1}   articleid={_this.props.articleid || ''} list={_this.props.commentList} cellShow={_this.props.editorShow} onHandleAddComment={_this.onHandleAddComment.bind(_this)} onHandleClick={_this.onHandleClick.bind(_this)}/>)
        })
        //*/
        let cmLen = commentList.length;

        const Loading = ({ data }) => <div>Loading</div>;
        const Item = ({ entity: { name, char } }) => <div>{`${name}: ${char}`}</div>;

        let widthProps = this.props.width || '';
        let cmTitle = this.props.cmTitle || '发布留言';

        return(

                <div className={style.interactContain} style={{width:widthProps}}>

                    <div className={style.interactBox}>
                        <div className={style.header}>
                            <span>{cmTitle}</span>
                        </div>

                        <ReactTextareaAutocomplete
                            className={style.textarea}
                            loadingComponent={Loading}
                            containerStyle={{height: 100,background: "#f6f8fa"}}
                            style={{padding: 5,width:"95%",background: "#f6f8fa"}}
                            ref={(rta) => { this.rta = rta; } }
                            innerRef={(textarea) => { this.textarea = textarea; } }
                            minChar={0}
                            trigger={{
                            ":": {
                                dataProvider: token => {
                                    return emoji(token).slice(0, 10).map(({ name, char }) => ({ name, char}));
                                },
                              component: Item,
                              output: (item, trigger) => item.char
                            }
                            }}
                        />

                        <div className={style.footer}>
                            <div className={style.footerTip}>
                                <span>表情，:关键词</span>
                            </div>
                            <div className={style.cdSeeAll}>
                                <a className={style.btnF} href="javascript:void(0);" onClick={this.handleSubmit.bind(this)} >留言</a>
                            </div>
                        </div>
                    </div>


                    <QueueAnim type="bottom" >
                        <div className={style.comentCellList}>
                            {commentList}
                            {cmLen == 0 && <div>
                                <div className={style.comentNoShow}>
                                    <img className={style.comentNoShowImg} src={'/interact/icon_comment.png'}/>
                                </div>
                                <div className={style.comentNoShowText}>
                                    智慧如你，不想发表一些想法咩~
                                </div>
                            </div>}


                        </div>
                    </QueueAnim>


                </div>


        )
    }

    componentDidMount() {
        let comment_type = this.props.type || 1;
        let articleId = this.props.articleid || '';
        if(comment_type == 1)
            document.title = "Nitrohe's Blog | 互动";
        if(this.props.commentList.length == 0)
            this.props.get_comment_list(comment_type, articleId);
    }

}
InteractPage.defaultProps = {
    commentList: [],
    editorShow: '',
    editorValue: ''
};

InteractPage.propsTypes = {
    commentList: PropTypes.array.isRequired,
    editorShow: PropTypes.string.isRequired,
    editorValue: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        commentList: state.front.commentList,
        editorShow: state.front.editorShow,
        editorValue: state.front.editorValue
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_comment_list: bindActionCreators(get_comment_list, dispatch),
        add_comment: bindActionCreators(add_comment, dispatch),
        set_editor_show: bindActionCreators(set_editor_show, dispatch),
        set_editor_value: bindActionCreators(set_editor_value, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InteractPage);
