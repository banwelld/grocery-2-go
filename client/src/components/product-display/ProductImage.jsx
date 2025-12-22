// client/src/pages/product/ProductImage.jsx

import "./product-image.css";

export default function ProductImage({ bemBlock, ...imgProps }) {
  return (
    <div className={`${bemBlock}__image-wrapper`}>
      <img className={`${bemBlock}__image`} {...imgProps} />
    </div>
  );
}
