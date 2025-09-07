// ProductPg.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../contexts";
import Heading from "./info-page/Heading";
import PageTemplate from "./info-page/PageTemplate";
import "../css/info-page.css";

export default function ProductPg() {
  const { id } = useParams();
  const { items } = useContext(ItemContext);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!items) return;

    const existingItem = items.find((i) => i.id === Number(id));
    if (existingItem) {
      setItem(existingItem);
    } else {
      fetch(`/items/${id}`)
        .then((r) => r.json())
        .then(setItem);
    }
  }, [id, items]);

  if (!item) return <p>Loading...</p>;

  const sidebar = <Heading text='Order Details' isPgHead={false} />;

  const main = (
    <article className='product-info'>
      <div className='img-wrapper-sq'>
        <img className='img-fit-sq' src={item.image_url} alt={item.name} />
      </div>
      <div className='text'>
        <Heading text={item.name} subText={`Product of ${item.origin}`} />
        <p className='desc'>{item.description}</p>
        <p className='pricing'>
          <span className='price'>${(item.price / 100).toFixed(2)} </span>
          <span className='pkg-desc'>/ {item.unit} </span>
          {item.pkg_qty && <span className='pkg-qty'>({item.pkg_qty})</span>}
        </p>
      </div>
    </article>
  );

  return <PageTemplate sidebarContent={sidebar} mainContent={main} />;
}
