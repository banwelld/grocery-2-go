// /client/src/pages/home/Home.jsx

import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../contexts/contexts";
import PageFrame from "../../components/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { compareSortValues } from "../../helpers/helpers";
import { sortConfig as srt } from "./homeConfig";
import { PageName as pn } from "../page-enums";
import "./home.css";

export default function Home() {
  const { products } = useContext(ProductContext);
  const [category, setCategory] = useState("all");
  const [sortName, setSortName] = useState("department");

  // prep all products for display

  if (!products) return <p>Loading...</p>;

  const matchCategory = (p) => category === "all" || p.category === category;
  const filterFn = (products) => products.filter(matchCategory);

  const comparator = srt.find((s) => s.value === sortName).comparator;
  const sortFn = (p) => [...p].sort(comparator);

  const displayProducts = sortFn(filterFn(products));

  const allCategories = Array.from(new Set(products.map((p) => p.category)));
  const sortedCategories = [...allCategories].sort(compareSortValues);
  const filterLabels = ["all", ...sortedCategories];

  const sidebarConfig = [
    {
      sectionProps: {
        heading: "Filter by:",
        bemMod: "filters",
      },
      listProps: {
        items: filterLabels,
        selected: category,
        setterFn: setCategory,
        bemBlock: "sidebar",
      },
    },
    {
      sectionProps: {
        heading: "Sort by:",
        bemMod: "sorts",
      },
      listProps: {
        items: srt,
        selected: sortName,
        setterFn: setSortName,
        bemBlock: "sidebar",
      },
    },
  ];

  return (
    <PageFrame
      sidebar={<Sidebar sidebarConfig={sidebarConfig} />}
      mainContent={<MainContent products={displayProducts} />}
      pageName={pn.HOME}
    />
  );
}
