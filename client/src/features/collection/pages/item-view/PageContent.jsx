import useViewMode from '../../../../hooks/useViewMode';
import ProductDisplay from '../../components/product-display/ProductDisplay';
import ProductCard from '../../components/product-card/ProductCard';
import ProductForm from '../../components/ProductForm';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import Button from '../../../../components/ui/Button';
import { Headings } from '../../../../config/constants';

const Mode = Object.freeze({
  CARD: 'card',
  PAGE: 'page',
});

const ButtonLabel = Object.freeze({
  [Mode.CARD]: 'View Page Layout',
  [Mode.PAGE]: 'View Card Layout',
});

export default function PageContent({
  product,
  updateProduct,
  displayConfig,
  bemBlock,
}) {
  const {
    currentViewMode,
    toggleViewMode,
    isMode1: isPageMode,
  } = useViewMode({
    mode1: Mode.PAGE,
    mode2: Mode.CARD,
  });

  const formSectionProps = {
    heading: Headings.PRODUCT_UPDATE,
    bemMod: 'update-form',
  };

  const displaySectionProps = {
    heading: Headings.REALTIME_VIEW,
    bemMod: 'display',
  };

  return (
    <>
      <ContentSection {...formSectionProps}>
        <ProductForm
          product={product}
          onSubmit={updateProduct}
          bemBlock={bemBlock}
        />
      </ContentSection>
      <ContentSection {...displaySectionProps}>
        <Button
          label={ButtonLabel[currentViewMode]}
          onClick={toggleViewMode}
          bemMod='page-utility'
        />
        {isPageMode ? (
          <ProductDisplay
            product={product}
            displayConfig={displayConfig}
            displayVariant='page'
          />
        ) : (
          <ProductCard
            isDisplayOnly
            product={product}
            displayConfig={displayConfig}
          />
        )}
      </ContentSection>
    </>
  );
}
