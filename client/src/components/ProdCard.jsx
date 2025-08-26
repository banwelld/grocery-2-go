// ProdCard.jsx

import React from "react";
import {Link} from "react-router-dom";

export default function ProdCard({item}) {
  return (
    <Link to={`items/${item.id}`} className='card-link'>
      <article className='product-card grow-with-ease'>
        <div className='card-image-wrapper'>
          <img src={item.image_url} alt={item.name} />
        </div>
        <hgroup>
          <h2 className='card-name'>{item.name}</h2>
          <p className='card-origin'>
            <span>Product of</span> {item.origin}
          </p>
        </hgroup>
        <p className='card-price'>
          ${(item.price / 100).toFixed(2)}{" "}
          <span className='card-unit'>
            / {item.unit}
            {item.pkg_qty && ` (${item.pkg_qty})`}
          </span>
        </p>
      </article>
    </Link>
  );
}
