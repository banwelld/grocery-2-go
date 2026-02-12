import { useState, useMemo, useEffect } from 'react';
import ProductOptions from '../../../../components/forms/options/ProductOptions';
import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../../config/enums';

export default function Selector({ products, selectedId, onSelect }) {
  const [currentFilterCriteria, setCurrentFilterCriteria] = useState('');
  const [currentId, setCurrentId] = useState(selectedId || DEFAULT);

  // reset the selector to 'add new product' when selected id changes
  useEffect(() => {
    setCurrentId(selectedId || DEFAULT);
    setCurrentFilterCriteria('');
  }, [selectedId]);

  const includedProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(currentFilterCriteria.toLowerCase()),
    );
  }, [products, currentFilterCriteria]);

  const onInputChange = (e) => setCurrentFilterCriteria(e.target.value);

  const onSelectChange = (e) => {
    const id = e.target.value;
    setCurrentId(id);
    if (onSelect) onSelect(id);
  };

  return (
    <>
      <input
        placeholder='filter product selector...'
        value={currentFilterCriteria}
        onChange={onInputChange}
      />
      <select value={currentId} size={10} onChange={onSelectChange}>
        <ProductOptions products={includedProducts} />
      </select>
    </>
  );
}
