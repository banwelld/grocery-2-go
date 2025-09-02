// ProdCard.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function ProdCard({ item }) {
  return (
    <Link to={`items/${item.id}`}>
      <article className='product card grow-with-ease'>
        <div className='product image wrapper'>
          <img className='product' src={item.image_url} alt={item.name} />
        </div>
        <div className='product info'>
          <hgroup className='product'>
            <h2>{item.name}</h2>
            <p>
              <span>Product of</span> {item.origin}
            </p>
          </hgroup>
          <div className='product price'>
            <span>${(item.price / 100).toFixed(2)} </span> <span>/ {item.unit}</span>{" "}
          </div>
        </div>
      </article>
    </Link>
  );
}
