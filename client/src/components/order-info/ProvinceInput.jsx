// ProvinceInput.jsx

import FormikInput from "../FormikInput";
import provinceList from "../../provinces.json";

export default function ProvinceInput() {
  return (
    <FormikInput as='select' name='province_cd'>
      <option value='' disabled>
        select a province...
      </option>
      {provinceList.map(({ code, name }) => (
        <option key={code} value={code}>
          {`${code} - ${name}`}
        </option>
      ))}
    </FormikInput>
  );
}
