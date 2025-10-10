// Product.jsx

import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/contexts";
import ProductSidebar from "../product/ProductSidebar";
import SplitPageWrapper from "../../components/SplitPageWrapper";
import HeadingGroup from "../../components/HeadingGroup";
import ProductOrigin from "./ProductOrigin";
import { toDecimal } from "../../helpers/helpers";
import "../../css/product-page.css";

export default function Product() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  if (!products.length) return <p>Loading...</p>;

  const product = products?.find((p) => p.id === Number(id));
  if (!product) return <p>Product not found.</p>;

  const { description, imageUrl, name, origin, pkgQty, price, unit } = product;

  const decimalPrice = toDecimal(price);

  return (
    <SplitPageWrapper>
      <ProductSidebar product={product} />

      <article className='product-info'>
        <div className='img-wrapper-sq'>
          <img className='img-fit-sq' src={imageUrl} alt={name} />
        </div>

        <div className='text'>
          <HeadingGroup>
            {name}
            <ProductOrigin country={origin} />
          </HeadingGroup>
          <p className='desc'>{description}</p>
          <p className='pricing'>
            <span className='price'>${decimalPrice} </span>
            <span className='pkg-desc'>/ {unit} </span>
            {pkgQty && <span className='pkg-qty'>({pkgQty})</span>}
          </p>
        </div>
      </article>
    </SplitPageWrapper>
  );
}
