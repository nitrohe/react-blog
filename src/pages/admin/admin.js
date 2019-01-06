import React, {Component, PropTypes} from 'react'
import PureRenderMixiin from 'react-addons-pure-render-mixin'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import './admin.css'
import style from './admin.css'
//import {Detail} from './detail'
//import {Home} from './home'
//import Banner from "./components/banner/Banner";
//import Menus from "./components/menu/Menus";
//import {Loading} from "./components/loading/Loading"
//import NotFound from "../components/notFound/NotFound";
import {notification, Icon} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '@reducers'

import animationStyle from '../../lib/animate.css'
import DocumentMeta from 'react-document-meta';
import Login from "@components/login/Login";
import Register from "@components/register/Register";

const {clear_msg, user_auth} = actions;

import Admin from "./admin/Admin";
import NotFound from "@components/notFound/NotFound";

/*import importedComponent from 'react-imported-component';
import {ComponentLoader} from 'react-imported-component';

const NotFoundLoadable = () => (
   <ComponentLoader
       loadable={() => import('@components/notFound/NotFound')}
       // all fields are optional, and matches the same field of importedComponent.

   />
);
const AdminLoadable = () => (
   <ComponentLoader
       loadable={() => import('./admin/Admin')}
   />
);
*/
/*import Loadable from 'react-loadable';

const Loading = ({ pastDelay, timedOut, error }) => {
  if (pastDelay) {
    return <div className={style.loadableLoading}><span className={style.LoadingLabel}>正在加载，请稍后……</span></div>;
  } else if (timedOut) {
    return <div>Taking a long time...</div>;
  } else if (error) {
    return <div>Error!</div>;
  }
  return null;
};


const AdminLoadable = Loadable({
  loader: () => import('./admin/Admin'),
  loading: Loading,
  timeout: 10000
});
const NotFoundLoadable = Loadable({
  loader: () => import('@components/notFound/NotFound'),
  loading: Loading,
  timeout: 10000
});
*/

class AdminIndex extends Component {

    constructor(props) {
        super(props);
        //this.openNotification = this.openNotification.bind(this);
        this.shouldComponentUpdate = PureRenderMixiin.shouldComponentUpdate.bind(this);
        this.info = '';
        notification.config({
          top:65,
          duration:2
        });
    }

    openNotification(type, message) {
        let that = this;
        notification[type]({
            message: message,
            onClose: () => {
                that.props.clear_msg();
            }
        });
        that.props.clear_msg();

    };

    render() {
        //let {isFetching, notification} = this.props;
        const meta = {
            description: 'Nitrohe Blog',

            meta: {
                name: {
                    viewport:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
                    keywords: 'react,vue,nodejs,php,html5,css3,linux'
                }
              }
        };
        return (

            <DocumentMeta {...meta}>
            <Router>
                <div className={style.container}>
                    <Switch>
                        <Route path='/404' component={NotFound}/>
                        <Route path={`/admin.html/login`} component={Login}/>
                        <Route path={`/admin.html/register`} component={Register}/>
                        <Route component={Admin}/>
                    </Switch>
                    {/*isFetching && <Loading/>*//*modify by zyf*/}
                    {/*this.props.notification && this.props.notification.content ?
                        (this.props.notification.type === 1 ?
                            this.openNotification('success', this.props.notification.content) :
                            this.openNotification('error', this.props.notification.content)) :
                        null*/}
                </div>
            </Router>
            </DocumentMeta>
        )
    }

    componentDidMount() {
        //this.props.user_auth();
    }
    componentWillReceiveProps(nextProps) {
        //console.log("nextProps---",nextProps);
        if(nextProps.notification && nextProps.notification.content) {
            nextProps.notification.type === 1 ?
                this.openNotification('success', nextProps.notification.content) :
                this.openNotification('error', nextProps.notification.content)
        }
    }

}


function mapStateToProps(state) {
    return {
        notification: state.globalState.msg,
        //isFetching: state.globalState.isFetching,
        //userInfo: state.globalState.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg: bindActionCreators(clear_msg, dispatch),
        user_auth: bindActionCreators(user_auth, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminIndex)
