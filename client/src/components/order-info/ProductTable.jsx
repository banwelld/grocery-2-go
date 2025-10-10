// ProductTable.jsx

import ProductRow from "./ProductRow";
import AcctField from "../AcctField";
import { sortBy, autoPlural } from "../../helpers/helpers";
import "../../css/list-table.css";

export default function ProductTable({
  orderProducts,
  quantity = null,
  total = null,
  isBasket = false,
}) {
  if (!orderProducts) return <p>Loading...</p>;

  const sortedOrderProducts = sortBy(orderProducts, (op) => op.product.name);

  return (
    <section className='product-list'>
      <div className='list-table product'>
        <div className={"row labels"}>
          <div className='product'>Product Info</div>
          <div className='price'>Price</div>
          <div className='quantity'>Quantity</div>
          <div className='row-total'>Row Total</div>
        </div>
        {sortedOrderProducts.map((op) => (
          <ProductRow key={op.id} data={op} isBasket={isBasket} />
        ))}
        {isBasket && (
          <div className='row totals'>
            <div className='product'>Order Total:</div>
            <div className='price money'></div>
            <div className='quantity'>{autoPlural("product", quantity)}</div>
            <AcctField className='row-total money' fieldAmt={total} />
          </div>
        )}
      </div>
    </section>
  );
}
