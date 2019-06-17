import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import { Form, Input, Select, Cascader, Row, Col, Button, DatePicker, Modal, Radio  } from 'antd';
import {actions} from "@reducers/articleReducer";
import {actions as tagActions} from "@reducers/tagsReducer";
import dateFormat from 'dateformat'

const {get_all_tags} = tagActions;
const {get_article_detail, set_article_detail, save_article} = actions;
const Option = Select.Option;

const { TextArea } = Input;

class ManageArticleAddForm extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            options: [],
            modalVisible: false
        };
    }

    preView() {
        this.setState({
            modalVisible: true
        })
    };


    saveArticle = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('values--',values);

            const fieldsValue = {
               ...values,
               'id': '',
               'lasttime': '',
             };
             if(typeof this.props.match.params.id != 'undefined') {
                 fieldsValue.id = this.props.match.params.id;
                 fieldsValue.lasttime = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
                 fieldsValue.time = this.props.articleDetail.time;
             } else {
                fieldsValue.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
             }
             fieldsValue.coverImg = typeof fieldsValue.coverImg=="undefined"?'':fieldsValue.coverImg;

             this.props.save_article(fieldsValue);
             //this.props.history.push(`/admin.html/manageArticle`);
        });
    };

    //handleOk
    handleOk() {
        this.setState({
            modalVisible: false
        })
    };

    render() {
        //let {title, coverImg, abstract, content, tags} = this.props.articleDetail;
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const RadioGroup = Radio.Group;

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
        const formItemAreaLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
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
        return (
            <div>
              <Form onSubmit={this.saveArticle}>
                <Form.Item
                  {...formItemLayout}
                  label="标题"
                >
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true, message: '请输入文章标题!',
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
                {getFieldDecorator('coverImg', {

                  initialValue: ''

                })(
                    <Input />
                )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="摘要"
                >
                {getFieldDecorator('abstract', {
                  rules: [{
                    required: true, message: '请输入文章摘要!',
                  }],
                  initialValue: ''
                })(
                    <TextArea rows={4} />
                )}
                </Form.Item>
                <Form.Item
                  {...formItemAreaLayout}
                  label="文章内容 "
                >
                  {getFieldDecorator('content', {
                    rules: [{
                      required: true, message: '请文章内容!',
                    }],
                  })(
                    <TextArea rows={16} />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="作者"
                >
                  {getFieldDecorator('author', {
                    rules: [{
                      required: true, message: '请输入作者!',
                    }],
                    initialValue: 'nitrohe'

                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="分类 "
                >
                  {getFieldDecorator('tags', {
                    rules: [{
                      required: true, message: '请选择文章分类!',
                    }],
                  })(
                      <Select
                          mode="tags"
                          placeholder="请选择分类"
                      >
                      </Select>
                  )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="发表"
                >
                  {getFieldDecorator('isPublish', {
                    rules: [{
                      required: true, message: '请选择是否发表!',
                    }],
                  })(
                      <RadioGroup>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                      </RadioGroup>
                  )}

                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" className={style.buttonStyle}>确定</Button>
                  <Button type="primary" onClick={this.preView.bind(this)}
                          className={style.buttonStyle}>预览</Button>
                </Form.Item>
              </Form>

                <Modal
                    visible={this.state.modalVisible}
                    title="文章预览"
                    onOk={this.handleOk.bind(this)}
                    width={'900px'}
                    onCancel={this.handleOk.bind(this)}
                    footer={null}
                >
                    <div className={style.modalContainer}>
                        <div id='preview' className={style.testCode}>
                            {remark().use(reactRenderer).processSync(this.props.articleDetail.content).contents}
                        </div>
                    </div>
                </Modal>
            </div>

        )
    }

    componentDidMount() {
        //this.props.get_all_tags();
        if(typeof this.props.match.params.id != 'undefined'){
            this.props.get_article_detail(this.props.match.params.id);
        } else {
            this.props.set_article_detail({});
        }
    }
}

ManageArticleAddForm.propsTypes = {
    articleDetail: PropTypes.object
};

ManageArticleAddForm.defaultProps = {
    articleDetail:{}
};

function mapStateToProps(state) {
    return {
        articleDetail:state.admin.articles.articleDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_detail: bindActionCreators(get_article_detail, dispatch),
        set_article_detail: bindActionCreators(set_article_detail, dispatch),
        save_article: bindActionCreators(save_article, dispatch)
    }
}
const ManageArticleAdd = Form.create({

    mapPropsToFields(props) {
            return {
                title: Form.createFormField({...props.articleDetail, value: props.articleDetail.title}),
                coverImg: Form.createFormField({...props.articleDetail, value: props.articleDetail.coverImg}),
                abstract: Form.createFormField({...props.articleDetail, value: props.articleDetail.abstract}),
                content: Form.createFormField({...props.articleDetail, value: props.articleDetail.content}),
                isPublish: Form.createFormField({...props.articleDetail, value: props.articleDetail.isPublish}),
                author: Form.createFormField({...props.articleDetail, value: props.articleDetail.author}),
                tags: Form.createFormField({...props.articleDetail, value: props.articleDetail.tags})
            };
    }

})(ManageArticleAddForm);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageArticleAdd)
