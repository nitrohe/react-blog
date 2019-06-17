import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Table, Divider, Tooltip, Button } from 'antd';

import {actions} from '@reducers/timelineReducer'
const {get_timeline_list,delete_timeline} = actions;

class ManageTimeline extends Component {
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
          { title: '时间', dataIndex: 'time', key: 'time', width:'180px' },
          { title: '标题', dataIndex: 'title', key: 'title', width:'180px' },
          { title: '图片', dataIndex: 'img', key: 'img', width:'200px' },
          { title: '内容', dataIndex: 'content', key: 'content',render: (text, record, index) =>  {
              let flag = text.length>20?true:false;
              let showText = flag?(text.substr(0,20)+'...'):text;
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
                  <a href="javascript:;" onClick={()=>{this.props.history.push(`/admin.html/manageTimelineAdd/${record._id}`)}}>编辑</a>

                  <Divider type="vertical" />
                  <a href="javascript:;" onClick={()=>{this.props.delete_timeline(record._id);this.props.get_timeline_list();}}>删除</a>
                </span>
            )}
        ];

        const datas = this.props.timelineList;
        return (
            <div>
                <div><Button  onClick={()=>{this.props.history.push(`/admin.html/manageTimelineAdd`)}}>添加</Button></div>
                <Table
                    columns={columns}
                    dataSource={datas}
                    />

            </div>

        )
    }

    componentDidMount() {
        //if(this.props.timeLineList.length == 0)
        this.props.get_timeline_list();
    }


}

ManageTimeline.defaultProps = {
    timelineList: []
};

ManageTimeline.propsTypes = {
    timelineList: PropTypes.array
};


function mapStateToProps(state) {

    return {
        timelineList: state.admin.timeline.timelineList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_timeline_list: bindActionCreators(get_timeline_list, dispatch),
        delete_timeline: bindActionCreators(delete_timeline, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTimeline)
