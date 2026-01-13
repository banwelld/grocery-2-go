// /client/src/pages/home/ProductCard.jsx

import { useNavigate } from "react-router-dom";
import ProductDisplay from "../product-display/ProductDisplay";
import { QuantityAdjust } from "../quantity-adjust/QuantityAdjust";
import StopPropagation from "../utility/StopPropagation";

import { toClassName } from "../../helpers/helpers";

import "./product-card.css";

const BLOCK = "product-card";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const { id } = product;

  if (!id) return <div className={toClassName({ bemBlock: BLOCK })}>Loading...</div>;

  const onClick = () => navigate(`products/${id}`);
  const onKeyDown = (e) =>
    e.key === "Enter" || e.key === " " ? onClick() : null;

  const articleProps = {
    className: toClassName({ bemBlock: BLOCK }),
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyDown,
  };

  const quantityAdjustProps = {
    productId: id,
    parentBemBlock: BLOCK,
    collapseAtZero: true,
  };

  return (
    <article {...articleProps}>
      <ProductDisplay product={product} bemBlock={BLOCK} />
      <StopPropagation>
        <QuantityAdjust {...quantityAdjustProps} />
      </StopPropagation>
    </article>
  );
}
