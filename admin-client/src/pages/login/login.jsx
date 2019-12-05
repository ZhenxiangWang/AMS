import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import { connect } from "react-redux";

import "./login.less"; //样式文件
import logo from "../../assets/images/logo.png";
import { login } from "../../redux/actions";

const Item = Form.Item; // 不能写在import之前

/*
登陆的路由组件.
 */
class Login extends Component {
  handleSubmit = event => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    this.props.form.validateFields(async (err, values) => {
      // 检验成功
      if (!err) {
        // console.log('提交登陆的ajax请求', values)
        // 请求登陆
        const { username, password } = values;

        // 调用分发异步action的函数 => 发登陆的异步请求, 有了结果后更新状态
        this.props.login(username, password);
      } else {
        console.log("检验失败!");
      }
    });

    // 得到form对象
    // const form = this.props.form
    // // 获取表单项的输入数据
    // const values = form.getFieldsValue()
    // console.log('handleSubmit()', values)
  };

  /*
  对密码进行自定义验证
  */
  /*
   用户名/密码的的合法性要求
     1). 必须输入
     2). 必须大于等于4位
     3). 必须小于等于12位
     4). 必须是英文、数字或下划线组成
    */
  validatePwd = (rule, value, callback) => {
    console.log("validatePwd()", rule, value);
    if (!value) {
      callback("Please input your password!");
    } else if (value.length < 4) {
      callback("Password must be at least 4 characters.");
    } else if (value.length > 12) {
      callback("Password must be at most 12 characters.");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("Password must contain only letters, numbers, or underscores.");
    } else {
      callback(); // 验证通过
    }
    // callback('xxxx') // 验证失败, 并指定提示的文本
  };

  render() {
    // 如果用户已经登陆, 自动跳转到管理界面
    const user = this.props.user;
    if (user && user._id) {
      return <Redirect to="/home" />;
    }

    // 得到具强大功能的form对象
    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>Admin Management System</h1>
        </header>
        <section className="login-content">
          <div className={user.errorMsg ? "error-msg show" : "error-msg"}>
            {user.errorMsg}
          </div>
          <h2>User Login</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {/*
              用户名/密码的的合法性要求
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
               */}
              {getFieldDecorator("username", {
                // 配置对象: 属性名是特定的一些名称
                // 声明式验证: 直接使用别人定义好的验证规则进行验证
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your username!"
                  },
                  {
                    min: 4,
                    message: "User name must be at least 4 characters."
                  },
                  {
                    max: 12,
                    message: "User name must be at most 12 characters."
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message:
                      "User name  must contain only letters, numbers, or underscores."
                  }
                ],
                initialValue: "admin" // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="User Name"
                />
              )}
            </Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validatePwd
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */
/*
包装Form组件生成一个新的组件: Form(Login)
新组件会向Form组件传递一个强大的对象属性: form
 */
const WrapLogin = Form.create()(Login);
export default connect(state => ({ user: state.user }), { login })(WrapLogin);

/*
1. 前台表单验证
2. 收集表单输入数据
 */

/*
async和await
1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
 */
