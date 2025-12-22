// /client/src/pages/checkout/DeliveryInfo.jsx

import MainContentSection from "../../components/MainContentSection";
import SubmissionForm from "../../components/forms/SubmissionForm";
import { headings as h } from "../../strings";
import { deliveryInfoSchema } from "./deliveryInfoSchema";

export default function DeliveryInfo({ setterFn, children }) {
  return (
    <MainContentSection
      heading={h.CHECKOUT_DELIVERY}
      headingLevel={2}
      bemMod='confirm-delivery-info'
    >
      <SubmissionForm
        formSchema={deliveryInfoSchema}
        onSubmit={(values) => setterFn(values)}
        bemBlock='checkout'
      />
      {children}
    </MainContentSection>
  );
}
