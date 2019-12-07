import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
//将组件后缀写成jsx而不是js，为了区分是不是组件
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

/*
root component
 */
export default class App extends Component {
  render() {
    return (
      //React组件名，首字母大写.
      //路由器
      //用BrowserRouter可以去掉井号
      <HashRouter>
        <Switch>
          {" "}
          {/*only match one of these*/}
          {/* 一个路由是一个映射关系 */}
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </HashRouter>
    );
  }
}
