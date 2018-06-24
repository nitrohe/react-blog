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
import {actions as frontActions} from '../../reducers/frontReducer'
const {get_article_list,get_article_detail} = frontActions;

import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';

//zyf test for user login/register
import Login from "../home/components/login/Login";
import {Logined} from "../home/components/logined/Logined";
import {actions as IndexActions} from '../../reducers/index'

import ArticleBoxBlock from "../components/articleBoxBlock/ArticleBoxBlock";
import TagClouds from "../components/tagCloud/TagClouds";

class Home extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
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
                            <ArticleList
                                history={this.props.history}
                                data={this.props.articleList}
                                getArticleDetail={this.props.get_article_detail}
                            />

                            <div className={style.paginationContainer}>

                                <QueueAnim delay="1000" type="bottom" >
                                <Pagination
                                    defaultPageSize={5}
                                    onChange={(pageNum) => {
                                        this.props.get_article_list(this.props.match.params.tag || '', pageNum);
                                    }}
                                    current={this.props.pageNum}
                                    total={this.props.total}
                                    key='QA-1'/>
                                </QueueAnim>
                            </div>

                        </div>

                        <div className={style.contentright}>
                            {/*this.props.userInfo.userId ? <Logined history={this.props.history} userInfo={this.props.userInfo}/> : <Login login={login} register={register}/>*/}

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
    }
}

Home.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    commentList: []
};

Home.propsTypes = {
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
)(Home);
