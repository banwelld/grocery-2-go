import CartProductsTable from './cart-view/CartProductsTable';
import CartTotals from './cart-view/CartTotals';
import EmptyCart from './cart-view/EmptyCart';
import CheckoutController from './checkout-view/CheckoutController';
import ContentSection from '../../../../components/ui/frames/ContentSection';

import { CartViewMode as Mode } from '../../../../config/enums';
import { Headings, UiText } from '../../../../config/constants';

export default function PageContent({
  products,
  currentViewMode,
  cartEmpty,
  cartTotalsProps,
  checkoutProps,
}) {
  const { pageName } = checkoutProps;

  const contentMap = {
    [Mode.CART]: {
      heading: Headings.CART,
      uiText: !cartEmpty && UiText.CART,
      bemMod: pageName,
    },
    [Mode.CHECKOUT]: {
      heading: Headings.CHECKOUT,
      uiText: !cartEmpty && UiText.CHECKOUT,
      bemMod: pageName,
    },
  };

  const detailsSectionProps = {
    heading: Headings.CART_TOTALS,
    bemMod: pageName,
    bemMod2: 'totals',
    showMod2: true,
  };

  const tableSectionProps = {
    heading: Headings.CART_PRODUCTS,
    bemMod: pageName,
    bemMod2: 'products',
    showMod2: true,
  };

  return (
    <ContentSection isRoot hasPageHeading {...contentMap[currentViewMode]}>
      {cartEmpty ? (
        <EmptyCart />
      ) : (
        <>
          {currentViewMode === Mode.CART ? (
            <>
              <ContentSection {...detailsSectionProps}>
                <CartTotals {...cartTotalsProps} />
              </ContentSection>
              <ContentSection {...tableSectionProps}>
                <CartProductsTable data={products} />
              </ContentSection>
            </>
          ) : (
            <CheckoutController {...checkoutProps} />
          )}
        </>
      )}
    </ContentSection>
  );
}
