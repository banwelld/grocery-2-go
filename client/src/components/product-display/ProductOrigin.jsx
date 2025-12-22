// client/src/components/ProductOrigin.jsx

import { toClassName } from "../../helpers/helpers";
import "./product-origin.css";

export default function ProductOrigin({ country, bemBlock, bemElem }) {
  const isCanada = country.toLowerCase() === "canada";

  return (
    <p className={toClassName({ bemBlock, bemElem, bemMod: "origin" })}>
      Made in{" "}
      <span
        className={toClassName({
          bemBlock,
          bemElem: "country",
          conditionalMod: "canada",
          showConditional: isCanada,
        })}
      >
        {country}
      </span>
      {isCanada && (
        <span className={toClassName({ bemBlock, bemElem: "flag" })}> 🇨🇦</span>
      )}
    </p>
  );
}
