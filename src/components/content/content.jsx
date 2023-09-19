import React, { useState, useEffect } from "react";
import { moki } from "../moki/moki";
import CardItem from "../card/card";
import { Input, Checkbox, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

/*
Компонент Content
*/

export default function Content({ sidebarState }) {
  const navigate = useNavigate();

  /*
Получаем текущее местоположение
*/

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  /*
Инициализируем состояния
*/

  const [searchValue, setSearchValue] = useState(
    queryParams.get("search_val") || ""
  );
  const [filterType, setFilterType] = useState(
    queryParams.get("endpoint_type") || ""
  );
  const [tagFilters, setTagFilters] = useState({});

  /*
Управляем жизненным циклом с помощью useEffect, передавая в массив зависимостей location.search
*/

  useEffect(() => {
    const searchValFromQuery = queryParams.get("search_val") || "";
    const endpointTypeFromQuery = queryParams.get("endpoint_type") || "";

    setSearchValue(searchValFromQuery);
    setFilterType(endpointTypeFromQuery);

    const uniqueTags = [...new Set(moki.flatMap((item) => item.tags))];
    const initialTagFilters = {};
    uniqueTags.forEach((tag) => {
      initialTagFilters[tag] = queryParams.get(tag) === "true";
    });
    setTagFilters(initialTagFilters);
  }, [location.search]);

  const updateQueryString = () => {
    const newSearchParams = new URLSearchParams();

    newSearchParams.set("search_val", searchValue);
    newSearchParams.set("endpoint_type", filterType);

    Object.entries(tagFilters).forEach(([tag, value]) => {
      newSearchParams.set(tag, value.toString());
    });

    navigate(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    updateQueryString();
  }, [searchValue, filterType, tagFilters]);

  /*
Создаем новый массив и перебираем там moki
*/

  const filteredData = moki.filter((item) => {
    if (filterType && item.type !== filterType) {
      return false;
    }

    const nameMatch = item.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());

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
              marginTop: "10px",
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
                marginTop: "10px",
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
                marginTop: "10px",
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
