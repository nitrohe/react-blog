import React,{Component, PropTypes} from 'react'
import style from './style.css'
import DocumentTitle from 'react-document-title';
import CommentCell from './commentCell/CommentCell';
//import EmojiTextarea from 'react-emoji-textarea';
//import ReactMarkdownEditor from '@webscopeio/react-markdown-editor';
import ReactMarkdownEditor from '../../../mlib/@webscopeio/react-markdown-editor';

import dateFormat from 'dateformat'
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '../../reducers/frontReducer'
const {get_comment_list,add_comment,set_editor_show, set_editor_value} = frontActions;


class Interact extends Component{
    constructor(props){
        super(props);
    }

    handleSubmit = () => {
        let commentData = {};
        commentData.visitor = '';
        commentData.parent = '';
        commentData.type = '1';
        //commentData.comment = this.state.value;
        commentData.comment = this.props.editorValue;
        commentData.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        //console.log("commentData=",commentData);
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
        ///*
        this.props.commentList.forEach(function(item, index){
            if(item.parent == '')
                commentList.push(<CommentCell key={index} comment={item} list={_this.props.commentList} cellShow={_this.props.editorShow} onHandleAddComment={_this.onHandleAddComment.bind(_this)} onHandleClick={_this.onHandleClick.bind(_this)}/>)
        })
        //*/
        return(
            <DocumentTitle title={`${webTitle} | 互动`}>
                <div className={style.interactContain}>

                    <ReactMarkdownEditor
                       placeholder={'Write something ...'}
                       value={this.props.editorValue}
                       onChange={({ target: { value } }) => this.props.set_editor_value(value)}
                       classes={style}
                     />
                    <div className={style.footer}>
                        <div className={style.footerTip}>
                            <span>表情，:关键词</span>
                        </div>
                        <div className={style.cdSeeAll}>
                            <a className={style.btnF} href="javascript:void(0);" onClick={this.handleSubmit.bind(this)} >留&nbsp;&nbsp;言</a>
                        </div>
                    </div>

                    <QueueAnim type="bottom" >
                        <div className={style.comentCellList}>
                            {commentList}
                        </div>
                    </QueueAnim>


                </div>
            </DocumentTitle>

        )
    }

    componentDidMount() {
        if(this.props.commentList.length == 0)
            this.props.get_comment_list();
    }

}
Interact.defaultProps = {
    commentList: [],
    editorShow: '',
    editorValue: ''
};

Interact.propsTypes = {
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
)(Interact);
