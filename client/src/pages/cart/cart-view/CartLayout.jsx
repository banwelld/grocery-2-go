// /client/src/pages/cart/CartLayout.jsx

import ContentSection from "../../../components/section-frames/ContentSection";
import CartDetailsTable from "./CartDetailsTable";
import CartProductsTable from "./CartProductsTable";
import EmptyCart from "./EmptyCart";
import { headings } from "../../../strings";

export default function CartLayout({
  products,
  orderItemCount,
  orderTotal,
  cartLoaded,
}) {
  if (!cartLoaded) return <p>Loading...</p>
  if (cartLoaded && !products?.length) return <EmptyCart />

  return (
    <>
      <ContentSection heading={headings.CART_TOTALS} bemMod="totals">
        <CartDetailsTable orderItemCount={orderItemCount} orderTotal={orderTotal} />
      </ContentSection>
      <ContentSection heading={headings.CART_PRODUCTS} bemMod="products">
        <CartProductsTable data={products} />
      </ContentSection>
    </>
  );
}
