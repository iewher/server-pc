import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { moki } from "../moki/moki";
import Card from "../card/card";

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
          <h2>Фильтры</h2>
          <div className="filters">
            <h1>Название</h1>
            <input
              value={searchValue}
              placeholder="Поиск по названию..."
              onChange={handleSearchInputChange}
            />
            <h1>Тип</h1>
            <div className="checkbox">
              <input
                type="checkbox"
                id="server"
                name="server"
                value="Сервер"
                checked={filterType === "Сервер"}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="server">Сервер</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="pc"
                name="pc"
                value="ПК"
                checked={filterType === "ПК"}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="pc">ПК</label>
            </div>
            <h1>Теги</h1>
            {Object.keys(tagFilters).map((tag) => (
              <div className="checkbox" key={tag}>
                <input
                  type="checkbox"
                  id={tag}
                  name={tag}
                  value={tag}
                  checked={tagFilters[tag]}
                  onChange={handleTagCheckboxChange}
                />
                <label htmlFor={tag}>{tag}</label>
              </div>
            ))}
          </div>
          <h2>Карточки</h2>
          <div className="cards">
            {filteredData.map((item) => {
              return <Card key={item.id} item={item} />;
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
