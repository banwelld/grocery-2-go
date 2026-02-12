import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProductContext } from '../../context/ProductContext';
import useUser from '../../../user/hooks/useUser';

import { QuantityAdjust } from '../../../cart/components/quantity-adjust/QuantityAdjust';
import Button from '../../../../components/ui/Button';
import Sidebar from './Sidebar';
import ProductDisplay from '../../components/product-display/ProductDisplay';
import ErrorPage from '../../../../pages/ErrorPage';
import PageFrame from '../../../../components/ui/frames/PageFrame';

import { UserRole as Role } from '../../../../config/enums';
import { displayConfig } from '../../components/product-display/displayConfig';
import { Headings, UiText } from '../../../../config/constants';
import { PageName } from '../../../../config/enums';

export default function ItemView() {
  const { id } = useParams();
  const { findProduct } = useContext(ProductContext);
  const { user } = useUser();
  const navigate = useNavigate();

  const productId = Number(id);
  const product = findProduct(productId) ?? {};

  const isAdmin = user?.role === Role.ADMIN;

  const navigateToAdmin = () => {
    navigate('/products/admin', {
      replace: true,
      state: { productId: productId },
    });
  };

  if (!product.id)
    return (
      <ErrorPage
        heading={Headings.WHOOPS}
        uiText={UiText.INVALID_PRODUCT_ID(id)}
      />
    );

  const sidebarProps = {
    sidebarControls: (
      <>
        <QuantityAdjust
          productId={productId}
          parentBemBlock={PageName.ITEM_VIEW}
        />
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
    ),
    productName: product.name,
    pageName: PageName.ITEM_VIEW,
  };

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarProps} />}
      pageContent={
        <ProductDisplay
          product={product}
          displayConfig={displayConfig}
          displayVariant='page'
        />
      }
      pageName={PageName.ITEM_VIEW}
    />
  );
}
