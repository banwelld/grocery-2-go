// /client/src/components/tables/DetailsTableRow.jsx

export default function DetailsTableRow({ label, value }) {
  return (
    <tr>
      <th scope='row'>{label} :</th>
      <td>{value}</td>
    </tr>
  );
}
