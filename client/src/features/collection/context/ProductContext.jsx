import toast from 'react-hot-toast';
import {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  getData,
  logException,
  compareSortValues,
  runExclusive,
  postData,
  patchData,
} from '../../../utils/helpers';
import Feedback from '../../../config/feedback';
import { toClient, toServer } from '../utils/productSerializer';

const { Errors, Toasts } = Feedback;

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  const concurrencyControls = useMemo(
    () => ({
      lockRef: isBusyRef,
      setPending: setIsPending,
    }),
    [],
  );

  // fetch products

  useEffect(() => {
    runExclusive({
      doFetch: () =>
        getData('/products', {}, false)
          .then((data) => {
            const sortedProducts = data
              .map(toClient)
              .sort(compareSortValues({ key: 'name' }));
            setProducts(sortedProducts);
          })
          .catch((err) => {
            logException(Errors.FAILURE.RECEIVE, err);
            toast.error(Toasts.PRODUCTS.LOAD.FAILURE);
          }),
      ...concurrencyControls,
    });
  }, [concurrencyControls]);

  // add new product

  const addProduct = useCallback(
    (data) => {
      const payload = { ...toServer(data) };
      setProducts((prev) => [...prev, { ...data, id: 0 }]);

      runExclusive({
        doFetch: () =>
          postData('/products', payload)
            .then((serverData) => {
              const newProduct = toClient(serverData);
              setProducts((prev) => [
                ...prev.filter((product) => product.id !== 0),
                newProduct,
              ]);
            })
            .catch((err) => {
              logException(Errors.FAILURE.CREATE, err);
              setProducts((prev) => prev.filter((product) => product.id !== 0));
              throw err;
            }),
        ...concurrencyControls,
      });
    },
    [concurrencyControls],
  );

  // update product

  const updateProduct = useCallback(
    (data, id) => {
      let originalProduct;

      setProducts((prev) => {
        originalProduct = prev.find((p) => p.id === id);
        return prev.map((p) => (p.id === id ? { ...p, ...data } : p));
      });

      const payload = toServer(data);

      return runExclusive({
        doFetch: () =>
          patchData(`/products/${id}`, payload)
            .then((serverData) => {
              const updatedProduct = toClient(serverData);
              setProducts((prev) =>
                prev.map((p) => (p.id === id ? updatedProduct : p)),
              );
              return updatedProduct;
            })
            .catch((err) => {
              logException(Errors.FAILURE.UPDATE, err);
              if (originalProduct) {
                setProducts((prev) =>
                  prev.map((p) => (p.id === id ? originalProduct : p)),
                );
              }
              throw err;
            }),
        ...concurrencyControls,
      });
    },
    [concurrencyControls],
  );

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
      isPending,
      findProduct: (id) => products.find((p) => p.id === id),
      categories,
    }),
    [products, isPending, categories, addProduct, updateProduct],
  );

  return (
    <ProductContext.Provider value={ctx}>{children}</ProductContext.Provider>
  );
}
