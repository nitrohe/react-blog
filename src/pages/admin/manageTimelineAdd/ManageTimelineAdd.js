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

import {actions} from '@reducers/timelineReducer'
const {get_timeline_detail, set_timeline_detail, save_timeline} = actions;

const { TextArea } = Input;


class manageTimelineAddForm extends Component {
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
               'time': values['time'].format('YYYY-MM-DD HH:mm:ss'),
               'title': title,
               'img':img,
               'id': id

             };
             console.log('fieldsValue--',fieldsValue);
             this.props.save_timeline(fieldsValue);
             this.props.history.push(`/admin.html/manageTimeline`);
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
                  label="时间"
                >
                  {getFieldDecorator('time', config)(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" locale={locale} />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="标题"
                >
                {getFieldDecorator('title', {
                  rules: [{
                    required: false, message: '请输入标题!',
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
                    required: false, message: '请输入图片路径!',
                  }],
                  initialValue: ''
                })(
                    <Input  />
                )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="内容"
                >
                  {getFieldDecorator('content', {
                    rules: [{
                      required: true, message: '请输入内容!',
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
            this.props.get_timeline_detail(this.props.match.params.id);
        } else {
            this.props.set_timeline_detail({});
        }



    }
    /*componentWillReceiveProps(nextProps) {
        if(!isEqual(this.props.timelineDetail, nextProps.timelineDetail)) {
            this.props.form.setFieldsValue(this.props.timelineDetail);
        }
    }*/
}

manageTimelineAddForm.defaultProps = {
    timelineDetail: {}
};

manageTimelineAddForm.propsTypes = {
    timelineDetail: PropTypes.object
};


function mapStateToProps(state) {

    return {
        timelineDetail: state.admin.timeline.timelineDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_timeline_detail: bindActionCreators(get_timeline_detail, dispatch),
        set_timeline_detail: bindActionCreators(set_timeline_detail, dispatch),
        save_timeline: bindActionCreators(save_timeline, dispatch)
    }
}

const manageTimelineAdd = Form.create({

    mapPropsToFields(props) {
            return {
                time: Form.createFormField({...props.timelineDetail, value: moment(props.timelineDetail.time)}),
                title: Form.createFormField({...props.timelineDetail, value: props.timelineDetail.title}),
                img: Form.createFormField({...props.timelineDetail, value: props.timelineDetail.img}),
                content: Form.createFormField({...props.timelineDetail, value: props.timelineDetail.content})
            };
    }

})(manageTimelineAddForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(manageTimelineAdd)
