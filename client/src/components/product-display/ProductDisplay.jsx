// client/src/pages/product/ProductDisplay.jsx

import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import { displayConfig } from "./displayConfig";
import { toClassName } from "../../helpers/helpers";

const BLOCK = "product-display";

export default function ProductDisplay({ product, displayVariant = "card" }) {
  const { name, imageUrl } = product;
  const { imageLoadMethod } = displayConfig[displayVariant];

  const imageProps = {
    alt: name,
    src: imageUrl,
    loading: imageLoadMethod,
    bemBlock: BLOCK,
  };

  const detailsProps = { product, displayVariant, bemBlock: BLOCK };

  return (
    <div className={toClassName({ bemBlock: BLOCK, bemElem: "container" })}>
      <div className={toClassName({ bemBlock: BLOCK, bemElem: "inner" })}>
        <ProductImage {...imageProps} />
        <ProductDetails {...detailsProps} />
      </div>
    </div>
  );
}
