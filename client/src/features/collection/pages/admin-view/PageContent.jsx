import useViewMode from '../../../../hooks/useViewMode';
import ProductDisplay from '../../components/product-display/ProductDisplay';
import ProductCard from '../../components/product-card/ProductCard';
import ProductForm from '../../components/ProductForm';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import Button from '../../../../components/ui/Button';
import {
  displayConfig,
  DisplayVariantKey as DISPLAY,
} from '../../components/product-display/displayConfig';
import { Headings } from '../../../../config/constants';

const ViewMode = Object.freeze({
  CARD: 'card',
  PAGE: 'page',
});

const ButtonLabel = Object.freeze({
  [ViewMode.CARD]: 'View Page Layout',
  [ViewMode.PAGE]: 'View Card Layout',
});

export default function PageContent({
  product,
  onSubmit,
  isValidSelection,
  bemBlock = 'form',
}) {
  const {
    currentViewMode,
    toggleViewMode,
    isMode1: isPageMode,
  } = useViewMode({
    mode1: ViewMode.PAGE,
    mode2: ViewMode.CARD,
  });

  const rootSectionProps = {
    heading: Headings.PRODUCT_UPDATE,
    bemMod: 'product-update',
  };

  return (
    <>
      <ContentSection isRoot hasPageHeading {...rootSectionProps}>
        {!isValidSelection ? (
          <p>
            The item that you selected is not valid. Please choose another from
            the list.
          </p>
        ) : (
          <div className='content__wrapper--product-update'>
            <ProductForm
              product={product}
              onSubmit={onSubmit}
              bemBlock={bemBlock}
            >
              {(values) => (
                <div className='content__wrapper--product-display'>
                  <Button
                    label={ButtonLabel[currentViewMode]}
                    onClick={toggleViewMode}
                    bemMod='page-utility'
                  />
                  {isPageMode ? (
                    <ProductDisplay
                      product={values}
                      displayConfig={displayConfig}
                      displayVariant={DISPLAY.ADMIN}
                    />
                  ) : (
                    <ProductCard
                      isDisplayOnly
                      product={values}
                      displayConfig={displayConfig}
                    />
                  )}
                </div>
              )}
            </ProductForm>
          </div>
        )}
      </ContentSection>
    </>
  );
}
