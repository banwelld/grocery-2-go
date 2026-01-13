// /client/src/pages/checkout/AddressView.jsx

import { useState } from "react";
import useCheckoutProcess from "../../../hooks/useCheckoutProcess";
import ContentSection from "../../../components/section-frames/ContentSection";
import SubmissionForm from "../../../components/forms/submission-form/SubmissionForm";
import DetailsTable from "../../../components/tables/details-table/DetailsTable";
import Button from "../../../components/ui/Button";
import formSettings from "./formSettings";
import { headings } from "../../../strings";

const View = Object.freeze({
  EDIT_VIEW: "edit",
  READ_VIEW: "read",
});

const { initialValues, ...otherSettings } = formSettings;

export default function AddressView({ setState: onSubmit, children }) {
  const { checkout: { address } } = useCheckoutProcess();
  const isAddressSet = Object.keys(address).length > 0;

  const [pageView, setPageView] = useState(isAddressSet ? View.READ_VIEW : View.EDIT_VIEW);

  const isEditView = pageView === View.EDIT_VIEW;

  const toEditView = () => setPageView(View.EDIT_VIEW);
  const toReadView = () => setPageView(View.READ_VIEW);

  const onSubmitEnhanced = (data) => {
    onSubmit(data);
    toReadView();
  };

  const deliveryAddress =
    `${address.address}\n${address.city}, ${address.provinceCd}  ${address.postalCd}`;

  const initialValuesEnhanced = { ...initialValues, ...address };

  const formProps = {
    onSubmit: onSubmitEnhanced,
    ...otherSettings,
    initialValues: initialValuesEnhanced,
    bemMod: "delivery-address"
  };

  const readViewButtonProps = {
    label: "Click here",
    displayAsText: true,
    onClick: toEditView,
    bemMod: "delivery-address"
  }

  return (
    <ContentSection heading={headings.CHECKOUT_DELIVERY}>
      {isEditView ? (
        <SubmissionForm {...formProps} />
      ) : (
        <>
          <DetailsTable
            data={{ "Address": deliveryAddress }}
            dataType="delivery-address"
          />
          <Button {...readViewButtonProps} />
          <span>to return to edit mode.</span>
          {children}
        </>
      )}
    </ContentSection>
  );
}
