// Home.jsx

import React, { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import ProdCard from "./ProdCard";
import { OrderContext } from "../../contexts";
import SplitPageWrapper from "../info-page/SplitPageWrapper";
import HomeSidebar from "./HomeSidebar";
import CartMgmtWrapper from "../cart-management/CartMgmtWrapper";
import "../../css/home.css";

export default function Home() {
  const { items } = useOutletContext();
  const { cartItems } = useContext(OrderContext);
  const [filterCategory, setFilterCategory] = useState("all");
  const [itemSort, setItemSort] = useState("department");

  if (!items || !cartItems) return <p>Loading...</p>;

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
  console.log(items);
  const displayItems = sortItems(filterItems(items));

  const cards = displayItems.map((item) => {
    return (
      <CartMgmtWrapper key={item.id}>
        <ProdCard item={item} cartItems={cartItems} />
      </CartMgmtWrapper>
    );
  });

  return (
    <SplitPageWrapper>
      {/* sidebar */}
      <HomeSidebar
        categories={categories}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        itemSort={itemSort}
        setItemSort={setItemSort}
      />

      {/* main content */}
      <div className='item-grid'>{cards}</div>
    </SplitPageWrapper>
  );
}
