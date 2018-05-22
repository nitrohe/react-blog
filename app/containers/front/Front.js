import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Detail} from '../detail'
import {Home} from '../home'
import style from './style.css'
import {
    Switch,
    Route
} from 'react-router-dom'
//--zyf
//import Banner from "../components/banner/Banner";
import Menus from "../components/menu/Menus";
import MenuBar from "../components/menuBar/MenuBar";
import FootBar from "../components/footBar/FootBar";
import HomePage from "../homePage/HomePage";
import BackTop from "../components/backTop/BackTop";

import TimeLine from "../timeLine/TimeLine";
import FriendLink from "../friendLink/FriendLink";
import {Progress} from 'antd';

import NotFound from "../../components/notFound/NotFound";
import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/adminManagerTags'
import {actions as FrontActinos} from '../../reducers/frontReducer'
import Login from "../home/components/login/Login";
import {Logined} from "../home/components/logined/Logined";
import {actions as IndexActions} from '../../reducers/index'
const {get_all_tags} = actions;
const {get_article_list} = FrontActinos;

class Front extends Component{
    constructor(props){
        super(props);

        this.clientHeight = document.body.clientHeight;
        this.scrollHeight = document.body.scrollHeight;
        this.scrollTop = 0;
        this.state = { showBackTop: false, progressTimer: null, progressWidth: 0};
        this.progress = 0;
    }
    handleScroll(event) {
        this.scrollHeight = document.body.scrollHeight;
        if (document.documentElement && document.documentElement.scrollTop) {
            this.scrollTop = document.documentElement.scrollTop;
        } else {
            this.scrollTop = document.body.scrollTop;
        }
        //this.ifShow(this.scrollTop);
        //console.log("handleScroll--scrollTop-",this.scrollTop);
        const showBackTop = this.state.showBackTop;
        const threshold = (1.2 * (this.clientHeight * this.clientHeight)) / this.scrollHeight;
        if (this.scrollTop > threshold && !showBackTop) {
            this.setState({
                showBackTop: true
            });
        } else if (this.scrollTop <= threshold && showBackTop) {
            this.setState({
                showBackTop: false
            });
        }
    }

    backTop() {
        window.scrollBy(0, -this.scrollHeight / 30);
        const scrolldelay = setTimeout(() => {
            this.backTop();
        }, 20);
        if (this.scrollTop <= 0) clearTimeout(scrolldelay);
    }
    render(){
        const {url} = this.props.match;
        const {login, register} = this.props;
        const showBackTop = this.state.showBackTop;
        const progressWidth = this.state.progressWidth;
        return(
            <div>
                <div>

                    {/*
                        图片轮播屏蔽  --zyf
                        <Banner/>
                        <Menus getArticleList={(tag)=>this.props.get_article_list(tag,1)} categories={this.props.categories} history={this.props.history}/>
                    */}
                    <MenuBar getArticleList={(tag)=>this.props.get_article_list(tag,1)} categories={this.props.categories} history={this.props.history}/>
                    {showBackTop && <BackTop handleClick={this.backTop.bind(this)}/>}
                </div>

                <div style={{top:46,position:'fixed',zIndex:9}}>
                    <div className={`${style.progressBar} ${style.barBlue} ${style.barStripes}`}>
                        <span style={{width: progressWidth}}></span>
                    </div>
                </div>

                <div className={style.container} style={{paddingTop:60,paddingBottom:20}}>

                    <Switch>
                        <Route exact path={url} component={HomePage}/>
                        <Route path={`/Blog`} component={Home}/>
                        <Route path={`/Timeline`} component={TimeLine}/>
                        <Route path={`/FriendLink`} component={FriendLink}/>
                        {
                            /*
                            <Route path={`/Column`} component={Column}/>
                            <Route path={`/Words`} component={Words}/>
                            <Route path={`/Interact`} component={Interact}/>
                            */
                        }

                        <Route path={`/detail/:id`} component={Detail}/>
                        <Route path={`/:tag`} component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>

                </div>
                <div>
                    <FootBar  history={this.props.history} />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_all_tags();
        //_this = this;
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillReceiveProps(nextProps) {
        let {isFetching} = this.props;
        let timer = '';
        let _this = this;
        console.log("isFetching=",isFetching);
        //if(nextProps.isFetching){
            if (!isFetching) {
                //let progress = 0;
                this.setState({progressWidth: 0});

                timer = setInterval(() => {
                    console.log("_this.progress=",_this.progress);
                    if (_this.progress <= 1300) {
                        this.setState({progressWidth: _this.progress += 300})
                    } else {
                        this.setState({progressWidth: 0});
                        // _this.progress = 0;
                    }
                }, 100);

              this.setState({progressTimer: timer});
            } else {
                console.log("else _this.progress=",_this.progress);
                clearInterval(this.state.progressTimer);
                this.setState({progressWidth: 0});
                _this.progress = 0;

            }
        //}
    }
}

Front.defaultProps = {
    categories:[]
};

Front.propTypes = {
    categories:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return{
        categories:state.admin.tags,
        userInfo: state.globalState.userInfo,
        isFetching: state.globalState.isFetching
    }
}
function mapDispatchToProps(dispatch) {
    return{
        get_all_tags:bindActionCreators(get_all_tags,dispatch),
        get_article_list:bindActionCreators(get_article_list,dispatch),
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)
