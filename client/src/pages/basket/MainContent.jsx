// /client/src/pages/basket/MainContent.jsx

import MainContentSection from "../../components/MainContentSection";
import { CheckoutProvider } from "../../contexts/CheckoutContext";
import CheckoutController from "./CheckoutController";
import { headings as h } from "../../strings";

export default function MainContent() {
  return (
    <MainContentSection heading={h.BASKET}>
      <CheckoutProvider>
        <CheckoutController bemBlock='basket' />
      </CheckoutProvider>
    </MainContentSection>
  );
}
