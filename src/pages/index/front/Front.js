import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import style from './style.css'
import {
    Switch,
    Route
} from 'react-router-dom'

import MenuBar from "../components/menuBar/MenuBar";
import FootBar from "../components/footBar/FootBar";
//import HomePage from "../homePage/HomePage";
import BackTop from "../components/backTop/BackTop";
//import Column from "../column/Column";
//import Interact from "../interact/Interact";
//import InteractPage from "../interact/InteractPage";
//import TimeLine from "../timeLine/TimeLine";
//import FriendLink from "../friendLink/FriendLink";
//import HomeAntd from "../homeAntd/index.jsx";
//import NotFound from "../../components/notFound/NotFound";
//import {Detail} from '../detail'

import {bindActionCreators} from 'redux'
import {actions} from '@reducers/tagsReducer'
import {actions as FrontActinos} from '@reducers/frontReducer'

import {actions as IndexActions} from '@reducers/index'
import {Icon} from 'antd';
import Loadable from "@components/loadable/Loadable";
//import Loadable from 'react-loadable';
import importedComponent, {ComponentLoader}  from 'react-imported-component';

const {get_all_tags} = actions;
const {get_article_list,set_progress_width} = FrontActinos;

/*const HomeLoadable = Loadable({
  loader: () => import('../homeAntd/index.jsx'),
  loading: Loading,
  timeout: 10000
});*/


const HomeLoadable = () => (
   <ComponentLoader
       loadable={() => import('../homeAntd/index.jsx')}
       LoadingComponent={Loadable}
       // all fields are optional, and matches the same field of importedComponent.
       /*
       ErrorComponent={Error}
       onError

       exportPicker
       render
       async */
   />
);
//TODO无法获取路由参数
const BlogLoadable = importedComponent( () => import('../blog/Blog'), {
  LoadingComponent: Loadable,
});
const ArticleLoadable = importedComponent( () => import('../detail/Detail'), {
  LoadingComponent: Loadable,
});
const ColumnLoadable = () => (
   <ComponentLoader
       loadable={() => import('../column/Column')}
       LoadingComponent={Loadable}
   />
);
const TimelineLoadable = () => (
   <ComponentLoader
       loadable={() => import('../timeLine/TimeLine')}
       LoadingComponent={Loadable}
   />
);
const InteractLoadable = () => (
   <ComponentLoader
       loadable={() => import('../interact/InteractPage')}
       LoadingComponent={Loadable}
   />
);
const FriendlinkLoadable = () => (
   <ComponentLoader
       loadable={() => import('../friendLink/FriendLink')}
       LoadingComponent={Loadable}
   />
);
const NotFoundLoadable = () => (
   <ComponentLoader
       loadable={() => import('@components/notFound/NotFound')}
       LoadingComponent={Loadable}
   />
);


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
                        <Route exact path={url} component={HomeLoadable}/>
                        {/*<Route path={`/Blog`} component={Home}/>
                        <Route path={`/Column`} component={Column}/>*/}
                        <Route path={`/Blog`} component={BlogLoadable}/>
                        <Route path={`/Column`} component={ColumnLoadable}/>
                        <Route path={`/Timeline`} component={TimelineLoadable}/>
                        <Route path={`/FriendLink`} component={FriendlinkLoadable}/>
                        {/*<Route path={`/Interact`} component={InteractPage}/>*/}
                        <Route path={`/Interact`} component={InteractLoadable}/>
                        <Route path={`/detail/:id`} component={ArticleLoadable}/>

                        <Route component={NotFoundLoadable}/>
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
