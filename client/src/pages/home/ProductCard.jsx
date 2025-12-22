// /client/src/pages/home/ProductCard.jsx

import { useNavigate } from "react-router-dom";
import ProductDisplay from "../../components/product-display/ProductDisplay";
import QuantityAdjust from "../../components/QuantityAdjust";
import StopPropagation from "../../components/StopPropagation";

export default function ProductCard({ product }) {
  const { id } = product;
  const navigate = useNavigate();

  if (!id) return <article className='product-card'>Loading...</article>;

  const handleClick = () => navigate(`products/${id}`);
  const handleKeyDown = (e) =>
    e.key === "Enter" || e.key === " " ? handleClick() : null;

  return (
    <article
      className='product-card'
      role='button'
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <ProductDisplay product={product} bemBlock='product-card' />
      <StopPropagation>
        <QuantityAdjust productId={id} collapseAtZero />
      </StopPropagation>
    </article>
  );
}
