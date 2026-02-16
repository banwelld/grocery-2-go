import ContentSection from '../../../components/ui/frames/ContentSection';

import { CheckoutStep as Step } from '../components/checkout-process/checkoutFlow';
import { Headings, UiText } from '../../../config/constants';

const Strings = Object.freeze({
  [Step.SUMMARY]: {
    HEADING: Headings.CART,
    UI_TEXT: UiText.SUMMARY,
  },
  [Step.USER_INFO]: {
    HEADING: Headings.CHECKOUT,
    UI_TEXT: UiText.CHECKOUT_USER_INFO,
  },
  [Step.DELIVERY_INFO]: {
    HEADING: Headings.CHECKOUT,
    UI_TEXT: UiText.CHECKOUT_DELIVERY,
  },
  [Step.CONFIRMATION]: {
    HEADING: Headings.CHECKOUT,
    UI_TEXT: null,
  },
});

export default function PageContent({
  contentElements,
  cartEmpty,
  pageName,
  currentStep = Step.SUMMARY,
}) {
  const stepKey = currentStep || Step.SUMMARY;
  const { checkoutProcessController } = contentElements;

  if (cartEmpty) {
    return (
      <ContentSection
        isRoot={true}
        hasPageHeading={true}
        heading={Headings.CART_EMPTY}
        uiText={UiText.CART_EMPTY}
        bemMod={pageName}
      />
    );
  }

  const sectionProps = {
    isRoot: true,
    hasPageHeading: true,
    heading: Strings[stepKey].HEADING,
    bemMod: pageName,
    uiText: Strings[stepKey].UI_TEXT,
  };

  return (
    <ContentSection {...sectionProps}>
      {checkoutProcessController}
    </ContentSection>
  );
}
