import React, { useState, useEffect } from "react";
import { moki } from "../moki/moki";
import CardItem from "../card/card";
import { Input, Checkbox, Spin } from "antd";

export default function Content({ sidebarState }) {
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("");
  const [tagFilters, setTagFilters] = useState({});

  /*
    Получаем уникальные теги с moki
  */

  useEffect(() => {
    const uniqueTags = [...new Set(moki.flatMap((item) => item.tags))];
    const initialTagFilters = {};
    uniqueTags.forEach((tag) => {
      initialTagFilters[tag] = false;
    });
    setTagFilters(initialTagFilters);
  }, []);

  const filteredData = moki.filter((item) => {
    if (filterType && item.type !== filterType) {
      return false;
    }

    /*
    Фильтрация по значению с поиска
    */

    const nameMatch = item.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    /*
    Фильтрация по выбранным тегам
    */

    const tagMatch =
      Object.values(tagFilters).every((value) => !value) ||
      Object.keys(tagFilters).some(
        (tag) => tagFilters[tag] && item.tags.includes(tag)
      );

    return nameMatch && tagMatch;
  });

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const newValue = event.target.value;
    if (filterType === newValue) {
      setFilterType("");
    } else {
      setFilterType(newValue);
    }
  };

  const handleTagCheckboxChange = (event) => {
    const tag = event.target.value;
    const updatedTagFilters = { ...tagFilters, [tag]: !tagFilters[tag] };
    setTagFilters(updatedTagFilters);
  };

  return (
    <div className="content">
      {sidebarState ? (
        <div className="active">
          <h2
            style={{
              marginTop: '10px',
              marginBottom: "10px",
            }}
          >
            Фильтры
          </h2>
          <div className="filters">
            <h1>Название</h1>
            <Input
              value={searchValue}
              placeholder="Поиск по названию..."
              onChange={handleSearchInputChange}
            />
            <h1
              style={{
                marginTop: '10px',
                marginBottom: "10px",
              }}
            >
              Тип
            </h1>
            <div className="checkbox">
              <Checkbox
                type="checkbox"
                id="server"
                name="server"
                value="Сервер"
                checked={filterType === "Сервер"}
                onChange={handleCheckboxChange}
              >
                Сервер
              </Checkbox>
            </div>
            <div className="checkbox">
              <Checkbox
                type="checkbox"
                id="pc"
                name="pc"
                value="ПК"
                checked={filterType === "ПК"}
                onChange={handleCheckboxChange}
              >
                ПК
              </Checkbox>
            </div>
            <h1
              style={{
                marginTop: '10px',
                marginBottom: "10px",
              }}
            >
              Теги
            </h1>
            {Object.keys(tagFilters).map((tag) => (
              <div className="checkbox" key={tag}>
                <Checkbox
                  type="checkbox"
                  id={tag}
                  name={tag}
                  value={tag}
                  checked={tagFilters[tag]}
                  onChange={handleTagCheckboxChange}
                >
                  {tag}
                </Checkbox>
              </div>
            ))}
          </div>
          <h2>Карточки</h2>
          <div className="cards">
            {filteredData.map((item) => {
              return <CardItem key={item.id} item={item} />;
            })}
          </div>
        </div>
      ) : (
        <div className="unactive">
          <Spin size="large" />
          <p
            style={{
              marginTop: "30px",
            }}
          >
            Ожидаем выбора в дереве
          </p>
        </div>
      )}
    </div>
  );
}
