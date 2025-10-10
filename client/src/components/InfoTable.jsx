// InfoTable.jsx

import "../css/info-table.css";

export default function InfoTable({ data, normalizer }) {
  if (!data || typeof normalizer !== "function") return <p>Loading...</p>;

  const normalizedData = normalizer(data);

  return (
    <div className='info-table'>
      {Object.entries(normalizedData).map(([key, [label, value]]) => (
        <div key={key} className={`row ${key}`}>
          <div className='label'>{label}: </div>
          <div className='data'>{value}</div>
        </div>
      ))}
    </div>
  );
}
