const menuList = [
  {
    title: "HOME", // 菜单标题名称
    key: "/home", // 对应的path
    icon: "home", // 图标名称
    isPublic: true // 公开的
  },
  {
    title: "PRODUCTS",
    key: "/products",
    icon: "appstore",
    children: [
      // 子菜单列表
      {
        title: "CATEGORIES",
        key: "/category",
        icon: "bars"
      },
      {
        title: "ITEMS",
        key: "/product",
        icon: "tool"
      }
    ]
  },

  {
    title: "USERS",
    key: "/user",
    icon: "user"
  },
  {
    title: "ROLES",
    key: "/role",
    icon: "safety"
  },

  {
    title: "CHARTS",
    key: "/charts",
    icon: "area-chart",
    children: [
      {
        title: "BAR",
        key: "/charts/bar",
        icon: "bar-chart"
      },
      {
        title: "LINE",
        key: "/charts/line",
        icon: "line-chart"
      },
      {
        title: "PIE",
        key: "/charts/pie",
        icon: "pie-chart"
      }
    ]
  },

  {
    title: "ORDERS",
    key: "/order",
    icon: "windows"
  }
];

export default menuList;
