// /client/src/components/tables/MappedTableColumnGroup.jsx

import { toClassName } from "../../../helpers/helpers";

export default function MappedTableColumnGroup({ columnConfig, bemBlock }) {
  return (
    <colgroup>
      {columnConfig.map((c) => (
        <col
          key={c.dataKey}
          className={toClassName({ bemBlock, bemElem: "column", bemMod: c.dataKey })}
        />
      ))}
    </colgroup>
  );
}
