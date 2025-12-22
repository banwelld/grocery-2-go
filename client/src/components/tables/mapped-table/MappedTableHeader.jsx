// /client/src/components/tables/mapped-table//MappedTableHeader.jsx

import TableHeadFrame from "../TableHeadFrame";
import TableRowFrame from "../TableRowFrame";
import { toClassName } from "../../../helpers/helpers";

export default function MappedTableHeader({ columnConfig, bemBlock, bemMod }) {
  const hasHeaderSpan = (col) => !!col.headerColSpan;
  const headerColumnConfig = columnConfig.filter(hasHeaderSpan);

  return (
    <TableHeadFrame {...{ bemBlock, bemMod }}>
      <TableRowFrame {...{ bemBlock, bemMod: "head" }}>
        {headerColumnConfig.map(({ headerColSpan, dataKey, headerLabel }) => (
          <th
            key={dataKey}
            className={toClassName({
              bemBlock,
              bemElem: "cell",
              bemMod,
              conditionalMod: "head",
              showConditional: true,
            })}
            colSpan={headerColSpan}
          >
            {headerLabel}
          </th>
        ))}
      </TableRowFrame>
    </TableHeadFrame>
  );
}
