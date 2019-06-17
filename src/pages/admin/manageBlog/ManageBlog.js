import PureRenderMixin from 'react-addons-pure-render-mixin'
import React,{Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import {Table, Divider, Tooltip, Button } from 'antd';
import {actions} from '@reducers/articleReducer'
import {actions as FrontActions} from '@reducers/frontReducer'
import Admin from "../admin/Admin";
const {get_article_list,delete_article,edit_article, get_article_detail} = actions;

class ManageBlog extends Component{

    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        const columns = [
          { title: '时间', dataIndex: 'time', key: 'time', width:'180px' },
          { title: '阅读数', dataIndex: 'viewCount', key: 'viewCount', width:'100px' },
          { title: '评论数', dataIndex: 'commentCount', key: 'commentCount', width:'100px' },
          { title: '文章', dataIndex: 'title', key: 'title',render: (text, record, index) =>  {
              let flag = text.length>65?true:false;
              let showText = flag?(text.substr(0,65)+'...'):text;
              return(
                  <div>
                      <span>{showText}</span>
                      {flag&&<Tooltip placement="topLeft" title={text}>
                        <span style={{color:'#1890ff',marginLeft:'2px'}}>详情</span>
                      </Tooltip>}
                  </div>
              )
           } },
          {
            title: '操作', dataIndex: '', key: 'x', width:'150px', render: (text, record, index) =>  (
                <span>
                  <a href="javascript:;" onClick={()=>{this.props.history.push(`/admin.html/manageArticleAdd/${record._id}`)}}>编辑</a>

                  <Divider type="vertical" />
                  <a href="javascript:;" onClick={()=>{this.props.delete_article(record._id);this.props.get_article_list();}}>删除</a>
                </span>
            )}
        ];

        const datas = this.props.articleList;
        return (
            <div>
                <div><Button onClick={()=>{this.props.history.push(`/admin.html/manageArticleAdd`)}}>添加</Button></div>
                <Table
                    columns={columns}
                    dataSource={datas}
                    />

            </div>

        )
    }

    componentDidMount() {
        this.props.get_article_list()
    }
}

ManageBlog.defaultProps={
    articleList:[],
    pageNum:1,
    total:0
};

ManageBlog.defaultProps = {
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
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageBlog);
