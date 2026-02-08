import useCheckoutProcess from '../../../../../hooks/useCheckoutProcess';
import useViewMode from '../../../../../hooks/useViewMode';
import DeliveryAddressForm, {
  Fields,
} from '../../../components/DeliveryAddressForm';
import ContentSection from '../../../../../components/ui/frames/ContentSection';
import DetailsTable from '../../../../../components/ui/tables/details-table/DetailsTable';
import StreetAddress from '../../../../../components/ui/StreetAddress';
import ClickHere from '../../../../../components/ui/ClickHere';

import { toBemClassName } from '../../../../../utils/helpers';
import { Headings } from '../../../../../config/constants';

const RequiredFields = [
  Fields.ADDRESS_LINE_1,
  Fields.CITY,
  Fields.PROVINCE_CODE,
  Fields.POSTAL_CODE,
];

export default function AddressView({
  setState: setAddressState,
  children,
  ...rest
}) {
  const { checkoutProcess } = useCheckoutProcess();
  const address = checkoutProcess?.address;
  const hasAddress = RequiredFields.every((field) => !!address?.[field]);

  const { toggleViewMode, isMode2: isEditMode } = useViewMode({
    startsMode2: !hasAddress,
  });

  const { bemBlock } = rest;

  const formProps = {
    onSubmit: (data) => {
      setAddressState(data);
      toggleViewMode();
    },
    bemBlock,
    address: hasAddress && address,
  };

  const deliveryAddress = <StreetAddress {...address} />;

  return (
    <ContentSection heading={Headings.CHECKOUT_DELIVERY}>
      {isEditMode ? (
        <DeliveryAddressForm {...formProps} />
      ) : (
        <>
          <DetailsTable
            data={{ Address: deliveryAddress }}
            dataType='delivery-address'
          />
          <div
            className={toBemClassName({
              bemBlock,
              bemMod: 'toggle-message',
              bemElem: 'wrapper',
            })}
          >
            <ClickHere
              actionDescription='edit your delivery address'
              onClick={toggleViewMode}
            />
          </div>
        </>
      )}
      {children}
    </ContentSection>
  );
}
