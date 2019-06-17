import PureRenderMixin from 'react-addons-pure-render-mixin'
import React,{Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import {ManageArticleCell} from "./components/ManageArticleCell";
import { Pagination, Button } from 'antd';
import {actions} from '@reducers/articleReducer'
import {actions as FrontActions} from '@reducers/frontReducer'
import Admin from "../admin/Admin";
const {get_article_list,delete_article,edit_article} = actions;
const {get_article_detail} = FrontActions;
class ManageArticle extends Component{

    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        return(
            <div>
                <Button onClick={()=>{this.props.history.push('/admin.html/manageArticleAdd')}}>添加</Button>
                <div className={style.articleListContainer}>
                    {
                        this.props.articleList.map((item,index)=>(
                            <ManageArticleCell
                                edit_article={(id)=>this.props.edit_article(id)}
                                history={this.props.history}
                                getArticleDetail={(id)=>this.props.get_article_detail(id)}
                                delete={(id)=>this.props.delete_article(id)}
                                key={index} data={item}/>
                        ))
                    }
                </div>
                <div  className={style.paginationStyle}>
                    <Pagination
                        defaultPageSize={5}
                        onChange={(pageNum)=>{
                            this.props.get_article_list(pageNum);
                        }}
                        current={this.props.pageNum}
                        total={this.props.total}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_article_list()
    }
}

ManageArticle.defaultProps={
    articleList:[],
    pageNum:1,
    total:0
};

ManageArticle.defaultProps = {
    articleList:PropTypes.array,
    pageNum:PropTypes.number,
    total:PropTypes.number
};
function mapStateToProps(state) {
    return{
        articleList:state.admin.articles.articleList,
        pageNum:state.admin.articles.pageNum,
        total:state.admin.articles.total
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_list:bindActionCreators(get_article_list,dispatch),
        delete_article:bindActionCreators(delete_article,dispatch),
        edit_article:bindActionCreators(edit_article,dispatch),
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageArticle);
