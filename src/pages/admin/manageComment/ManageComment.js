import PureRenderMixin from 'react-addons-pure-render-mixin'
import React,{Component,PropTypes} from 'react'
import {Table, Divider, Tooltip, Button } from 'antd';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from '@reducers/commentReducer'
const {get_comment_list,delete_comment} = actions;

class ManageComment extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    handleChild(valueArr){
        let newCommentArr = [];
        let index = 0;
        let  tmpArr= [];
        let key = 1;
        for(let val of valueArr) {
            if(val.parent == '') {
                newCommentArr[index] = val;
                //newCommentArr[index].children = [];
                newCommentArr[index].key = key++;
                tmpArr.push(val._id)
                index++;
            }
        }
        for(let val of valueArr) {
            if(val.parent != '') {
                let tmpIndex = tmpArr.indexOf(val.parent);
                val.key = key++;
                if(!newCommentArr[tmpIndex].hasOwnProperty('children')){
                    newCommentArr[tmpIndex].children = [];
                }
                newCommentArr[tmpIndex].children.push(val);
            }
        }
        console.log('newCommentArr--',newCommentArr);
        return newCommentArr;
    }

    render(){
        console.log('this.props.commentList--',this.props.commentList);
        const columns = [
          { title: '访问者', dataIndex: 'visitor', key: 'visitor', width:'150px' },
          { title: '时间', dataIndex: 'time', key: 'time', width:'180px' },
          { title: '图片', dataIndex: 'img', key: 'img', width:'200px' },
          { title: '评论', dataIndex: 'comment', key: 'comment',render: (text, record, index) =>  {
              let flag = text.length>50?true:false;
              let showText = flag?(text.substr(0,50)+'...'):text;
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
                  <a href="javascript:;" onClick={()=>{this.props.history.push(`/admin.html/manageCommentAdd/${record.parent!=''?record.parent:record._id}`)}}>评论</a>

                  <Divider type="vertical" />
                  <a href="javascript:;" onClick={()=>{this.props.delete_comment(record._id);this.props.get_comment_list();}}>删除</a>
                </span>
            )}
        ];

        //const datas = this.props.commentList;
        const datas = this.handleChild(this.props.commentList);

        return (
            <div>
                <div><Button onClick={()=>{this.props.history.push(`/admin.html/manageCommentAdd`)}}>添加</Button></div>
                <Table
                    columns={columns}
                    dataSource={datas}
                    />

            </div>

        )
    }

    componentDidMount() {
        //if(this.props.commentList.length == 0)
            this.props.get_comment_list();
    }
}

ManageComment.defaultProps = {
    commentList: []
};

ManageComment.propsTypes = {
    commentList: PropTypes.array
};

function mapStateToProps(state) {
    return{
        commentList: state.admin.comment.commentList
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_comment_list: bindActionCreators(get_comment_list, dispatch),
        delete_comment: bindActionCreators(delete_comment, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageComment);
