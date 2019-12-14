import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { formateDate } from "../../utils/dateUtils";
import LinkButton from "../../components/link-button/index";
import { reqDeleteUser, reqUsers, reqAddOrUpdateUser } from "../../api/index";
import UserForm from "./user-form";

/*
用户路由
 */
export default class User extends Component {
  state = {
    users: [], // 所有用户列表
    roles: [], // 所有角色列表
    isShow: false // 是否显示确认框
  };

  initColumns = () => {
    this.columns = [
      {
        title: "USERNAME",
        dataIndex: "username"
      },
      {
        title: "EMAIL",
        dataIndex: "email"
      },

      {
        title: "PHONE",
        dataIndex: "phone"
      },
      {
        title: "REGISTER TIME",
        dataIndex: "create_time",
        render: formateDate
      },
      {
        title: "ROLE",
        dataIndex: "role_id",
        render: role_id => this.roleNames[role_id]
      },
      {
        title: "OPERATIONS",
        render: user => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>EDIT</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>
              DELETE
            </LinkButton>
          </span>
        )
      }
    ];
  };

  /*
  根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
   */
  initRoleNames = roles => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    // 保存
    this.roleNames = roleNames;
  };

  /*
  显示添加界面
   */
  showAdd = () => {
    this.user = null; // 去除前面保存的user
    this.setState({ isShow: true });
  };

  /*
  显示修改界面
   */
  showUpdate = user => {
    this.user = user; // 保存user
    this.setState({
      isShow: true
    });
  };

  /*
  删除指定用户
   */
  deleteUser = user => {
    Modal.confirm({
      title: `Confirm delete ${user.username}?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id);
        if (result.status === 0) {
          message.success("Delete user success!");
          this.getUsers();
        }
      }
    });
  };

  /*
  添加/更新用户
   */
  addOrUpdateUser = async () => {
    this.setState({ isShow: false });

    // 1. 收集输入数据
    const user = this.form.getFieldsValue();
    this.form.resetFields();
    // 如果是更新, 需要给user指定_id属性
    if (this.user) {
      user._id = this.user._id;
    }

    // 2. 提交添加的请求
    const result = await reqAddOrUpdateUser(user);
    // 3. 更新列表显示
    if (result.status === 0) {
      message.success(`${this.user ? "Update " : "Add "} user success`);
      this.getUsers();
    }
  };

  getUsers = async () => {
    const result = await reqUsers();
    if (result.status === 0) {
      const { users, roles } = result.data;
      this.initRoleNames(roles);
      this.setState({
        users,
        roles
      });
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { users, roles, isShow } = this.state;
    const user = this.user || {};

    const title = (
      <Button type="primary" onClick={this.showAdd}>
        CREAT USER
      </Button>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: 2 }}
        />

        <Modal
          title={user._id ? "EDIT" : "ADD USER"}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields();
            this.setState({ isShow: false });
          }}
        >
          <UserForm
            setForm={form => (this.form = form)}
            roles={roles}
            user={user}
          />
        </Modal>
      </Card>
    );
  }
}
