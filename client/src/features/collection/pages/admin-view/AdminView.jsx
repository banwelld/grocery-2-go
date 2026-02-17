import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import toast from 'react-hot-toast';

import { ProductContext } from '../../context/ProductContext';
import { useModal } from '../../../../hooks/useModal';

import PageContent from './PageContent';
import Sidebar from './Sidebar';
import ProductSelector from './ProductSelector';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Button from '../../../../components/ui/Button';

import Feedback from '../../../../config/feedback';
import {
  DEFAULT_SELECT_VALUE as DEFAULT,
  PageName,
} from '../../../../config/enums';

const { Toasts, Modals } = Feedback;

export default function AdminView() {
  const { state } = useLocation();
  const [selectedProductId, setSelectedProductId] = useState(
    state?.productId ?? DEFAULT,
  );
  const { openModal } = useModal();

  const {
    products,
    addProduct: add,
    updateProduct: update,
    deleteProduct: del,
    findProduct,
  } = useContext(ProductContext);

  const product = findProduct(Number(selectedProductId)) ?? {};

  // DEFAULT represents the value of the 'Add a new product' select
  // option since valid database IDs cannot be negative
  const isValidSelection = selectedProductId === DEFAULT || !!product?.name;
  const isAddOperation = isValidSelection && selectedProductId === DEFAULT;

  const addProduct = (data) =>
    toast
      .promise(add(data), {
        loading: Toasts.PRODUCT.CREATE.BUSY,
        success: Toasts.PRODUCT.CREATE.SUCCESS,
        error: (err) => err.serverError || Toasts.PRODUCT.CREATE.FAILURE,
      })
      .then(() => setSelectedProductId(DEFAULT));

  const updateProduct = (data) =>
    toast.promise(update(data, selectedProductId), {
      loading: Toasts.PRODUCT.UPDATE.BUSY,
      success: Toasts.PRODUCT.UPDATE.SUCCESS,
      error: (err) => err.serverError || Toasts.PRODUCT.UPDATE.FAILURE,
    });

  const deleteProduct = () =>
    toast.promise(del(selectedProductId), {
      loading: Toasts.PRODUCT.DELETE.BUSY,
      success: Toasts.PRODUCT.DELETE.SUCCESS,
      error: (err) => err.serverError || Toasts.PRODUCT.DELETE.FAILURE,
    });

  const onDelete = () => {
    openModal({
      uiText: Modals.CONFIRM_DELETE_PRODUCT,
      confirmLabel: 'Delete Product',
      closeLabel: 'Cancel',
      handleConfirm: () => {
        deleteProduct();
        setSelectedProductId(DEFAULT);
      },
    });
  };

  const sidebarControls = (
    <>
      <ProductSelector
        products={products}
        selectedId={selectedProductId}
        onSelect={setSelectedProductId}
      />
      {!isAddOperation && (
        <Button
          onClick={onDelete}
          label='Delete Product'
          bemMod='page-utility'
          bemMod2='admin'
          showMod2={true}
        />
      )}
    </>
  );

  const sidebarProps = {
    sidebarControls,
    pageName: PageName.ADMIN_VIEW,
  };

  const pageContentProps = {
    product,
    isValidSelection,
    onSubmit: isAddOperation ? addProduct : updateProduct,
    bemBlock: PageName.ADMIN_VIEW,
  };

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarProps} />}
      pageContent={<PageContent {...pageContentProps} />}
      pageName={PageName.MANAGE_VIEW}
    />
  );
}
