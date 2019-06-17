import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import { Form, Input, Cascader, Select, Row, Col, Button, DatePicker, Radio} from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import {actions} from '@reducers/commentReducer'
const {get_comment_detail, set_comment_detail, save_comment} = actions;

const { TextArea } = Input;


class manageCommentAddForm extends Component {
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

            if(typeof this.props.match.params.id != 'undefined') {
                id = this.props.match.params.id;
            }
            const fieldsValue = {
               ...values,
               'time': values['time'].format('YYYY-MM-DD HH:mm:ss'),
               'parent': id

             };
             console.log('fieldsValue--',fieldsValue);
             this.props.save_comment(fieldsValue);
             this.props.history.push(`/admin.html/manageComment`);
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
        const RadioGroup = Radio.Group;

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
                  label="访问者"
                >
                {getFieldDecorator('visitor', {
                  rules: [{
                    required: true, message: '请输入访问者!',
                  }],
                  initialValue: 'nitrohe'

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
                  initialValue: '/favicon.png'
                })(
                    <Input  />
                )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="类型"
                >
                  {getFieldDecorator('type')(
                    <RadioGroup>
                      <Radio value="1">留言</Radio>
                      <Radio value="2">文章</Radio>
                    </RadioGroup>
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="评论"
                >
                  {getFieldDecorator('comment', {
                    rules: [{
                      required: true, message: '请输入评论内容!',
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
            this.props.get_comment_detail(this.props.match.params.id);
        } else {
            this.props.set_comment_detail({});
        }
        //this.props.form.setFieldsValue({visitor:'nitrohe',img:'/favicon.png'});



    }
    /*componentWillReceiveProps(nextProps) {
        if(!isEqual(this.props.commentDetail, nextProps.commentDetail)) {
            this.props.form.setFieldsValue(this.props.commentDetail);
        }
    }*/
}

manageCommentAddForm.defaultProps = {
    commentDetail: {}
};

manageCommentAddForm.propsTypes = {
    commentDetail: PropTypes.object
};


function mapStateToProps(state) {

    return {
        commentDetail: state.admin.comment.commentDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_comment_detail: bindActionCreators(get_comment_detail, dispatch),
        set_comment_detail: bindActionCreators(set_comment_detail, dispatch),
        save_comment: bindActionCreators(save_comment, dispatch)
    }
}

const manageCommentAdd = Form.create({

    mapPropsToFields(props) {
            return {
                type: Form.createFormField({...props.commentDetail, value: props.commentDetail.type})
            };
    }

})(manageCommentAddForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(manageCommentAdd)
