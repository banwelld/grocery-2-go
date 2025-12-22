// /client/src/components/tables/DetailsTable.jsx

import TableBodyFrame from "../TableBodyFrame";
import DetailsTableRow from "./DetailsTableRow";
import "../../../css/details-table.css";

export default function DetailsTable({ data, dataType }) {
  return (
    <table className={`table--details table--${dataType}-details`}>
      <TableBodyFrame>
        {Object.entries(data).map(([key, val]) => (
          <DetailsTableRow key={key} label={key} value={val} />
        ))}
      </TableBodyFrame>
    </table>
  );
}
