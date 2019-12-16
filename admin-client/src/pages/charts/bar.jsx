import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";

/*
后台管理的柱状图路由组件
 */
export default class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20], // 销量的数组
    stores: [6, 10, 25, 20, 15, 10] // 库存的数组
  };

  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store - 1);
        return pre;
      }, [])
    }));
  };

  /*
  返回柱状图的配置对象
   */
  getOption = (sales, stores) => {
    return {
      title: {
        text: "ECharts"
      },
      tooltip: {},
      legend: {
        data: ["Sales", "Inventory"]
      },
      xAxis: {
        data: ["Blouse", "Sweater", "Shirt", "Trousers", "High Heels", "Socks"]
      },
      yAxis: {},
      series: [
        {
          name: "Sales",
          type: "bar",
          data: sales
        },
        {
          name: "Inventory",
          type: "bar",
          data: stores
        }
      ]
    };
  };

  render() {
    const { sales, stores } = this.state;
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>
            UPDATE
          </Button>
        </Card>

        <Card title="BAR CHART">
          <ReactEcharts option={this.getOption(sales, stores)} />
        </Card>
      </div>
    );
  }
}
