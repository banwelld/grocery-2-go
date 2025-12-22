// /client/src/pages/home/homeConfig.js

import { compareSortValues } from "../../helpers/helpers";

export const sortConfig = [
  {
    value: "department",
    label: "Department",
    comparator: compareSortValues({ key: "category" }),
  },
  {
    value: "nameAsc",
    label: "Name (A → Z)",
    comparator: compareSortValues({ key: "name" }),
  },
  {
    value: "nameDesc",
    label: "Name (Z → A)",
    comparator: compareSortValues({ key: "name", type: "string", direction: "desc" }),
  },
  {
    value: "priceAsc",
    label: "Price ($ → $$$)",
    comparator: compareSortValues({ key: "price", type: "number" }),
  },
  {
    value: "priceDesc",
    label: "Price ($$$ → $)",
    comparator: compareSortValues({ key: "price", type: "number", direction: "desc" }),
  },
];
