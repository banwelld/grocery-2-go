// /client/src/pages/checkout/OrderConfirmationView.jsx

import useCheckoutProcess from "../../../hooks/useCheckoutProcess";
import ContentSection from "../../../components/section-frames/ContentSection";
import DetailsTable from "../../../components/tables/details-table/DetailsTable";
import UserDetailsTable from "../../../components/tables/UserDetailsTable";
import MappedTable from "../../../components/tables/mapped-table/MappedTable";
import tableConfig from "../cart-view/tableConfig";
import { TableRegistryKeys } from "../../../components/tables/mapped-table/MappedTableRegistry";
import { headings, uiText } from "../../../strings";

export default function OrderConfirmationView({ children }) {
  const { cart, checkout: { user, address } } = useCheckoutProcess();

  const deliveryAddress =
    `${address.address}\n${address.city}, ${address.provinceCd}  ${address.postalCd}`;

  const tableConfigCheckout = { ...tableConfig, tableRegistryKey: TableRegistryKeys.CHECKOUT }

  const mappedTableProps = {
    data: cart.products,
    tableConfig: tableConfigCheckout,
    parentBemBlock: "checkout",
  }

  return (
    <ContentSection heading={headings.CHECKOUT_CONFIRMATION} uiText={uiText.CHECKOUT_CONFIRMATION}>
      <ContentSection heading={headings.CHECKOUT_DELIVERY}>
        <DetailsTable
          data={{ "Address": deliveryAddress }}
          dataType="delivery-address"
        />
      </ContentSection>
      <ContentSection heading={headings.USER_INFO}>
        <UserDetailsTable user={user} />
      </ContentSection>
      <ContentSection heading={headings.ORDER_LIST}>
        <MappedTable {...mappedTableProps} />
      </ContentSection>
      {children}
    </ContentSection>
  );
}
