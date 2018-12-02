import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Detail} from '../detail'
import {Home} from '../home'
import style from './style.css'
import {
    Switch,
    Route
} from 'react-router-dom'

//import Banner from "../components/banner/Banner";
//import Menus from "../components/menu/Menus";
import MenuBar from "../components/menuBar/MenuBar";
import FootBar from "../components/footBar/FootBar";
//import HomePage from "../homePage/HomePage";
import BackTop from "../components/backTop/BackTop";
import Column from "../column/Column";
//import Interact from "../interact/Interact";
import InteractPage from "../interact/InteractPage";
import TimeLine from "../timeLine/TimeLine";
import FriendLink from "../friendLink/FriendLink";
import HomeAntd from "../homeAntd/index.jsx";
import NotFound from "../../components/notFound/NotFound";

//import {Progress} from 'antd';
import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/adminManagerTags'
import {actions as FrontActinos} from '../../reducers/frontReducer'
//import Login from "../home/components/login/Login";
//import {Logined} from "../home/components/logined/Logined";
import {actions as IndexActions} from '../../reducers/index'
const {get_all_tags} = actions;
const {get_article_list,set_progress_width} = FrontActinos;

class Front extends Component{
    constructor(props){
        super(props);

        this.clientHeight = document.body.clientHeight;
        this.scrollHeight = document.body.scrollHeight;
        this.scrollTop = 0;
        this.state = { showBackTop: false};
        this.progress = 0;
        this.timer = '';
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
        //const {login, register} = this.props;
        const showBackTop = this.state.showBackTop;
        //const progressWidth = this.state.progressWidth;
        const progressWidth = this.props.progressWidth;
        return(
            <div>
                <div>

                    {/*
                        图片轮播屏蔽  --zyf
                        <Banner/>
                        <Menus getArticleList={(tag)=>this.props.get_article_list(tag,1)} categories={this.props.categories} history={this.props.history}/>
                    */}
                    <MenuBar categories={this.props.categories} history={this.props.history}/>
                    {showBackTop && <BackTop handleClick={this.backTop.bind(this)}/>}
                </div>

                <div style={{top:46,position:'fixed',zIndex:9}}>
                    <div className={`${style.progressBar} ${style.barBlue} ${style.barStripes}`}>
                        <span style={{width: progressWidth}}></span>
                    </div>
                </div>

                <div className={style.container} style={{paddingTop:60,paddingBottom:20}}>

                    <Switch>
                        {/*<Route exact path={url} component={HomePage}/>*/}
                        <Route exact path={url} component={HomeAntd}/>
                        <Route path={`/Blog`} component={Home}/>
                        <Route path={`/Timeline`} component={TimeLine}/>
                        <Route path={`/FriendLink`} component={FriendLink}/>
                        <Route path={`/Column`} component={Column}/>
                        {/*<Route path={`/Interact`} component={Interact}/>*/}
                        {<Route path={`/Interact`} component={InteractPage}/>}
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

    ///*
    componentWillReceiveProps(nextProps) {
        let {isFetching} = this.props;
        let _this = this;
        if(nextProps.isFetching){

                _this.progress = 0;
                this.props.set_progress_width(_this.progress)

                if(!_this.timer) {
                    _this.timer = setInterval(() => {
                        if (_this.progress <= 1300) {
                            _this.progress += 200
                            this.props.set_progress_width(_this.progress)
                        } else {
                            clearInterval(_this.timer);
                            _this.progress = 0;
                            _this.timer = '';
                            this.props.set_progress_width(_this.progress)
                        }
                    }, 100);
                }
        } else {
            //clearInterval(_this.state.progressTimer);
            //this.setState({progressWidth: 0});
            //if(this.props.progressWidth) {
            //    _this.progress = 0;
                //this.props.set_progress_width(_this.progress)
            //}
        }
    }
    //*/
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
        isFetching: state.globalState.isFetching,
        progressWidth: state.front.progressWidth
    }
}
function mapDispatchToProps(dispatch) {
    return{
        get_all_tags:bindActionCreators(get_all_tags,dispatch),
        get_article_list:bindActionCreators(get_article_list,dispatch),
        //login: bindActionCreators(IndexActions.get_login, dispatch),
        //register: bindActionCreators(IndexActions.get_register, dispatch),
        set_progress_width: bindActionCreators(set_progress_width, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)
