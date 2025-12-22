// client/src/components/tables/mapped-table/MappedTableBody.jsx

import TableBodyFrame from "../TableBodyFrame";

export default function MappedTableBody({ data, tableConfig, bemBlock }) {
  const { rowComponent: RowComponent, bemMod } = tableConfig;

  return (
    <TableBodyFrame {...{ bemBlock, bemMod }}>
      {data.map((data) => (
        <RowComponent key={data.id} {...{ data, tableConfig, bemBlock, bemMod }} />
      ))}
    </TableBodyFrame>
  );
}
