import ProductUpdater from '../../components/ProductUpdater';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import { Headings, UiText } from '../../../../config/constants';

export default function PageContent({
  product,
  onSubmit,
  isValidSelection,
  bemBlock = 'form',
}) {
  const rootSectionProps = {
    heading: Headings.PRODUCT_UPDATE,
    bemMod: 'product-update',
  };

  return (
    <>
      <ContentSection isRoot hasPageHeading {...rootSectionProps}>
        {!isValidSelection ? (
          <p>{UiText.INVALID_PRODUCT_SELECTION}</p>
        ) : (
          <ProductUpdater product={product} onSubmit={onSubmit} />
        )}
      </ContentSection>
    </>
  );
}
