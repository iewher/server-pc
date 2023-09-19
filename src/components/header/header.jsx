import React from "react";
import "../../scss/header/header.scss";
import { Switch, Button } from "antd";

export default function Header() {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="header">
      <div className="header-container">
        <Button type="text">Server-pc</Button>
        <div className="button-dark">
          <Switch onChange={onChange} />
          <p>Темная тема</p>
        </div>
        <Button type="link" href="/">На главную</Button>
      </div>
    </div>
  );
}
