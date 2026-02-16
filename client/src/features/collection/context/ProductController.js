import {
  getData,
  postData,
  patchData,
  deleteData,
  runExclusive,
  logException,
  compareSortValues,
} from '../../../utils/helpers';
import Feedback from '../../../config/feedback';
import { toClient, toServer } from '../utils/productSerializer';
import PATHS from '../../../config/paths';

const { Errors } = Feedback;

export function createProductController({ setProducts, concurrencyControls }) {
  const fetchProducts = () =>
    runExclusive({
      doFetch: () =>
        getData(PATHS.BACK.PRODUCTS)
          .then((data) => {
            const sortedProducts = data
              .map(toClient)
              .sort(compareSortValues({ key: 'name' }));
            setProducts(sortedProducts);
            return sortedProducts;
          })
          .catch((err) => {
            logException(Errors.FAILURE.RECEIVE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const addProduct = (data) => {
    const payload = { ...toServer(data) };

    // Optimistic update
    setProducts((prev) => {
      const nextProducts = [...prev, { ...data, id: -1 }];
      return nextProducts.sort(compareSortValues({ key: 'name' }));
    });

    return runExclusive({
      doFetch: () =>
        postData(PATHS.BACK.PRODUCTS, payload)
          .then((serverData) => {
            const newProduct = toClient(serverData);
            setProducts((prev) => {
              const updatedProducts = [
                ...prev.filter((p) => p.id !== -1),
                newProduct,
              ];
              return updatedProducts.sort(compareSortValues({ key: 'name' }));
            });
            return newProduct;
          })
          .catch((err) => {
            logException(Errors.FAILURE.CREATE, err);
            // Rollback optimistic update
            setProducts((prev) => prev.filter((p) => p.id !== -1));
            throw err;
          }),
      ...concurrencyControls,
    });
  };

  const updateProduct = (data, id) => {
    let originalProduct;

    // Optimistic update
    setProducts((prev) => {
      originalProduct = prev.find((p) => p.id === id);
      const updatedProducts = prev.map((p) =>
        p.id === id ? { ...p, ...data } : p,
      );
      return [...updatedProducts].sort(compareSortValues({ key: 'name' }));
    });

    const payload = toServer(data);

    return runExclusive({
      doFetch: () =>
        patchData(PATHS.BACK.PRODUCT_ID(id), payload)
          .then((serverData) => {
            const updatedProduct = toClient(serverData);
            setProducts((prev) => {
              const nextProducts = prev.map((p) =>
                p.id === id ? updatedProduct : p,
              );
              return [...nextProducts].sort(compareSortValues({ key: 'name' }));
            });
            return updatedProduct;
          })
          .catch((err) => {
            logException(Errors.FAILURE.UPDATE, err);
            // Rollback optimistic update
            if (originalProduct) {
              setProducts((prev) => {
                const rolledBack = prev.map((p) =>
                  p.id === id ? originalProduct : p,
                );
                return [...rolledBack].sort(compareSortValues({ key: 'name' }));
              });
            }
            throw err;
          }),
      ...concurrencyControls,
    });
  };

  const deleteProduct = (id) => {
    let originalProduct;

    // Optimistic update
    setProducts((prev) => {
      originalProduct = prev.find((p) => p.id === id);
      return prev.filter((p) => p.id !== id);
    });

    return runExclusive({
      doFetch: () =>
        deleteData(PATHS.BACK.PRODUCT_ID(id))
          .then(() => true)
          .catch((err) => {
            logException(Errors.FAILURE.DELETE, err);
            // Rollback optimistic update
            if (originalProduct) {
              setProducts((prev) => {
                const restoredProducts = [...prev, originalProduct];
                return restoredProducts.sort(
                  compareSortValues({ key: 'name' }),
                );
              });
            }
            throw err;
          }),
      ...concurrencyControls,
    });
  };

  return {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
