// /client/src/components/tables/ImageCell.jsx

import ProductImage from "../product-display/ProductImage";

export default function ImageCell({ cellData }) {
  const { imageUrl: src, name: alt } = cellData;
  return <ProductImage {...{ src, alt, loading: "eager" }} bemBlock='table' />;
}
