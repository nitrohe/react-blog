import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker  } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import {actions} from '@reducers/adminManagerFriendlink'
const {get_friendlink_detail, set_friendlink_detail, save_friendlink} = actions;

const { TextArea } = Input;


class manageFriendlinkAddForm extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
          };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('values--',values);
            let id = '';
            let title = typeof values['title'] != 'undefined'?values['title']:'';
            let img = typeof values['img'] != 'undefined'?values['img']:'';
            if(typeof this.props.match.params.id != 'undefined') {
                id = this.props.match.params.id;
            }
            const fieldsValue = {
               ...values,
               'id': id

             };
             console.log('fieldsValue--',fieldsValue);
             this.props.save_friendlink(fieldsValue);
             this.props.history.push(`/admin.html/manageFriendlink`);
        });
      }





    render() {

        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 10,
            },
          },
        };


        const config = {
         rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        };


        return (
            <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item
                  {...formItemLayout}
                  label="博客地址"
                >
                  {getFieldDecorator('sitename', {
                    rules: [{
                      required: true, message: '请输入博客地址!',
                    }],
                    initialValue: ''

                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="链接"
                >
                {getFieldDecorator('link', {
                  rules: [{
                    required: true, message: '请输入链接地址!',
                  }],
                  initialValue: ''

                })(
                    <Input />
                )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="图片"
                >
                {getFieldDecorator('img', {
                  rules: [{
                    required: true, message: '请输入图片路径!',
                  }],
                  initialValue: ''
                })(
                    <Input  />
                )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="描述 "
                >
                  {getFieldDecorator('describe', {
                    rules: [{
                      required: true, message: '请输入站点描述!',
                    }],
                  })(
                    <TextArea rows={4} />
                  )}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">确定</Button>
                </Form.Item>
              </Form>
            </div>
        );
    }

    componentDidMount() {
        if(typeof this.props.match.params.id != 'undefined') {
            this.props.get_friendlink_detail(this.props.match.params.id);
        } else {
            this.props.set_friendlink_detail({});
        }



    }
    /*componentWillReceiveProps(nextProps) {
        if(!isEqual(this.props.friendlinkDetail, nextProps.friendlinkDetail)) {
            this.props.form.setFieldsValue(this.props.friendlinkDetail);
        }
    }*/
}

manageFriendlinkAddForm.defaultProps = {
    friendlinkDetail: {}
};

manageFriendlinkAddForm.propsTypes = {
    friendlinkDetail: PropTypes.object
};


function mapStateToProps(state) {

    return {
        friendlinkDetail: state.admin.friendlink.friendlinkDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_friendlink_detail: bindActionCreators(get_friendlink_detail, dispatch),
        set_friendlink_detail: bindActionCreators(set_friendlink_detail, dispatch),
        save_friendlink: bindActionCreators(save_friendlink, dispatch)
    }
}

const manageFriendlinkAdd = Form.create({

    mapPropsToFields(props) {
            return {
                sitename: Form.createFormField({...props.friendlinkDetail, value: props.friendlinkDetail.sitename}),
                link: Form.createFormField({...props.friendlinkDetail, value: props.friendlinkDetail.link}),
                img: Form.createFormField({...props.friendlinkDetail, value: props.friendlinkDetail.img}),
                describe: Form.createFormField({...props.friendlinkDetail, value: props.friendlinkDetail.describe})
            };
    }

})(manageFriendlinkAddForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(manageFriendlinkAdd)
