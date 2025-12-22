// /client/src/hooks/QuantityAdjustIcon.jsx

import { svgPath as path } from "../constants";

export default function QuantityAdjustIcon({ action, iconSizePts = 24 }) {
  const svgProps = {
    fill: "currentColor",
    height: `${iconSizePts}pt`,
    width: `${iconSizePts}pt`,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 -960 960 960",
  };

  return (
    <svg {...svgProps}>
      <path d={path[action]} fillRule='evenodd' clipRule='evenodd' />
    </svg>
  );
}
