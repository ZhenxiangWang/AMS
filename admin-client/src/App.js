import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

/*
root component
 */
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {" "}
          {/*only match one of these*/}
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </HashRouter>
    );
  }
}
