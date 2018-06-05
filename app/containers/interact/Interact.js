import React,{Component, PropTypes} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'
import DocumentTitle from 'react-document-title';

//import {ComentCell} from './comentCell/ComentCell';
import CommentCell from './commentCell/CommentCell';
//import EmojiTextarea from './react-emoji-textarea';
//import ReactMarkdownEditor from './react-markdown-editor';
//import EmojiTextarea from 'react-emoji-textarea';
import ReactMarkdownEditor from '@webscopeio/react-markdown-editor';
import dateFormat from 'dateformat'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '../../reducers/frontReducer'
const {get_comment_list,add_comment} = frontActions;


class Interact extends Component{
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
          value: ''
      }
      //const ovClass ={header:`${style.header}`};
      //const ovClass = {header:style.header};
    }
    /*
    handleClick = (e) => {
        console.log('click ', e);
        if(e === '首页'){
            this.props.getArticleList('');
        }else{
            this.props.getArticleList(e);
        }
        let toPath = e === '首页'?'/':'/'+e;
        this.setState({
            current: e,
        });
        this.props.history.push(toPath);
    };
    */
    //handleChange = (text) => this.setState({ text: text});

    handleSubmit = () => {
        let commentData = {};
        commentData.visitor = 'submit1';
        commentData.parent = '';
        commentData.type = '1';
        commentData.comment = this.state.value;
        commentData.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        console.log("commentData=",commentData);
        this.props.add_comment(commentData);
    }

    render(){
        let _this = this;
        let webTitle = "Nitrohe's Blog";
        const ovClass = {header:style.header};

        let commentList = [];
        this.props.commentList.forEach(function(item, index){
            if(item.parent == '')
                commentList.push(<CommentCell key={index} comment={item} list={_this.props.commentList}/>)
        })

        return(
            <DocumentTitle title={`${webTitle} | 互动`}>
                <div className={style.interactContain}>
                    {/*
                        <EmojiTextarea handleChange = {this.handleChange} handleSubmit = {this.handleSubmit} />
                    */}
                    {/*
                        <ReactMarkdownEditor
                          placeholder={'Write something ...'}
                          value={this.state.value}
                          onChange={({ target: { value } }) => this.setState({ value })}
                        />
                    */}
                    <ReactMarkdownEditor
                       placeholder={'Write something ...'}
                       value={this.state.value}
                       onChange={({ target: { value } }) => this.setState({ value })}
                       classes={style}
                     />
                    <div className={style.footer}>
                        <div className={style.cdSeeAll}>
                            <a className={style.btnF} href="javascript:void(0);" onClick={this.handleSubmit.bind(this)} >Comment</a>
                        </div>
                    </div>


                    {
                        commentList
                    }



                </div>
            </DocumentTitle>

        )
    }

    componentDidMount() {
        this.props.get_comment_list();
    }

}
Interact.defaultProps = {
    commentList: []
};

Interact.propsTypes = {
    commentList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        commentList: state.front.commentList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_comment_list: bindActionCreators(get_comment_list, dispatch),
        add_comment: bindActionCreators(add_comment, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Interact);
