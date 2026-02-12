import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../config/enums';

const CATEGORIES = [
  { name: 'Bakery' },
  { name: 'Condiments' },
  { name: 'Dairy' },
  { name: 'Meats' },
  { name: 'Produce' },
];

export default function ProvinceOptions() {
  return (
    <>
      <option value={DEFAULT} disabled>
        select a category...
      </option>
      {CATEGORIES.map(({ name }) => (
        <option key={name} value={name.toLowerCase()}>
          {name}
        </option>
      ))}
    </>
  );
}
