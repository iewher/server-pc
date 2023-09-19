import React from "react";
import { Card, Space } from "antd";

/*
Компонент Card
*/

export default function CardItem({ item }) {
  return (
    <Space direction="vertical" size={16}>
      <Card
        title={item.name}
        style={{
          width: 300,
          boxShadow: "1px 2px 9px gray",
          marginTop: "20px",
        }}
      >
        <p>Тип: {item.type}</p>
        Теги:
        {item.tags.map((tag, index) => {
          return (
            <li>
              {index + 1}. {tag}
            </li>
          );
        })}
      </Card>
    </Space>
  );
}
