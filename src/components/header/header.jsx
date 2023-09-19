import React, { useState } from "react";
import "../../scss/header/header.scss";
import { Switch, Button } from "antd";

export default function Header() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const root = document.getElementById("root");

  const onChange = (checked) => {
    setIsLightTheme((prevTheme) => !prevTheme);
    if (isLightTheme === true) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  return (
    <div className="header">
      <div className="header-container">
        <Button type="link" href="/">
          Server-pc
        </Button>
        <div className="button-dark">
          <Switch onChange={onChange} />
          <p>Темная тема</p>
        </div>
        <Button type="link" href="/">
          На главную
        </Button>
      </div>
    </div>
  );
}
