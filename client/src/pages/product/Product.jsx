// client/src/pages/product/Product.jsx

import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/contexts";
import PageFrame from "../../components/PageFrame";
import Sidebar from "./Sidebar";
import ProductDisplay from "../../components/product-display/ProductDisplay";
import { PageName as pn, LoadStatus as ls } from "../page-enums";
import "./product.css";

export default function Product() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const productId = Number(id);

  const product = products?.find((p) => p.id === productId) ?? ls.LOADING;
  const isLoading = product === ls.LOADING;

  if (isLoading) return <p>Loading...</p>;
  if (!isLoading && !product) return <p>Product not found.</p>;

  const productName = product.name;

  return (
    <PageFrame
      sidebar={<Sidebar productId={productId} productName={productName} />}
      mainContent={<ProductDisplay product={product} displayVariant='page' />}
      pageName={pn.PRODUCT}
    />
  );
}
