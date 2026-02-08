import { Headings, UiText } from '../../../../../config/constants';
import ContentSection from '../../../../../components/ui/frames/ContentSection';

export default function EmptyCart() {
  return (
    <ContentSection
      heading={Headings.CART_EMPTY}
      headingLevel={2}
      uiText={UiText.CART_EMPTY}
      bemMod='empty'
    />
  );
}
