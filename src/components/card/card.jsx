import React from "react";

export default function Card({ item }) {
  return (
    <div className="card" key={item.id}>
      <p>Название: {item.name}</p>
      <p>Тип: {item.type}</p>
      <ul>
        Теги:
        {item.tags.map((tag) => {
          return <li>{tag}</li>;
        })}
      </ul>
    </div>
  );
}
