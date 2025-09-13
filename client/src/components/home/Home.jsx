// Home.jsx

import React, { useState, useContext } from "react";
import ProdCard from "./ProdCard";
import { ItemContext } from "../../contexts";
import SplitPage from "../templates/SplitPage";
import SortFilter from "./SortFilter";
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

  const filterItems = (items) => {
    return items.filter((item) => {
      return filterCategory === "all" || item.category === filterCategory;
    });
  };

  const sortOptions = ["department", "name ↥", "name ↧", "price ↥", "price ↧"];

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
    <SortFilter
      categories={categories}
      filterCategory={filterCategory}
      setFilterCategory={setFilterCategory}
      itemSort={itemSort}
      setItemSort={setItemSort}
    />
  );

  return (
    <SplitPage sidebar={sidebar}>
      <div className='item-grid'>{cards}</div>;
    </SplitPage>
  );
}
