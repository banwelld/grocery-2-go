// ProductSidebar.jsx

import useBasketQuantity from "../../hooks/useBasketQuantity";
import HeadingGroup from "../../components/HeadingGroup";

export default function ProductSidebar({ product }) {
  const { onAddClick, onRemoveClick, productQuantity, lastOfType, noneOfType } =
    useBasketQuantity(product.id);

  if (!product) return <p>Product not found.</p>;
  if (!product.id) return <p>Loading...</p>;

  const headingText = "In Your Basket";

  const { name } = product;

  const downImgUrl = lastOfType ? "/images/trash-white.svg" : "/images/dn-white.svg";
  const downAltText = `remove ${lastOfType ? "last " : ""}one from shopping basket`;
  const downBtnLabel = noneOfType ? null : <img src={downImgUrl} alt={downAltText} />;

  return (
    <div className='product-page'>
      <HeadingGroup level={2}>
        {headingText}
        {name}
      </HeadingGroup>
      <div className='basket-management'>
        <button onClick={onRemoveClick} disabled={noneOfType}>
          {downBtnLabel}
        </button>
        <div className='product-tally'>
          <p>{productQuantity}</p>
        </div>
        <button onClick={onAddClick}>
          <img src='/images/up-white.svg' alt='add one to shopping basket' />
        </button>
      </div>
    </div>
  );
}
