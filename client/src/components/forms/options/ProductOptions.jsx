import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../config/enums';

const addProductLabel = 'Add a new product';

export default function ProductOptions({ products }) {
  return (
    <>
      <option value={DEFAULT}>{addProductLabel}</option>
      {products.map(({ id, name, category }) => (
        <option key={id} value={id}>
          {`${name} (${category})`}
        </option>
      ))}
    </>
  );
}
