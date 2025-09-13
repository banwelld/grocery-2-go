// SortFilter.jsx

import React from "react";
import Heading from "../info-page/Heading";
import "../../css/home.css";
import "../../css/info-page.css";

export default function SortFilter({
  categories,
  filterCategory,
  setFilterCategory,
  itemSort,
  setItemSort,
}) {
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

  return (
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
}
