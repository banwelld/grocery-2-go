// ProductRow.jsx

import useBasketQuantity from "../../hooks/useBasketQuantity";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/contexts";
import AcctField from "../AcctField";

export default function ProductRow({ data, isBasket = true }) {
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const productId = data?.productId ?? 0;
  const targetProduct = products?.find((p) => p.id === productId);

  const { onAddClick, onRemoveClick, productQuantity } = useBasketQuantity(productId);

  if (!productId || !targetProduct) return <p>Loading details...</p>;

  const { name, price: tpPrice, imageUrl } = targetProduct;

  const quantity = isBasket ? productQuantity : data.quantity;
  const price = isBasket ? tpPrice : data.price;
  const rowTotal = price * productQuantity;

  const toProduct = () => navigate(`../products/${productId}`);

  return (
    <div className={"row data"} onClick={toProduct}>
      <div className='product'>
        <span className='img-wrapper-sq'>
          <img src={imageUrl} alt={name} className='img-fit-sq' />
        </span>
        <span className='name'>{name}</span>
      </div>
      <AcctField className='price money' fieldAmt={price} />
      <div className='product-tally'>
        {isBasket && (
          <button onClick={onRemoveClick}>
            <img src='images/dn-red.svg' alt='remove one from shopping basket' />
          </button>
        )}
        <div className='quantity'>{quantity}</div>
        {isBasket && (
          <button onClick={onAddClick}>
            <img src='images/up-red.svg' alt='add one to shopping basket' />
          </button>
        )}
      </div>
      <AcctField className='row-total money' fieldAmt={rowTotal} />
      {isBasket && (
        <div className='basket-management-dump'>
          <button onClick={(e) => onRemoveClick(e, { removeAll: true })}>
            <img src='images/trash-red.svg' alt='remove all from shopping basket' />
          </button>
        </div>
      )}
    </div>
  );
}
