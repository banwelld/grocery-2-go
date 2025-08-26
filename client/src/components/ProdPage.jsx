// ProdPage.jsx

import React, {useEffect, useState} from "react";
import {useParams, useOutletContext} from "react-router-dom";

export default function ProdPage() {
  const {id} = useParams();
  const {items} = useOutletContext();
  const [item, setItem] = useState(() => items.find((i) => i.id === Number(id)));

  useEffect(() => {
    if (!item) {
      fetch(`/items/${id}`)
      .then((r) => r.json())
      .then(setItem);
    }
  }, [id, item]);

  if (!item) return <p>Item not found.</p>;

  return (
    <article className='prod-page'>
      <div className='prod-page-image-wrapper'>
        <img src={item.image_url} alt={item.name} />
      </div>
      <div className='prod-page-info'>
        <hgroup>
          <h2 className='prod-page-name'>{item.name}</h2>
          <p className='prod-page-origin'>
            <span>Product of</span> {item.origin}
          </p>
        </hgroup>
        <p className='prod-page-description'>{item.description}</p>
        <p className='prod-page-price'>
          ${(item.price / 100).toFixed(2)}{" "}
          <span className='prod-page-unit'>
            / {item.unit}
            {item.pkg_qty && ` (${item.pkg_qty})`}
          </span>
        </p>
      </div>
    </article>
  );
}
