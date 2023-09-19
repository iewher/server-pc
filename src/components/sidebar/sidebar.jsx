import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";

/*
Компонент Sidebar
*/

export default function Sidebar({ onClick }) {
  function getItem(label, icon, children, type) {
    return {
      icon,
      children,
      label,
      type,
    };
  }

  /*
Фукнция, добавляющая при нажатии на item в адресную строку /cmdb
*/

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

  /*
меню реализовано с помощью UI
*/

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
