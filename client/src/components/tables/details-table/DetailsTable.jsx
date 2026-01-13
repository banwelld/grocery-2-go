// /client/src/components/tables/DetailsTable.jsx

import BodyFrame from "../frames/BodyFrame";
import { toClassName } from "../../../helpers/helpers";
import "./details-table.css";

function DetailsTableRow({ label, value }) {
  return (
    <tr>
      <th scope='row'>{label} :</th>
      <td>{value}</td>
    </tr>
  );
}

export default function DetailsTable({ data, dataType }) {
  const bemProps = {
    bemBlock: "table",
    bemMod: "details",
    bemMod2: `${dataType}-details`,
    showMod2: true,
  };

  return (
    <table className={toClassName(bemProps)}>
      <BodyFrame bemProps={bemProps}>
        {Object.entries(data).map(([key, val]) => (
          <DetailsTableRow key={key} label={key} value={val} />
        ))}
      </BodyFrame>
    </table>
  );
}
