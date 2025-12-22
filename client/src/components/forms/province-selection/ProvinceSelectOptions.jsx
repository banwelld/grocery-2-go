// /client/src/components/forms/ProvinceSelectOptions.jsx

import provinces from "./provinces.json";

export default function ProvinceSelectOptions() {
  return (
    <>
      <option value='' disabled>
        select a province...
      </option>
      {provinces.map(({ code, name }) => (
        <option key={code} value={code}>
          {`${code} - ${name}`}
        </option>
      ))}
    </>
  );
}
