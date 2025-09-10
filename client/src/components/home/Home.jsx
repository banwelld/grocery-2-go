// ItemList.jsx

import React, { useState, useContext } from "react";
import ProdCard from "./ProdCard";
import { ItemContext } from "../../contexts";
import Heading from "../info-page/Heading";
import PageTemplate from "../info-page/PageTemplate";
import "../../css/home.css";
import "../../css/info-page.css";

export default function Home() {
  const { items } = useContext(ItemContext);
  const [filterCategory, setFilterCategory] = useState("all");
  const [itemSort, setItemSort] = useState("department");

  // get all item categories for filtering
  const categories = [
    "all",
    ...[...new Set(items.map((i) => i.category))].sort((a, b) => a.localeCompare(b)),
  ];

  const onFilterClick = (e) => {
    setFilterCategory(e.target.textContent);
  };

  const departments = categories.map((category) => (
    <li
      key={category}
      className={`graceful-hover ${category === filterCategory ? "active" : ""}`}
      onClick={onFilterClick}
    >
      {category}
    </li>
  ));

  const filterItems = (items) => {
    return items.filter((item) => {
      return filterCategory === "all" || item.category === filterCategory;
    });
  };

  const sortOptions = ["department", "name ↥", "name ↧", "price ↥", "price ↧"];

  const onSortClick = (e) => {
    setItemSort(e.target.textContent);
  };

  const sorts = sortOptions.map((sort) => (
    <li
      key={sort}
      className={`graceful-hover ${sort === itemSort ? "active" : ""}`}
      onClick={onSortClick}
    >
      {sort}
    </li>
  ));

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      switch (itemSort) {
        case sortOptions[0]:
          return a.category.localeCompare(b.category);

        case sortOptions[1]:
          return a.name.localeCompare(b.name);

        case sortOptions[2]:
          return b.name.localeCompare(a.name);

        case sortOptions[3]:
          return a.price - b.price;

        case sortOptions[4]:
          return b.price - a.price;

        default:
          return 0;
      }
    });
  };

  const displayItems = sortItems(filterItems(items));

  const cards = displayItems.map((item) => <ProdCard key={item.id} item={item} />);

  const sidebar = (
    <>
      <Heading text='Grocery2Go' isPgHead={true} subText='Home - Product Listing' />
      <div className='sort-filter'>
        <div className='department'>
          <h2>Filter for...</h2>
          <ul className='filters'>{departments}</ul>
        </div>
        <div className='sort-prop'>
          <h2>Sort by...</h2>
          <ul className='sorts'>{sorts}</ul>
        </div>
      </div>
    </>
  );

  const main = <section className='item-grid'>{cards}</section>;

  return <PageTemplate sidebarContent={sidebar} mainContent={main} />;
}
