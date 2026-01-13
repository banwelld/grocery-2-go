// /client/src/pages/home/Home.jsx

import { useState, useContext, useMemo } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import PageFrame from "../../components/section-frames/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { sortConfig as srt } from "./homeConfig";
import { PageName } from "../enums";


export default function Home() {
  const { products, categories } = useContext(ProductContext);
  const [category, setCategory] = useState("all");
  const [sortName, setSortName] = useState("department");

  const displayProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }

    const sortOption = srt.find((s) => s.value === sortName);
    if (sortOption) {
      result.sort(sortOption.comparator);
    }

    return result;
  }, [products, category, sortName]);

  const filterLabels = useMemo(() => {
    return ["all", ...categories];
  }, [categories]);

  const sidebarConfig = useMemo(() => [
    {
      sectionProps: {
        heading: "Filter by:",
        bemMod: "filters",
      },
      listProps: {
        items: filterLabels,
        selected: category,
        setState: setCategory,
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
        setState: setSortName,
        bemBlock: "sidebar",
      },
    },
  ], [filterLabels, category, sortName]);

  if (!products) return <p>Loading products...</p>;

  return (
    <PageFrame
      sidebar={<Sidebar config={sidebarConfig} />}
      mainContent={<MainContent products={displayProducts} />}
      pageName={PageName.HOME}
    />
  );
}
