// client/src/pages/product/ProductDetails.jsx

import SectionFrame from "../section-frames/SectionFrame";
import ProductOrigin from "./ProductOrigin";
import { isInteger, divideIntBy100, toClassName } from "../../helpers/helpers";
import { displayConfig } from "./displayConfig";

export default function ProductDetails({ product, displayVariant = "card" }) {
  const { description, name, origin, pkgQty, price, saleUnit } = product;

  const { bemBlock, bemElem, isTopLevel, showDescription, showPackageSize } =
    displayConfig[displayVariant];

  const decimalPrice = divideIntBy100(price);
  const packageType = isInteger({ value: saleUnit, positiveOnly: true }) ? `${saleUnit}-pack` : saleUnit;

  const sectionProps = {
    heading: name,
    isTopLevel,
    bemBlock,
    bemMod: bemElem,
  };
  const bemProps = { bemBlock, bemElem };

  return (
    <SectionFrame {...sectionProps}>
      <ProductOrigin origin={origin} {...{ bemProps }} />
      {showDescription && (
        <p className={toClassName({ bemMod: "description", ...bemProps })}>
          {description}
        </p>
      )}
      <p className={toClassName({ bemMod: "price", ...bemProps })}>
        <span className={toClassName({ bemMod: "amount", ...bemProps })}>
          $ {decimalPrice}{" "}
        </span>
        <span className={toClassName({ bemMod: "package-type", ...bemProps })}>
          / {packageType}{" "}
        </span>
        {showPackageSize && !!pkgQty && (
          <span className={toClassName({ bemMod: "package-size", ...bemProps })}>
            ({pkgQty})
          </span>
        )}
      </p>
    </SectionFrame>
  );
}
