import React,{Component, PropTypes} from 'react'
import style from './style.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '@reducers/frontReducer'
const {get_time_line_list} = frontActions;

import {Icon} from 'antd';
import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';

class TimeLine extends Component{
    constructor(props){
        super(props);

    }

    render(){
        let _this = this;
        let webTitle = "Nitrohe's Blog";
        //let timeLineList = [];
        //this.props.timeLineList.forEach(function(item, index){
        let timeLineList = this.props.timeLineList.map((item,index)=>(

            <div className={style.timelineRow} key={index}>
                <div className={style.timelineTime}>
                    <small>{item.time}</small>
                </div>
                <div className={style.timelineIcon}>
                    {/*<div >
                        <Icon type="edit" style={{color:'#aaa'}}/>
                    </div>*/}
                </div>
                <div className={`${style.panel} ${style.timelineContent}`}>
                    <div className={style.panelBody}>
                        {item.title?<h2>{item.title}</h2>:null}
                        <p>{item.content}</p>
                        {item.img?<img className={style.imgResponsive} src={item.img} />:null}

                    </div>
                </div>
            </div>

        ))

        return(
            <DocumentTitle title={`${webTitle} | 时间轴`}>
                <div className={style.timeline}>

                    <div className={style.qwe}>
                        <QueueAnim type="bottom" >
                        <div className={style.timelineRow} style={{marginBottom:10, marginTop:10, paddingBottom:50}}>
                            <div className={style.timelineTime} style={{marginLeft:-80, opacity:1}}>
                                <small style={{fontSize:24}}>2017</small>
                            </div>
                            <div className={style.timelineIcon}>
                                {/*<div >
                                    <Icon type="pushpin-o"  style={{color:'#aaa'}} />
                                </div>*/}
                            </div>

                        </div>

                        {timeLineList}

                        </QueueAnim>
                    </div>

                </div>
            </DocumentTitle>

        )
    }

    componentDidMount() {
        if(this.props.timeLineList.length == 0)
            this.props.get_time_line_list();
    }

}

TimeLine.defaultProps = {
    timeLineList: []
};

TimeLine.propsTypes = {
    timeLineList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        timeLineList: state.front.timeLineList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_time_line_list: bindActionCreators(get_time_line_list, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLine);
