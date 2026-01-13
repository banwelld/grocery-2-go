// /client/src/components/tables/product-table/MappedTable.jsx

import BodyFrame from "../frames/BodyFrame";
import HeadFrame from "../frames/HeadFrame";
import RowFrame from "../frames/RowFrame";
import MappedTableRow from "./MappedTableRow";

import { toClassName, isNonEmpty } from "../../../helpers/helpers";

import { MAPPED_TABLE_ERROR_MESSAGES as ERROR } from "./strings";

import "./mapped-table.css";

// MappedTable component colocated with its 3 child components: 
//   - MappedTableColumnGroup
//   - MappedTableHeader
//   - MappedTableBody

export default function MappedTable({ data, tableConfig, parentBemBlock }) {
  const dataErrors = validateTableAssets(tableConfig, data)

  if (dataErrors.length > 0) {
    console.error("Table config and/or data is invalid or missing", dataErrors);
    return <p>*** Table configuration or data is missing or invalid ***</p>;
  }
  const { columns } = tableConfig;

  const bemRoot = { bemBlock: "table", bemMod: parentBemBlock }
  const tableBodyProps = { data, tableConfig, bemRoot }

  return (
    <table className={
      toClassName({ ...bemRoot, bemMod2: "mapped", showMod2: true })
    }>
      <MappedTableColumnGroup columns={columns} bemRoot={bemRoot} />
      <MappedTableHeader columns={columns} bemRoot={bemRoot} />
      <MappedTableBody {...tableBodyProps} />
    </table>
  );
}

function MappedTableColumnGroup({ columns, bemRoot }) {
  const colBemProps = { ...bemRoot, bemElem: "column", showMod2: true }
  return (
    <colgroup>
      {columns.map((c) => (
        <col
          key={c.dataKey}
          className={toClassName({ ...colBemProps, bemMod2: c.dataKey })}
        />
      ))}
    </colgroup>
  );
}

function MappedTableHeader({ columns, bemRoot }) {
  const cellBemProps = { ...bemRoot, bemElem: "cell", bemMod2: "head", showMod2: true }

  return (
    <HeadFrame {...bemRoot}>
      <RowFrame bemRoot={{ ...bemRoot, bemMod: "head" }}>
        {columns.map(({ dataKey, label }) => (
          <th
            key={dataKey}
            className={toClassName({ ...cellBemProps, bemMod2: dataKey })}
          >
            {label}
          </th>
        ))}
      </RowFrame>
    </HeadFrame>
  );
}

function MappedTableBody({ data, tableConfig, bemRoot }) {
  const rowProps = { tableConfig, bemRoot };

  return (
    <BodyFrame bemRoot={bemRoot}>
      {data.map((row) => (
        <MappedTableRow key={row.id} data={row} {...rowProps} />
      ))}
    </BodyFrame>
  );
}

const validateTableAssets = (tableConfig, data) => {
  const { columns = null } = tableConfig;

  const dataErrors = []

  if (!Array.isArray(data)) dataErrors.push(ERROR.INVALID_DATA);
  if (!columns) dataErrors.push(ERROR.MISSING_COLUMNS);
  if (columns.length === 0) dataErrors.push(ERROR.EMPTY_COLUMNS);

  columns.forEach((col, index) => {
    if (!col.dataKey) dataErrors.push(ERROR.MISSING_KEY(index));
    if (!!col.datakey && !isNonEmpty(col.dataKey)) dataErrors.push(ERROR.INVALID_KEY(index));
  });

  return dataErrors;
}