// ProdPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

export default function ProdPage() {
  const { id } = useParams();
  const { items } = useOutletContext();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const existingItem = items.find((i) => i.id === Number(id));
    if (existingItem) {
      setItem(existingItem);
    } else {
      fetch(`/items/${id}`)
      .then((r) => r.json())
      .then(setItem);
    }
  }, [id, item]);

  if (!item) return <p>Loading...</p>;

  return (
    <article className='product-page'>
      <div className='image-wrapper'>
        <img src={item.image_url} alt={item.name} />
      </div>
      <div className='info'>
        <hgroup>
          <h2>{item.name}</h2>
          <p>Product of {item.origin}</p>
        </hgroup>
        <p className='desc'>{item.description}</p>
        <p className='price'>
          <span>${(item.price / 100).toFixed(2)} </span>
          <span>
            / {item.unit}
            {item.pkg_qty && ` (${item.pkg_qty})`}
          </span>
        </p>
      </div>
    </article>
  );
}
