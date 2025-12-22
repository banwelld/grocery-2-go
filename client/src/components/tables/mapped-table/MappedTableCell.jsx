// /client/src/components/tables/mapped-table/MappedTableCell.jsx

import MissingComponent from "./MissingComponent.jsx";
import { toClassName } from "../../../helpers/helpers.js";

export default function MappedTableCell({
  cellData,
  CellComponent,
  actions,
  bemBlock,
  bemMod,
}) {
  const hasWrapper = !!CellComponent;
  const hasActions = !!actions;

  if (hasActions && !hasWrapper)
    return <MissingComponent {...{ cellData, bemBlock, bemMod }} />;

  const cellProps = { cellData, ...(hasWrapper ? actions : {}) };
  return (
    <td className={toClassName({ bemBlock, bemElem: "cell", bemMod })}>
      {hasWrapper ? <CellComponent {...cellProps} /> : cellData}
    </td>
  );
}
