// Home.jsx

import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../contexts/contexts";
import ProdCard from "./ProdCard";
import SplitPageWrapper from "../../components/SplitPageWrapper";
import HomeSidebar from "./HomeSidebar";
import "../../css/home.css";

export default function Home() {
  const { products } = useContext(ProductContext);
  const [category, setCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("department");

  if (!products) return <p>Loading...</p>;

  const categories = [
    "all",
    ...[...new Set(products.map((i) => i.category))].sort((a, b) => a.localeCompare(b)),
  ];

  const filterProducts = (products) => {
    return products.filter((p) => {
      return category === "all" || p.category === category;
    });
  };

  const sortOptions = {
    department: (a, b) => a.category.localeCompare(b.category),
    "name ↥": (a, b) => a.name.localeCompare(b.name),
    "name ↧": (a, b) => b.name.localeCompare(a.name),
    "price ↥": (a, b) => a.price - b.price,
    "price ↧": (a, b) => b.price - a.price,
  };

  const sortLabels = Object.keys(sortOptions);

  const sortProducts = (p) => [...p].sort(sortOptions[selectedSort]);

  const displayProducts = sortProducts(filterProducts(products));

  return (
    <SplitPageWrapper>
      <HomeSidebar
        filter={{ category, setCategory, categories }}
        sort={{ selectedSort, setSelectedSort, sortLabels }}
      />

      <div className='product-grid'>
        {displayProducts.map((p) => (
          <ProdCard key={p.id} product={p} />
        ))}
      </div>
    </SplitPageWrapper>
  );
}
