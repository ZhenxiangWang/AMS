import React from "react";
import "./index.less";
/*
外形像链接的按钮，这是无状态组件，用函数定义
 */
export default function LinkButton(props) {
  return <button {...props} className="link-button"></button>;
}
