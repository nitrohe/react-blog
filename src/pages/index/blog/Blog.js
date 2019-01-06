import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Redirect
} from 'react-router-dom'
import style from './style.css'
import ArticleList from "./components/articelList/ArticleList";
import {Pagination} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '@reducers/frontReducer'
const {get_article_list,get_article_detail} = frontActions;

import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';

import {actions as IndexActions} from '@reducers/index'

import ArticleBoxBlock from "../components/articleBoxBlock/ArticleBoxBlock";
import TagClouds from "../components/tagCloud/TagClouds";
import ProfileIntro from "../components/profileIntro/ProfileIntro";
import News from "./components/news/News";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.clientHeight = document.body.clientHeight;
        this.scrollHeight = document.body.scrollHeight;
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

        let loadMoreObj =document.querySelector('#loadMore');
        if(loadMoreObj.offsetTop>0 && this.scrollTop + this.clientHeight >= loadMoreObj.offsetTop) {
            if(!this.props.isFetching && this.props.total>this.props.pageNum*5){
                this.props.get_article_list('',this.props.pageNum+1);
            } else if (this.props.total<this.props.pageNum*5){
               document.querySelector('#loadMore').style.display = 'none';
           }
        }

    }

    render() {
        const {tags} = this.props;
        const {login, register} = this.props;
        localStorage.setItem('userInfo', JSON.stringify(this.props.userInfo));
        let webTitle = "Nitrohe's Blog";

        return (
            tags.length > 1 && this.props.match.params.tag && (tags.indexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0)
                ?
                <Redirect to='/404'/>
                :
                <DocumentTitle title={`${webTitle} | 博客`}>
                    <div className={style.contentContainer} >

                        <div className={style.contentMain} >
                            <News />
                            <ArticleList
                                history={this.props.history}
                                data={this.props.articleList}
                                getArticleDetail={this.props.get_article_detail}
                            />

                            {/*<div className={style.paginationContainer}>

                                <QueueAnim delay="1000" type="bottom" >
                                <Pagination
                                    defaultPageSize={5}
                                    onChange={(pageNum) => {
                                        this.props.get_article_list(this.props.match.params.tag || '', pageNum);
                                        window.scrollTo(0,0);
                                    }}
                                    current={this.props.pageNum}
                                    total={this.props.total}
                                    key='QA-1'/>
                                </QueueAnim>
                            </div>*/}

                            <div className={style.loadMore} id='loadMore'>
                                <span>加载更多</span>
                            </div>

                        </div>


                        <div className={style.contentright}>
                            {/*this.props.userInfo.userId ? <Logined history={this.props.history} userInfo={this.props.userInfo}/> : <Login login={login} register={register}/>*/}
                            <ProfileIntro />
                            {<TagClouds />}

                            <ArticleBoxBlock
                                history={this.props.history}
                                data={this.props.articleList}
                                getArticleDetail={this.props.get_article_detail}
                            />

                        </div>

                    </div>
                </DocumentTitle>
        )
    }

    componentDidMount() {
        if(this.props.articleList.length == 0){
            //this.props.get_article_list(this.props.match.params.tag || '');
            this.props.get_article_list('');
        }

        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
}

Blog.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    commentList: []
};

Blog.propsTypes = {
    pageNum: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    articleList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        tags: state.admin.tags,
        pageNum: state.front.pageNum,
        total: state.front.total,
        articleList: state.front.articleList,
        userInfo: state.globalState.userInfo,
        isFetching: state.globalState.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch),
        get_article_detail:bindActionCreators(get_article_detail,dispatch),
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog);
