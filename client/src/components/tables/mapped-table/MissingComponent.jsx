// /client/src/components/tables/mapped-table/MissingComponent.jsx

import { isRenderable, toClassName } from "../../../helpers/helpers.js";

export default function MissingComponent({ bemBlock, bemMod, cellData }) {
  const fallbackValue = isRenderable(cellData) ? cellData : "**NA**";

  console.warn("Received cell actions but CellComponent missing or invalid.");

  return (
    <td
      className={toClassName({
        bemBlock,
        bemElem: "cell",
        bemMod,
        conditionalMod: "missing-component",
        showConditional: true,
      })}
    >
      {fallbackValue}
    </td>
  );
}
