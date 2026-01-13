// /client/src/pages/home/MainContent.jsx

import ProductCard from "../../components/product-card/ProductCard";
import { toClassName } from "../../helpers/helpers";

export default function MainContent({ products }) {
  const bemProps = {
    bemBlock: "content",
    bemElem: "container",
    bemMod: "home",
  };

  return (
    <div className={toClassName(bemProps)}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
