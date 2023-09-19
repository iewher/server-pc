import React from "react";
import "../../scss/app.scss";
import Main from "../main/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*
Компонент App
Навигация реализовано с помощью react-router-dom
*/

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
