// /client/src/pages/home/MainContent.jsx

import ProductCard from "./ProductCard";

export default function MainContent({ products }) {
  return (
    <div className='main-content__container--home'>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
