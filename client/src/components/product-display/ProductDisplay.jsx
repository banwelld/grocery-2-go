// client/src/pages/product/ProductDisplay.jsx

import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import { displayConfig } from "./displayConfig";

export default function ProductDisplay({ product, displayVariant = "card" }) {
  const { name: alt, imageUrl: src } = product;
  const { imageLoadMethod: loading } = displayConfig[displayVariant];

  const bemBlock = "product-display";

  return (
    <div className={`${bemBlock}__container`}>
      <div className={`${bemBlock}__inner`}>
        <ProductImage {...{ alt, src, loading }} bemBlock={bemBlock} />
        <ProductDetails {...{ product, displayVariant, bemBlock }} />
      </div>
    </div>
  );
}
