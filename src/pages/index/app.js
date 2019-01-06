import React, {Component, PropTypes} from 'react'
import PureRenderMixiin from 'react-addons-pure-render-mixin'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import './app.css'
//TODO
import style from './app.css'

import {notification, Icon} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '@reducers'
//import Admin from "./admin/Admin";
import Front from './front/Front'
import NotFound from "@components/notFound/NotFound";
import animationStyle from '../../lib/animate.css'
import DocumentMeta from 'react-document-meta';
const {clear_msg, user_auth} = actions;

//import Loadable from 'react-loadable';
import importedComponent from 'react-imported-component';
import {ComponentLoader} from 'react-imported-component';

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

/*const FrontLoadable = Loadable({
  loader: () => import('./front/Front'),
  loading: Loading,
  timeout: 10000
});
*/
const FrontLoadable = () => (
   <ComponentLoader
       loadable={() => import('./front/Front')}

   />
);
const NotFoundLoadable = () => (
   <ComponentLoader
       loadable={() => import('@components/notFound/NotFound')}

   />
);

class AppIndex extends Component {

    constructor(props) {
        super(props);
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
                <div>
                    <Switch>
                        <Route path='/404' component={NotFoundLoadable}/>
                        <Route component={Front}/>
                    </Switch>

                </div>
            </Router>
            </DocumentMeta>
        )
    }

    componentDidMount() {
        this.props.user_auth();
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
)(AppIndex)
