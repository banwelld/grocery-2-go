// ProdCard.jsx

import React from "react";

export default function ProdCard({item}) {
  return (
    <article className='product-card grow-with-ease'>
      <div className='card-image-wrapper'>
        <img src={item.image_url} alt={item.name} />
      </div>
      <h2 className='card-name'>{item.name}</h2>
      <p className='card-origin'>
        <span>Product of</span> {item.origin}
      </p>
      <p className='card-price'>
        ${item.unit_price / 100} <span className='card-unit'>/ {item.unit}</span>
      </p>
    </article>
  );
}
