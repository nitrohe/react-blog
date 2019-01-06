import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import remark from 'remark'
import {connect} from 'react-redux'
import {actions} from "@reducers/frontReducer";
const {get_article_detail} = actions;
//import reactRenderer from 'remark-react'
import reactRenderer from '@mlib/remark-react'
import RemarkLowlight from 'remark-react-lowlight';
import js from 'highlight.js/lib/languages/javascript';
import githubSchema from 'hast-util-sanitize/lib/github.json';
import css from 'highlight.js/lib/languages/css';
import  'highlight.js/styles/github.css';

import { Anchor, Icon } from 'antd';
import style from './style.css'
import DocumentTitle from 'react-document-title';

import InteractPage from "../interact/InteractPage";
import RemarkMd from './RemarkMd'

class Detail extends Component{
    constructor(props){
        super(props);
        this.articleParse = [];
        this.state = { showAnchor: {display:''}};
        this.handleScroll = this.handleScroll.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    }

    handleScroll(event) {
        this.scrollHeight = document.body.scrollHeight;
        if (document.documentElement && document.documentElement.scrollTop) {
            this.scrollTop = document.documentElement.scrollTop;
        } else {
            this.scrollTop = document.body.scrollTop;
        }

        let acHeight = this.acRef.clientHeight;
        let afEle = document.querySelector('.ant-affix')
        let afHeight = afEle ? afEle.clientHeight:20;
        this.antAffixHeight = afHeight==0? this.antAffixHeight:afHeight;

        //console.log("--this.oAnchor-11--",acHeight-antAffixHeight-100);
        if(this.scrollTop > acHeight-this.antAffixHeight-100) {
            this.setState({
                showAnchor: {display:'none'}
            });
        } else {
            if(this.state.showAnchor.display == "none")
                this.setState({
                    showAnchor: {display:''}
                });
        }
    }


    render(){

        const schema = Object.assign({}, githubSchema, {
          attributes: Object.assign({}, githubSchema.attributes, {
            code: [
              ...(githubSchema.attributes.code || []),
              'className'
            ]
          })
        });
        const {articleContent,title,author,viewCount,commentCount,time} = this.props;
        //const articleParse = remark().use(reactRenderer).processSync(articleContent).contents;
        if(this.articleParse.length == 0 || this.articleParse.length > 1 && this.articleParse[1].length == 0)
            this.articleParse = remark().use(reactRenderer, {sanitize: schema,remarkReactComponents: {code: RemarkLowlight({js,css})}}).processSync(articleContent).contents;
        const articleParse = this.articleParse;
        const { Link } = Anchor;
        const articleAnchor = articleParse[1].map((item,index)=>(
            <Link key={`{index}#${item.h2}`} href={`#${item.h2}`} title={item.h2} />
        ));
        let webTitle = "Nitrohe's Blog";
        let commentWidth = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "95%" :  "80%";
        return(
            <DocumentTitle title={`${webTitle} | 文章`}>
            <div className={style.container}>
                <div className={style.contentContainer} ref={ref => this.acRef=ref}>
                    <div className={style.contentMain} >
                        <h2>{title}</h2>
                        <div className={style.articleInfo}>
                            <span >
                                <Icon type="user" style={{paddingTop:'2px',paddingRight:'5px'}}/>
                                {author}
                            </span>
                            <span>
                                <Icon type="calendar" style={{paddingTop:'2px',paddingRight:'5px'}}/>
                                {time}
                            </span>
                            <span>
                                <Icon type="eye" style={{paddingTop:'2px',paddingRight:'5px'}}/>
                                {commentCount}
                            </span>
                            <span>
                                <Icon type="message" style={{paddingTop:'2px',paddingRight:'5px'}}/>
                                {viewCount}
                            </span>
                        </div>
                        <RemarkMd articleParse={articleParse[0]} />
                        {/*
                        <div id='preview' className={style.content}>
                            {articleParse[0]}
                        </div>*/}
                    </div>

                    <div className={style.contentright} style={this.state.showAnchor}>
                        <Anchor offsetTop={140} >
                            {articleAnchor}
                        </Anchor>
                    </div>
                </div>

                <div className={style.articleComment}>
                    <InteractPage width={commentWidth} type={2} articleid={this.props.location.state.id} cmTitle={"发表评论"}/>
                </div>


            </div>
            </DocumentTitle>
        )
    }
    componentWillReceiveProps(nextProps) {
        //console.log("detail=",nextProps);
        //if(nextProps.articleContent)
        //    console.log('processSync=',remark().use(reactRenderer).processSync(nextProps.articleContent).contents);
    }
    componentDidMount() {
        if(typeof this.props.location.state != "undefined"){
            this.props.get_article_detail(this.props.location.state.id);
        } else {
            this.props.get_article_detail(this.props.location.pathname.split('/')[2]);
        }
        window.scrollTo(0,0);

        window.addEventListener('scroll', this.handleScroll);

    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }
    /*
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate-this.props-",this.props);
        console.log("shouldComponentUpdate-nextProps-",nextProps);
        console.log("shouldComponentUpdate-nextState-",nextState);

        return true
    }
    */
}

function mapStateToProps(state) {
    const {content,title,author,viewCount,commentCount,time} = state.front.articleDetail;
    return{
        articleContent:content,
        title,
        author,
        viewCount,
        commentCount,
        time
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);
