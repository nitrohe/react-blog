import React, {Component} from 'react'
import style from './style.css'

import {  Divider, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegisterForm  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: []
        };
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }

    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }

    handleWebsiteChange = (value) => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

       const formItemLayout = {
         labelCol: {
           xs: { span: 24 },
           sm: { span: 8 },
         },
         wrapperCol: {
           xs: { span: 24 },
           sm: { span: 12 },
         },
       };
       const tailFormItemLayout = {
         wrapperCol: {
           xs: {
             span: 24,
             offset: 12,
           },
           sm: {
             span: 16,
             offset: 4,
           },
         },
       };
       const prefixSelector = getFieldDecorator('prefix', {
         initialValue: '86',
       })(
         <Select style={{ width: 70 }}>
           <Option value="86">+86</Option>
           <Option value="87">+87</Option>
         </Select>
       );

       const websiteOptions = autoCompleteResult.map(website => (
         <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
       ));
        return (
            <div className={style.registerContainer}>

                 <div className={style.registerFormContainer}>
                     <div className={style.registerTitle}>
                        <Divider orientation="left" >注册</Divider>
                      </div>
                    <Form onSubmit={this.handleSubmit} className={style.registerForm}>
                      <FormItem
                        {...formItemLayout}
                        label="邮箱地址"
                      >
                        {getFieldDecorator('email', {
                          rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                          }, {
                            required: true, message: 'Please input your E-mail!',
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="密码"
                      >
                        {getFieldDecorator('password', {
                          rules: [{
                            required: true, message: 'Please input your password!',
                          }, {
                            validator: this.validateToNextPassword,
                          }],
                        })(
                          <Input type="password" />
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="确认密码"
                      >
                        {getFieldDecorator('confirm', {
                          rules: [{
                            required: true, message: 'Please confirm your password!',
                          }, {
                            validator: this.compareToFirstPassword,
                          }],
                        })(
                          <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label={(
                          <span>
                            用户名&nbsp;
                            <Tooltip title="What do you want others to call you?">
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          </span>
                        )}
                      >
                        {getFieldDecorator('nickname', {
                          rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(
                          <Input />
                        )}
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="网址"
                      >
                        {getFieldDecorator('website', {
                          rules: [{ message: 'Please input website!' }],
                        })(
                          <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="博客地址"
                          >
                            <Input />
                          </AutoComplete>
                        )}
                      </FormItem>

                      {/*<FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                          valuePropName: 'checked',
                        })(
                          <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                      </FormItem>*/}
                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className={style.registeFormButton}>注册</Button>
                      </FormItem>
                    </Form>
                </div>


            </div>
        )
    }

}
const Register = Form.create()(RegisterForm);

export default Register
