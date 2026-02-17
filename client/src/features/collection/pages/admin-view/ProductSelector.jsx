import { useState, useMemo, useEffect, useRef } from 'react';
import ProductOptions from '../../../../components/forms/options/ProductOptions';
import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../../config/enums';

export default function ProductSelector({ products, selectedId, onSelect }) {
  const [currentFilterCriteria, setCurrentFilterCriteria] = useState('');
  const [currentId, setCurrentId] = useState(selectedId || DEFAULT);

  const selectRef = useRef(null);
  const hasInitialScrolledRef = useRef(false);

  // reset the selector to 'add new product' when selected id changes
  useEffect(() => {
    setCurrentId(selectedId || DEFAULT);
    setCurrentFilterCriteria('');

    // scroll only on the first render where we have a valid selectedId
    if (
      !hasInitialScrolledRef.current
      && selectedId
      && selectedId !== DEFAULT
      && products.length > 0
    ) {
      const timer = setTimeout(() => {
        if (selectRef.current) {
          const selectedOption = selectRef.current.querySelector(
            `option[value="${selectedId}"]`,
          );
          if (selectedOption) {
            selectedOption.scrollIntoView({ block: 'start' });
            hasInitialScrolledRef.current = true;
          }
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedId, products.length]);

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
      <select
        ref={selectRef}
        value={currentId}
        size={10}
        onChange={onSelectChange}
      >
        <ProductOptions products={includedProducts} />
      </select>
    </>
  );
}
