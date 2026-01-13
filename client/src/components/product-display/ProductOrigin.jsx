// client/src/components/ProductOrigin.jsx

import { toClassName } from "../../helpers/helpers";
import "./product-origin.css";

export default function ProductOrigin({ origin, bemProps }) {
  const { bemBlock } = bemProps;
  const isCanada = origin.toLowerCase() === "canada";

  return (
    <p className={toClassName({ bemMod: "origin", ...bemProps })}>
      Made in{" "}
      <span
        className={toClassName({
          bemBlock,
          bemElem: "origin",
          bemMod2: "canada",
          showMod2: isCanada,
        })}
      >
        {origin}
      </span>
      {isCanada && (
        <span className={toClassName({ bemBlock, bemElem: "flag" })}> 🇨🇦</span>
      )}
    </p>
  );
}
