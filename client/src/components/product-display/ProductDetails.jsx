// client/src/pages/product/ProductDetails.jsx

import SectionFrame from "../SectionFrame";
import ProductOrigin from "./ProductOrigin";
import { isInteger, intToDecimalPrice, toClassName } from "../../helpers/helpers";
import { displayConfig } from "./displayConfig";

export default function ProductDetails({ product, displayVariant = "card" }) {
  const { description, name, origin, pkgQty, price, saleUnit } = product;

  const { bemBlock, bemElem, headingLevel, showDescription, showPackageSize } =
    displayConfig[displayVariant];

  const decimalPrice = intToDecimalPrice(price);
  const packageType = isInteger(saleUnit) ? `${saleUnit}-pack` : saleUnit;

  const sectionBem = { bemBlock, bemMod: bemElem };
  const originBem = { bemBlock, bemElem };

  return (
    <SectionFrame heading={name} headingLevel={headingLevel} {...sectionBem}>
      <ProductOrigin country={origin} {...originBem} />
      {showDescription && (
        <p className={toClassName({ bemBlock, bemElem, bemMod: "description" })}>
          {description}
        </p>
      )}
      <p className={toClassName({ bemBlock, bemElem, bemMod: "price" })}>
        <span className={toClassName({ bemBlock, bemElem, bemMod: "amount" })}>
          {decimalPrice}{" "}
        </span>
        <span className={toClassName({ bemBlock, bemElem, bemMod: "package-type" })}>
          / {packageType}{" "}
        </span>
        {showPackageSize && !!pkgQty && (
          <span className={toClassName({ bemBlock, bemElem, bemMod: "package-size" })}>
            ({pkgQty})
          </span>
        )}
      </p>
    </SectionFrame>
  );
}
