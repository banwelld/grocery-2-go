// ProdCard.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function ProdCard({ item }) {
  return (
    <Link to={`items/${item.id}`}>
      <article className='product-card grow-with-ease'>
        <div className='image-wrapper'>
          <img src={item.image_url} alt={item.name} />
        </div>
        <div className='info'>
          <hgroup>
            <h2>{item.name}</h2>
            <p>Product of {item.origin}</p>
          </hgroup>
          <div className='price'>
            <span>${(item.price / 100).toFixed(2)} </span>
            <span>/ {item.unit}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
