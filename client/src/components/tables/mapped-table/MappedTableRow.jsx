// /client/src/components/tables/mapped-table/MappedTableRow.jsx

import TableRowFrame from "../TableRowFrame";
import MappedTableCell from "./MappedTableCell";
import { isInteger } from "../../../helpers/helpers";

export default function MappedTableRow({ tableConfig, data, bemBlock, ...cellActions }) {
  const {
    columnConfig,
    normalizeFn,
    getRowIdFn = () => null,
    getPathFn = null,
    loadingMessage = "Loading...",
    emptyMessage = "Data unavailable.",
  } = tableConfig;

  const rowId = getRowIdFn?.(data) ?? null;
  const hasId = rowId !== null && rowId !== undefined && isInteger(rowId);
  const hasGetPathFn = typeof getPathFn === "function";
  const navMismatch = hasGetPathFn !== hasId;

  if (navMismatch) {
    console.error(
      `MappedTableRow: getPathFn ${hasGetPathFn ? "provided" : "missing"} but row id ${
        hasId ? "present" : "missing/invalid"
      }.`
    );
  }

  if (!data)
    return (
      <tr>
        <td colSpan={columnConfig?.length ?? 1}>{loadingMessage}</td>
      </tr>
    );

  if (typeof data === "object" && Object.keys(data).length === 0)
    return (
      <tr>
        <td colSpan={columnConfig?.length ?? 1}>{emptyMessage}</td>
      </tr>
    );

  const normalizedData = normalizeFn(data);

  const rowProps = {
    bemBlock,
    bemMod: "body",
    ...(!navMismatch && { getPathFn, rowId }),
  };

  return (
    <TableRowFrame {...rowProps}>
      {columnConfig.map((c) => (
        <MappedTableCell
          key={c.dataKey}
          cellData={normalizedData[c.dataKey] ?? null}
          actions={cellActions}
          bemBlock={bemBlock}
          bemMod={c.dataKey}
          CellComponent={c.cellComponent}
        />
      ))}
    </TableRowFrame>
  );
}
