// ItemList.jsx

import React from "react";
import ProdCard from "./ProdCard";

export default function ItemList({items, orderItems, setOrderItems}) {
  const cards = items.map((item) => <ProdCard key={item.id} item={item} />);
  return <div className='product-grid'>{cards}</div>;
}
