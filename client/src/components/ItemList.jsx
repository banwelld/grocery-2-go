// ItemList.jsx

import React from "react";
import { useOutletContext } from "react-router-dom";
import ProdCard from "./ProdCard";

export default function ItemList() {
  const { items } = useOutletContext();
  const cards = items.map((item) => <ProdCard key={item.id} item={item} />);

  return <div className='product grid'>{cards}</div>;
}
