// /client/src/pages/cart/EmptyCart.jsx

import ContentSection from "../../../components/section-frames/ContentSection";
import { headings, uiText } from "../../../strings";

export default function EmptyCart() {
  return (
    <ContentSection
      heading={headings.CART_EMPTY}
      headingLevel={2}
      uiText={uiText.CART_EMPTY}
      bemMod="empty"
    />
  );
}
