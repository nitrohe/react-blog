import React,{Component, PropTypes} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '../../reducers/frontReducer'
const {get_friend_link_list} = frontActions;

import {Icon} from 'antd'
import DocumentTitle from 'react-document-title';

import QueueAnim from 'rc-queue-anim';

class FriendLink extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {
            showLink:''
        }
    }

    handleMouseEnter = () => {
        if(this.state.showLink != style.expertsListShowLink)
            this.setState({showLink: style.expertsListShowLink});
    };
    handleMouseLeave = () => {
        if(this.state.showLink != style.expertsListShowLink2)
            this.setState({showLink: style.expertsListShowLink2});
    };
    render(){
        let _this = this;
        let showClass = this.state.showLink;
        let webTitle = "Nitrohe's Blog";
        /*
        let friendLinkList = this.props.friendLinkList.map((item,index)=>(

            <div className={style.expertsList}  key={index}>
                <dt>
                    <a >
                    <img className={style.expertHead} src={require('./2.jpg')}/>
                    </a>
                </dt>

                <a className={style.expertsListInfo} target="_blank"  title={item.sitename} >
                    <div className={style.expertsListTitle}>
                        <span>{item.sitename}</span>
                    </div>
                    <div className={style.i_w}>
                        <div className={`${style.i} ${showClass}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                            <div className={style.c1}>
                                <span>{item.describe}</span>
                            </div>
                            <div className={style.c2}>
                                <ul><li >{item.link}</li></ul>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

        ))
        */

        let friendLinkList = [];
        this.props.friendLinkList.forEach(function(item, index){
            let imgPath = item.img;

            friendLinkList.push(<div className={style.expertsList}  key={index}>
                <dt>
                    <a >
                    <img className={style.expertHead} src={require('./'+imgPath)}/>
                    </a>
                </dt>

                <a className={style.expertsListInfo} target="_blank"  title={item.sitename} >
                    <div className={style.expertsListTitle}>
                        <span>{item.sitename}</span>
                    </div>
                    <div className={style.i_w}>
                        <div className={`${style.i} ${showClass}`} onMouseEnter={_this.handleMouseEnter.bind(_this)} onMouseLeave={_this.handleMouseLeave.bind(_this)}>
                            <div className={style.c1}>
                                <span>{item.describe}</span>
                            </div>
                            <div className={style.c2}>
                                <ul><li >{item.link}</li></ul>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            )
        })

        return(
            <DocumentTitle title={`${webTitle} | 友链`}>
                <div className={style.friendLink}>

                    <div className={style.friendLinkBanner}>
                        <div className={style.friendLinkPre}>
                            <div className={style.friendLinkInfo}>
                                {/*<Icon type="file-add" style={{fontSize :24,color:"#fff",float:"left",paddingTop:8}} />*/}
                                <QueueAnim type="left" delay="200">
                                <p key="QA-1">友情链接</p>
                                </QueueAnim>
                            </div>
                            <QueueAnim type="right" delay="200">
                            <p key="QA-2">欢迎喜欢技术、有原创的站点申请友链，请发送相关信息至nitrohe@163.com</p>
                            </QueueAnim>
                        </div>
                    </div>


                    <div className={style.expertsListWrap } >
                        <QueueAnim type="bottom" >
                            {friendLinkList}
                        </QueueAnim>

                    </div>



                </div>
            </DocumentTitle>

        )
    }

    componentDidMount() {
        if(this.props.friendLinkList.length == 0)
            this.props.get_friend_link_list();
    }

}

FriendLink.defaultProps = {
    friendLinkList: []
};

FriendLink.propsTypes = {
    friendLinkList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        friendLinkList: state.front.friendLinkList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_friend_link_list: bindActionCreators(get_friend_link_list, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendLink);
