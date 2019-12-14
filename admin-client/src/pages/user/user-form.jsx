import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

/*
添加/修改用户的form组件
 */
class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  };

  componentWillMount() {
    this.props.setForm(this.props.form);
  }

  render() {
    const { roles, user } = this.props;
    const { getFieldDecorator } = this.props.form;
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 } // 右侧包裹的宽度
    };

    return (
      <Form {...formItemLayout}>
        <Item label="USERNAME">
          {getFieldDecorator("username", {
            initialValue: user.username
          })(<Input placeholder="Please input username" />)}
        </Item>

        {user._id ? null : (
          <Item label="PASSWORD">
            {getFieldDecorator("password", {
              initialValue: user.password
            })(<Input type="password" placeholder="Please input password" />)}
          </Item>
        )}

        <Item label="PHONE">
          {getFieldDecorator("phone", {
            initialValue: user.phone
          })(<Input placeholder="Please input phone number" />)}
        </Item>
        <Item label="EMAIL">
          {getFieldDecorator("email", {
            initialValue: user.email
          })(<Input placeholder="Please input email" />)}
        </Item>

        <Item label="ROLE">
          {getFieldDecorator("role_id", {
            initialValue: user.role_id
          })(
            <Select>
              {roles.map(role => (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);
