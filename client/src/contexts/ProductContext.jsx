// /client/src/contexts/ProductContext.jsx

import { createContext, useState, useEffect, useRef, useMemo } from "react";
import { getData, compareSortValues, runExclusive } from "../helpers/helpers";

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  const concurrencyControls = useMemo(() => ({
    lockRef: isBusyRef,
    setPending: setIsPending
  }), []);

  // fetch products

  useEffect(() => {
    const fn = () => {
      return getData("/products")
        .then((data) => {
          const sortedProducts = [...data].sort(compareSortValues({ key: "name" }));
          setProducts(sortedProducts);
        })
        .catch((err) => console.error("Fetch products failed:", err));
    };
    runExclusive({ fn, ...concurrencyControls });
  }, [concurrencyControls]);

  const categories = useMemo(() => {
    if (!products) return [];
    const allCategories = Array.from(new Set(products.map((p) => p.category)));
    return [...allCategories.sort(compareSortValues())];
  }, [products]);

  const ctx = useMemo(() => ({
    products,
    isPending,
    findProduct: (id) => products.find((p) => p.id === id),
    categories,
  }),
    [products, isPending, categories]
  );

  return <ProductContext.Provider value={ctx}>{children}</ProductContext.Provider>;
}