import React,{Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '@reducers/frontReducer'
const {get_column_list} = frontActions;

import style from './style.css'
//import {Icon} from 'antd';
import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';

class Column extends Component{
    constructor(props){
        super(props);
        this.columnItem = ['CSDN','掘金','思否','IMweb','简书','WEB开发者','Smashingmagazine'];
        this.columnQuery = ['csdn','juejin','segmentfault','imweb','jianshu','admin10000','smashingmagazine'];
        this.state = {
            current:this.columnItem[0]
        }
    }

    handleClick = (e,k) => {
        //console.log('click ', e);
        if(e == this.state.current) {
            return ;
        }
        window.scrollTo(0,0);
        this.setState({
            current: e
        });
        this.props.get_column_list(this.columnQuery[k]);

    };

    render(){
        let _this = this;

        let liList = this.columnItem.map((item,index)=>(
            <li key={index} className={style.navItem}>
                <a href="javascript:;" target="_self" className={item === _this.state.current ?  style.current : null} onClick={_this.handleClick.bind(_this,item,index)}>{item}</a>
            </li>


        ));
        let crawlerList = this.props.columnList.map((item,index)=>(
            <li key={index} className={style.columnLi}>
                <a href={item.href} target="_blank" title="点击访问">
                    <span className={style.txt}>{item.title}</span>
                    <span className={style.time}>{item.time}</span>
                </a>
            </li>


        ));
        let webTitle = "Nitrohe's Blog";

        return(
            <DocumentTitle title={`${webTitle} | 专栏`}>
                <div className={style.columnLayoutMain}>

                    <div className={`${style.newsdataNavFixed} ${style.newsdataNav}`}>
                        <ul >
                            {liList}
                        </ul>

                    </div>

                    <div className={style.columnBox}>
                        <ul  className={style.columnUl}>
                            <QueueAnim type="bottom" >
                            {crawlerList}
                            </QueueAnim>
                        </ul>

                    </div>

                </div>
            </DocumentTitle>


        )
    }

    componentDidMount() {
        let _this = this;
        //if(this.props.timeLineList.length == 0)
        this.props.get_column_list(_this.columnQuery[0]);
    }


}


Column.defaultProps = {
    columnList: []
};

Column.propsTypes = {
    columnList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        columnList: state.front.columnList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_column_list: bindActionCreators(get_column_list, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Column);
