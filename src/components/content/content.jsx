import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { moki } from "../moki/moki";
import Card from "../card/card";

export default function Content({ sidebarState }) {
  const [value, setValue] = useState("");

  console.log(value);

  return (
    <div className="content">
      {sidebarState ? (
        <div className="active">
          <h2>Фильтры</h2>
          <div className="filters">
            <input
              value={value}
              placeholder="Поиск..."
              onChange={(event) => setValue(event.target.value)}
            />
            <div className="checkbox">
              <input type="checkbox" id="server" name="server" value="server" />
              <label for="server">Сервер</label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="pc" name="pc" value="pc" />
              <label for="pc">ПК</label>
            </div>
          </div>
          <h2>Карточки</h2>
          <div className="cards">
            {moki.map((item) => {
              return <Card item={item} />;
            })}
          </div>
        </div>
      ) : (
        <div className="unactive">
          <AiOutlineSearch />
          <p>Выберите категорию</p>
        </div>
      )}
    </div>
  );
}
