import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export default function Sidebar({ onClick }) {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Навигация", "sub1", <MailOutlined />, [
      getItem("CMDB", "g1", null, [getItem("Серверы и пк", "1")], "group"),
    ]),
  ];

  return (
    <div className="sidebar">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
