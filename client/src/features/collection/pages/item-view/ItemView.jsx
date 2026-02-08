import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import useUser from '../../../user/hooks/useUser';
import useViewMode, { VIEW_MODES as MODE } from '../../../../hooks/useViewMode';
import { ProductContext } from '../../context/ProductContext';

import { QuantityAdjust } from '../../../cart/components/quantity-adjust/QuantityAdjust';
import PageContent from './PageContent';
import Sidebar from './Sidebar';
import ProductDisplay from '../../components/product-display/ProductDisplay';
import ErrorPage from '../../../../pages/ErrorPage';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Button from '../../../../components/ui/Button';

import { displayConfig } from '../../components/product-display/displayConfig';
import Feedback from '../../../../config/feedback';
import { UserRoles as Role } from '../../../../config/enums';
import { Headings, UiText } from '../../../../config/constants';
import { PageName } from '../../../../config/enums';
import './ItemView.css';

const { Toasts } = Feedback;

const ButtonLabel = Object.freeze({
  [MODE.READ]: 'Edit Mode',
  [MODE.EDIT]: 'View Mode',
});

export default function ItemView() {
  const { currentViewMode, toggleViewMode } = useViewMode();
  const { user } = useUser();
  const { id } = useParams();
  const { products, updateProduct: update } = useContext(ProductContext);

  const isManager = user?.role === Role.MANAGER;

  const productId = Number(id);
  const product = products?.find((p) => p.id === productId);

  if (!product)
    return (
      <ErrorPage
        heading={Headings.WHOOPS}
        uiText={UiText.INVALID_PRODUCT_ID(id)}
      />
    );

  const updateProduct = (data) =>
    toast.promise(update(data, productId), {
      loading: Toasts.PRODUCT.UPDATE.BUSY,
      success: Toasts.PRODUCT.UPDATE.SUCCESS,
      error: Toasts.PRODUCT.UPDATE.FAILURE,
    });

  const sidebarControls = {
    [Role.CUSTOMER]: (
      <QuantityAdjust productId={productId} parentBemBlock={PageName.PRODUCT} />
    ),
    [Role.MANAGER]: (
      <Button
        label={ButtonLabel[currentViewMode]}
        onClick={toggleViewMode}
        bemMod='page-utility'
      />
    ),
  };

  const pageContent = {
    [MODE.READ]: (
      <ProductDisplay
        product={product}
        displayConfig={displayConfig}
        displayVariant='page'
      />
    ),
    [MODE.EDIT]: (
      <PageContent
        product={product}
        updateProduct={updateProduct}
        displayConfig={displayConfig}
        bemBlock={PageName.PRODUCT}
      />
    ),
  };

  const sidebarProps = {
    sidebarControls: sidebarControls[!isManager ? Role.MANAGER : Role.CUSTOMER],
    productName: !isManager ? null : product.name,
    pageName: !isManager ? 'Options' : PageName.PRODUCT,
  };

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarProps} />}
      pageContent={pageContent[currentViewMode]}
      pageName={PageName.PRODUCT}
    />
  );
}
