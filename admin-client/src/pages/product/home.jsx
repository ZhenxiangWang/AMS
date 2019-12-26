import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";

import LinkButton from "../../components/link-button";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";
import memoryUtils from "../../utils/memoryUtils";

const Option = Select.Option;

/*
Product的默认子路由组件
 */
export default class ProductHome extends Component {
  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: "", // 搜索的关键字名称
    searchType: "productName" // 根据哪个字段搜索，默认按名称搜
  };

  /*
  初始化table表格的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: "NAME",
        dataIndex: "name"
      },
      {
        title: "DESCRIPTION",
        dataIndex: "desc"
      },
      {
        title: "PRICE",
        dataIndex: "price",
        render: price => "$" + price // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width: 120,
        title: "STATUS",
        // dataIndex: 'status',
        render: product => {
          const { status, _id } = product;
          const newStatus = status === 1 ? 2 : 1;
          return (
            <span>
              <Button
                type="primary"
                onClick={() => this.updateStatus(_id, newStatus)}
                style={{
                  width: 110,
                  alignItems: "center"
                }}
              >
                {status === 1 ? "UNPUBLISH" : "PUBLISH"}
              </Button>
              <div
                style={{ width: 110, textAlign: "center", marginTop: "5px" }}
              >
                {status === 1 ? "ON SALE" : "STOP SALE"}
              </div>
            </span>
          );
        }
      },
      {
        width: 150,
        title: "OPERATION",
        render: product => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={() => this.showDetail(product)}>
                DETAIL
              </LinkButton>
              <LinkButton onClick={() => this.showUpdate(product)}>
                EDIT
              </LinkButton>
            </span>
          );
        }
      }
    ];
  };

  /*
  显示商品详情界面
   */
  showDetail = procut => {
    // 缓存product对象 ==> 给detail组件使用
    memoryUtils.product = procut;
    this.props.history.push("/product/detail");
  };

  /*
  显示修改商品界面
   */
  showUpdate = procut => {
    // 缓存product对象 ==> 给detail组件使用
    memoryUtils.product = procut;
    this.props.history.push("/product/addupdate");
  };

  /*
  获取指定页码的列表数据显示
   */
  getProducts = async pageNum => {
    this.pageNum = pageNum; // 保存pageNum, 让其它方法可以看到
    this.setState({ loading: true }); // 显示loading

    const { searchName, searchType } = this.state;
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result;
    if (searchName) {
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType
      });
    } else {
      // 一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE);
    }

    this.setState({ loading: false }); // 隐藏loading
    if (result.status === 0) {
      // 取出分页数据, 更新状态, 显示分页列表
      const { total, list } = result.data;
      this.setState({
        total,
        products: list
      });
    }
  };

  /*
  更新指定商品的状态
   */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success("UPDATE ITEM SUCCESS");
      this.getProducts(this.pageNum);
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    // 取出状态数据
    const { products, total, loading, searchType, searchName } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 210 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="productName">SEARCH BY NAME</Option>
          <Option value="productDesc">SEARCH BY DESCRIPTION</Option>
        </Select>
        <Input
          placeholder="KEY WORDS"
          style={{ width: 150, margin: "0 15px" }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>
          SEARCH
        </Button>
      </span>
    );

    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/product/addupdate")}
      >
        <Icon type="plus" />
        ADD
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    );
  }
}
