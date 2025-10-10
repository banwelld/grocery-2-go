// ProdCard.jsx

import useBasketQuantity from "../../hooks/useBasketQuantity";
import { useNavigate } from "react-router-dom";
import HeadingGroup from "../../components/HeadingGroup";
import ProductOrigin from "../product/ProductOrigin";
import { toDecimal } from "../../helpers/helpers";

export default function ProdCard({ product }) {
  const { id, imageUrl, name, origin, price, unit } = product;
  const { onAddClick, onRemoveClick, productQuantity, noneOfType, lastOfType } =
    useBasketQuantity(id);
  const navigate = useNavigate();

  if (!id) return <p>loading...</p>;

  const toProduct = () => navigate(`products/${id}`);

  const decimalPrice = `$ ${toDecimal(price)}`;

  return (
    <article className='product-card grow-with-ease' onClick={toProduct}>
      <div className='img-wrapper-sq'>
        <img className='img-fit-sq' src={imageUrl} alt={name} />
      </div>

      <div className='info'>
        <HeadingGroup level={2}>
          {name}
          <ProductOrigin country={origin} />
        </HeadingGroup>
        <div className='price'>
          <span>{decimalPrice}</span>
          <span>/ {unit}</span>
        </div>
      </div>

      <div className='basket-management'>
        {!noneOfType && (
          <>
            <button onClick={onRemoveClick}>
              <img
                src={`/images/${lastOfType ? "trash" : "dn"}-red.svg`}
                alt={`remove ${lastOfType && "last "}one from shopping basket`}
              />
            </button>

            <span className='product-tally'>{productQuantity}</span>
          </>
        )}

        <button onClick={onAddClick}>
          {!noneOfType ? (
            <img src='/images/up-red.svg' alt='add one more to shopping basket' />
          ) : (
            <>
              <p>Add to Basket </p>
              <img src='/images/basket-red.svg' alt='add one to shopping basket' />
            </>
          )}
        </button>
      </div>
    </article>
  );
}
