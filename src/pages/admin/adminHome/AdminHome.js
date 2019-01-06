import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {actions} from '@reducers/index'
import {bindActionCreators} from 'redux'

import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

const {user_auth} = actions;
class AdminHome  extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return(
            <div>
                <Card
                   style={{ width: 300 }}

                   actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                 >
                   <Meta
                     avatar={<Avatar src={this.props.userInfo.userimg} />}
                     title={this.props.userInfo.username}
                     description={`管理员类型：${this.props.userInfo.userType}`}
                   />
                 </Card>
            </div>
        )

    }
}

AdminHome .defaultProps = {
    isAdmin:false
};

function mapStateToProps(state) {
    return {
        isAdmin: state.globalState.userInfo.userType === 'admin',
        userInfo:state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user_auth:bindActionCreators(user_auth,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminHome )
