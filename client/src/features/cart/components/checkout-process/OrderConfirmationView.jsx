import { Headings, UiText } from '../../../../config/constants';
import { TableRegistryKeys } from '../../../mapped-table/utils/MappedTableRegistry';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import DetailsTable from '../../../../components/ui/tables/details-table/DetailsTable';
import MappedTable from '../../../mapped-table/Components/MappedTable';
import tableConfig from '../../../order/pages/tableConfig';
import useCheckoutProcess from '../../../../hooks/useCheckoutProcess';
import UserDetailsTable from '../../../user/components/UserDetailsTable';
import StreetAddress from '../../../../components/ui/StreetAddress';
import CartTotals from './CartTotals';

export default function OrderConfirmationView({ children }) {
  const { cart, checkoutProcess, userDetails } = useCheckoutProcess();
  const { products, orderItemCount, orderTotal } = cart;
  const address = checkoutProcess?.address;

  const tableConfigCheckout = {
    ...tableConfig,
    tableRegistryKey: TableRegistryKeys.CHECKOUT,
  };

  const mappedTableProps = {
    data: products,
    tableConfig: tableConfigCheckout,
    parentBemBlock: 'checkout',
  };

  const deliveryAddress = (
    <StreetAddress
      addressLine1={address?.addressLine1}
      addressLine2={address?.addressLine2}
      city={address?.city}
      provinceCode={address?.provinceCode}
      postalCode={address?.postalCode}
    />
  );

  return (
    <>
      <ContentSection heading={Headings.CHECKOUT_DELIVERY}>
        <DetailsTable
          data={{ Address: deliveryAddress }}
          dataType='delivery-address'
        />
      </ContentSection>
      <ContentSection heading={Headings.USER_INFO}>
        <UserDetailsTable user={userDetails?.user} />
      </ContentSection>
      <ContentSection heading={Headings.ORDER_LIST}>
        <MappedTable {...mappedTableProps} />
      </ContentSection>
      <ContentSection heading={Headings.ORDER_TOTALS}>
        <CartTotals orderItemCount={orderItemCount} orderTotal={orderTotal} />
      </ContentSection>
      <ContentSection
        heading={Headings.CHECKOUT_CONFIRMATION}
        uiText={UiText.CHECKOUT_CONFIRMATION}
      >
        {children}
      </ContentSection>
    </>
  );
}
