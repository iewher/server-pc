import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export default function Sidebar({ onClick }) {
  function getItem(label, icon, children, type) {
    return {
      icon,
      children,
      label,
      type,
    };
  }

  // Функция для обновления адресной строки
  function updateAddress() {
    const currentPath = window.location.pathname;
    const newPath = "/cmdb";
    if (currentPath !== newPath) {
      window.history.pushState({}, "", newPath);
    }
  }

  const items = [
    getItem("Навигация", <MailOutlined />, [
      getItem("CMDB", null, [getItem("Серверы и пк")], "group"),
    ]),
  ];

  return (
    <div className="sidebar">
      <Menu
        onClick={(e) => {
          onClick(e);
          updateAddress();
        }}
        style={{ width: 256 }}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
