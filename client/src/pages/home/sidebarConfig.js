// /client/src/pages/home/sidebarConfig.js

import { compareSortValues } from "../../helpers/helpers";
import { sortConfig as srt } from "./homeConfig";

const filterLabels = useMemo(() => {
  if (!products) return [];
  const allCategories = Array.from(new Set(products.map((p) => p.category)));
  return ["all", ...allCategories.sort(compareSortValues())];
}, [products]);

export const sidebarConfig = [
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
];