import React, { useState } from "react";
import "../../scss/main/main.scss";
import PageLayout from "../page-layout/page-layout";
import Sidebar from "../sidebar/sidebar";
import Content from "../content/content";

/*
Компонент Main
Вызываем здесь Sidebar/Content
*/

export default function Main() {
  /*
Инициализируем состояние sidebar
*/

  const [sidebarState, setSidebarState] = useState(false);

  return (
    <PageLayout>
      <div className="main">
        <div className="main-container">
          <Sidebar onClick={(active) => setSidebarState(active)} />
          <Content sidebarState={sidebarState} />
        </div>
      </div>
    </PageLayout>
  );
}
