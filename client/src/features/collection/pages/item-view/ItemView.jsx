import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import { Headings, UiText } from '../../../../config/constants';
import { PageName, UserRole as Role } from '../../../../config/enums';
import { ROUTE_PATHS } from '../../../../config/routePaths';
import ErrorPage from '../../../../pages/ErrorPage';
import { QuantityAdjust } from '../../../cart/components/quantity-adjust/QuantityAdjust';
import useUser from '../../../user/hooks/useUser';
import { displayConfig } from '../../components/product-display/displayConfig';
import ProductDisplay from '../../components/product-display/ProductDisplay';
import { ProductContext } from '../../context/ProductContext';
import Sidebar from './Sidebar';

export default function ItemView() {
  const { id } = useParams();
  const { findProduct } = useContext(ProductContext);
  const { user } = useUser();
  const navigate = useNavigate();

  const productId = Number(id);
  const product = findProduct(productId) ?? {};

  const isAdmin = user?.role === Role.ADMIN;

  const navigateToAdmin = () => {
    navigate(ROUTE_PATHS.PRODUCT_ADMIN, {
      replace: true,
      state: { productId: productId },
    });
  };

  if (!product.id)
    return <ErrorPage heading={Headings.WHOOPS} uiText={UiText.INVALID_PRODUCT_ID(id)} />;

  const sidebarControls = (
    <>
      <QuantityAdjust productId={productId} parentBemBlock={PageName.ITEM_VIEW} />
      {isAdmin && (
        <Button
          onClick={navigateToAdmin}
          label='Product Admin'
          bemMod='page-utility'
          bemMod2='admin'
          showMod2={true}
        />
      )}
    </>
  );

  const sidebarProps = {
    sidebarControls,
    productName: product.name,
    pageName: PageName.ITEM_VIEW,
  };

  const productDisplayProps = {
    product,
    displayConfig,
    displayVariant: 'page',
  };

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarProps} />}
      pageContent={<ProductDisplay {...productDisplayProps} />}
      pageName={PageName.ITEM_VIEW}
    />
  );
}
