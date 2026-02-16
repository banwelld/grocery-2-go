import CartTotals from '../CartTotals';
import MappedTable from '../../../../mapped-table/Components/MappedTable';
import ContentSection from '../../../../../components/ui/frames/ContentSection';
import tableConfig from '../cart-summary-view/tableConfig';

import { Headings } from '../../../../../config/constants';

export default function CartSummaryView({ cart, children }) {
  const { products, orderItemCount, orderTotal } = cart;

  const totalsSectionProps = {
    heading: Headings.CART_TOTALS,
    bemMod: 'cart',
    bemMod2: 'totals',
    showMod2: true,
  };

  const totalsProps = { orderItemCount, orderTotal };

  const productsSectionProps = {
    heading: Headings.CART_PRODUCTS,
    bemMod: 'cart',
    bemMod2: 'products',
    showMod2: true,
  };

  const productTableProps = {
    data: products,
    tableConfig,
    parentBemBlock: 'cart',
  };

  return (
    <>
      <ContentSection {...totalsSectionProps}>
        <CartTotals {...totalsProps} />
      </ContentSection>
      <ContentSection {...productsSectionProps}>
        <MappedTable {...productTableProps} />
      </ContentSection>
      {children}
    </>
  );
}
