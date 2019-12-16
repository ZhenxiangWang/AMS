import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const Item = Form.Item;

/*
添加分类的form组件
 */
class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired // 用来传递form对象的函数
  };

  componentWillMount() {
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 } // 右侧包裹的宽度
    };

    return (
      <Form>
        <Item label="NAME" {...formItemLayout}>
          {getFieldDecorator("roleName", {
            initialValue: "",
            rules: [{ required: true, message: "Role name is required" }]
          })(<Input placeholder="Please input role name" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
