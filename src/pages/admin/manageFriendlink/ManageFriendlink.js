import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Table, Divider, Tooltip, Button } from 'antd';

import {actions} from '@reducers/adminManagerFriendlink'
const {get_friendlink_list,delete_friendlink} = actions;

class ManageFriendlink extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            options: [],
            modalVisible: false
        };
    }

    handleCloumContent(text, record, index) {
        this.setState({
            modalVisible: false
        })
    };

    render() {
        const columns = [
          { title: '博客地址', dataIndex: 'sitename', key: 'sitename', width:'130px' },
          { title: '链接', dataIndex: 'link', key: 'link', width:'180px' },
          { title: '图片', dataIndex: 'img', key: 'img', width:'200px' },
          { title: '描述', dataIndex: 'describe', key: 'describe',render: (text, record, index) =>  {
              let flag = text.length>25?true:false;
              let showText = flag?(text.substr(0,25)+'...'):text;
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
                  <a href="javascript:;" onClick={()=>{this.props.history.push(`/admin.html/manageFriendlinkAdd/${record._id}`)}}>编辑</a>

                  <Divider type="vertical" />
                  <a href="javascript:;" onClick={()=>{this.props.delete_friendlink(record._id);this.props.get_friendlink_list();}}>删除</a>
                </span>
            )}
        ];

        const datas = this.props.friendlinkList;
        return (
            <div>
                <div><Button onClick={()=>{this.props.history.push(`/admin.html/manageFriendlinkAdd`)}}>添加</Button></div>
                <Table
                    columns={columns}
                    dataSource={datas}
                    />

            </div>

        )
    }

    componentDidMount() {
        //if(this.props.friendlinkList.length == 0)
            this.props.get_friendlink_list();
    }
}

ManageFriendlink.defaultProps = {
    friendlinkList: []
};

ManageFriendlink.propsTypes = {
    friendlinkList: PropTypes.array
};


function mapStateToProps(state) {

    return {
        friendlinkList: state.admin.friendlink.friendlinkList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_friendlink_list: bindActionCreators(get_friendlink_list, dispatch),
        delete_friendlink: bindActionCreators(delete_friendlink, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageFriendlink)
