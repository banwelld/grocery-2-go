import toast from 'react-hot-toast';
import { createContext, useState, useEffect, useRef, useMemo } from 'react';
import { compareSortValues } from '../../../utils/helpers';
import Feedback from '../../../config/feedback';
import { createProductController } from './ProductController';

const { Toasts } = Feedback;

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  const { fetchProducts, addProduct, updateProduct, deleteProduct } =
    useMemo(() => {
      const concurrencyControls = {
        lockRef: isBusyRef,
        setPending: setIsPending,
      };

      return createProductController({
        setProducts,
        concurrencyControls,
      });
    }, []);

  // fetch products on mount
  useEffect(() => {
    fetchProducts().catch(() => {
      toast.error(Toasts.PRODUCTS.LOAD.FAILURE);
    });
  }, [fetchProducts]);

  const categories = useMemo(() => {
    if (!products) return [];
    const allCategories = Array.from(new Set(products.map((p) => p.category)));
    return [...allCategories.sort(compareSortValues())];
  }, [products]);

  const ctx = useMemo(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      isPending,
      findProduct: (id) => products.find((p) => p.id === id),
      categories,
    }),
    [products, isPending, categories, addProduct, updateProduct, deleteProduct],
  );

  return (
    <ProductContext.Provider value={ctx}>{children}</ProductContext.Provider>
  );
}
