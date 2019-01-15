import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import AdminMenu from "@components/adminMenu/AdminMenu";
import NotFound from "@components/notFound/NotFound";
import style from './style.css'
import {bindActionCreators} from 'redux'
import {actions} from '@reducers/admin'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import AdminHome from "../adminHome/AdminHome"
import ManageArticleAdd from "../manageArticleAdd/ManageArticleAdd";
import ManageTimeline from "../manageTimeline/ManageTimeline";
import ManageUser from "../manageUser/ManageUser";
import ManageBlog from "../manageBlog/ManageBlog";
import ManageComment from "../manageComment/ManageComment";
import ManageFriendlink from "../manageFriendlink/ManageFriendlink";

import ManageTimelineAdd from "../manageTimelineAdd/ManageTimelineAdd";
import ManageFriendlinkAdd from "../manageFriendlinkAdd/ManageFriendlinkAdd";
import ManageCommentAdd from "../manageCommentAdd/ManageCommentAdd";

import { Layout, Menu, Icon } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const {change_location_admin} = actions;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            collapsed: false,
            collapsedWidth:'200px'
        };
    }

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
      if(!this.state.collapsed) {
          this.setState({
            collapsedWidth: '80px'
          });
      } else {
          this.setState({
            collapsedWidth: '200px'
          });
      }
    }

    render() {
        //const {url} = this.props.match;
        const url = '/admin.html';
            console.log('this.props.userInfo=',this.props.userInfo," ",this.props.userInfo.userType == 'admin')
            return (
                <div>
                    {(this.props.userInfo && this.props.userInfo.userType == 'admin') ?
                        <Layout>
                            <Sider
                              trigger={null}
                              collapsible
                              collapsed={this.state.collapsed}
                              breakpoint="lg"
                              style={{ position: 'fixed', left: 0, overflow: 'auto', height: '100vh',  background: '#fff'}}
                            >

                                <AdminMenu
                                    history={this.props.history}
                                    url={this.props.adminUrl}
                                    changeUrl={this.props.change_location_admin}/>
                            </Sider>
                            <Layout>
                              <Header style={{ position: 'fixed', left: this.state.collapsedWidth, zIndex: 9, width: '100%',  background: '#fff', padding: 0 }} >
                                <Icon
                                  className="trigger"
                                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                  onClick={this.toggle}
                                />
                              </Header>
                              <Content className={style.layoutContent} style={{ marginLeft:this.state.collapsedWidth}}>
                                <Switch>
                                    <Route exact path={`${url}`} component={AdminHome}/>
                                    <Route path={`${url}/manageTimeline`} component={ManageTimeline}/>
                                    <Route path={`${url}/manageUser`} component={ManageUser}/>
                                    <Route path={`${url}/manageBlog`} component={ManageBlog}/>
                                    <Route path={`${url}/manageComment`} component={ManageComment}/>
                                    <Route path={`${url}/manageFriendlink`} component={ManageFriendlink}/>
                                    <Route path={`${url}/manageArticleAdd/:id?`} component={ManageArticleAdd}/>
                                    <Route path={`${url}/manageTimelineAdd/:id?`} component={ManageTimelineAdd}/>
                                    <Route path={`${url}/manageFriendlinkAdd/:id?`} component={ManageFriendlinkAdd}/>
                                    <Route path={`${url}/manageCommentAdd/:id?`} component={ManageCommentAdd}/>
                                    <Route component={NotFound}/>
                                </Switch>
                              </Content>
                            </Layout>
                        </Layout>
                        :
                    <Redirect to={`${url}/login`} />}
                </div>
            )
    }
    /*componentWillReceiveProps() {
        //this.props.change_location_admin(window.location.pathname.replace(/\/admin/, "")||'/');
    }*/
}
Admin.defaultProps = {
    adminUrl: '/admin.html'
};

Admin.propTypes = {
    adminUrl: PropTypes.string,
    change_location_admin: PropTypes.func
};

function mapStateToProps(state) {
    const {url} = state.admin.adminGlobalState;
    return {
        adminUrl: url,
        userInfo:state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        change_location_admin: bindActionCreators(change_location_admin, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin)
