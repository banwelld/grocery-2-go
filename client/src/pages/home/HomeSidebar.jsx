// HomeSidebar.jsx

import clsx from "clsx";
import HeadingGroup from "../../components/HeadingGroup";
import "../../css/home.css";
import "../../css/info-page.css";

export default function HomeSidebar({ filter, sort }) {
  const { category, setCategory, categories } = filter;
  const { selectedSort, setSelectedSort, sortLabels } = sort;

  const headingText = "Grocery2Go";
  const subheadingText = "Home - Product Listing";

  const onFilterClick = (e) => {
    setCategory(e.target.textContent);
  };

  const onSortClick = (e) => {
    setSelectedSort(e.target.textContent);
  };

  return (
    <>
      <HeadingGroup>
        {headingText}
        {subheadingText}
      </HeadingGroup>
      <div className='sort-filter'>
        <div className='department'>
          <h2>Filter for...</h2>
          <ul className='filters'>
            {categories.map((c) => (
              <li
                key={c}
                className={clsx("graceful-hover", {
                  active: c === category,
                })}
                onClick={onFilterClick}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className='sort-prop'>
          <h2>Sort by...</h2>
          <ul className='sorts'>
            {sortLabels.map((sort) => (
              <li
                key={sort}
                className={clsx("graceful-hover", { active: sort === selectedSort })}
                onClick={onSortClick}
              >
                {sort}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
