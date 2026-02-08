import { toDateIso, priceCentsToDollars } from '../../../utils/helpers';
import DetailsTable from '../../../components/ui/tables/details-table/DetailsTable';
import StreetAddress from '../../../components/ui/StreetAddress';

export default function OrderDetailsTable({
  addressLine1,
  addressLine2,
  city,
  provinceCode,
  postalCode,
  createdAt,
  status,
  updatedAt,
  finalTotalCents,
  productCount,
}) {
  const deliveryAddress = (
    <StreetAddress
      addressLine1={addressLine1}
      addressLine2={addressLine2}
      city={city}
      provinceCode={provinceCode}
      postalCode={postalCode}
    />
  );

  const orderDate = toDateIso(createdAt);
  const statusDateLabel = `${status} dt`;
  const statusDate = toDateIso(updatedAt);
  const orderTotal = `$ ${priceCentsToDollars(finalTotalCents)}`;

  const orderDetails = {
    'deliver to': deliveryAddress,
    'order dt': orderDate,
    [statusDateLabel]: statusDate,
    'item count': productCount,
    'order total': orderTotal,
  };

  return <DetailsTable data={orderDetails} dataType='order' />;
}
