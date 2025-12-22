// /client/src/components/tables/product-table/MappedTable.jsx

import MappedTableColumnGroup from "./MappedTableColumnGroup";
import MappedTableHeader from "./MappedTableHeader";
import MappedTableBody from "./MappedTableBody";
import { isValidTableConfig } from "../../../helpers/helpers";
import { toClassName } from "../../../helpers/helpers";
import "../../../css/mapped-table.css";

export default function MappedTable({ data, tableConfig }) {
  if (!isValidTableConfig(tableConfig)) {
    console.error("Table column config data is invalid or missing");
    return <p>Data unavailable</p>;
  }

  const { columnConfig, bemBlock, bemMod } = tableConfig;

  const safeData = Array.isArray(data) ? data : [];

  return (
    <table
      className={toClassName({
        bemBlock,
        bemMod,
        conditionalMod: "mapped",
        showConditional: true,
      })}
    >
      <MappedTableColumnGroup {...{ columnConfig, bemBlock }} />
      <MappedTableHeader {...{ columnConfig, bemBlock, bemMod }} />
      <MappedTableBody {...{ data: safeData, tableConfig, bemBlock }} />
    </table>
  );
}
