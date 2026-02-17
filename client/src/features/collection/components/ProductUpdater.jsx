import useViewMode from '../../../hooks/useViewMode';

import ProductForm from './ProductForm';
import ProductDisplay from './product-display/ProductDisplay';
import ProductCard from './product-card/ProductCard';
import Button from '../../../components/ui/Button';

import {
  displayConfig,
  DisplayVariantKey as DISPLAY,
} from './product-display/displayConfig';

const ViewMode = Object.freeze({
  CARD: 'card',
  PAGE: 'page',
});

const ButtonLabel = Object.freeze({
  [ViewMode.CARD]: 'View Page Layout',
  [ViewMode.PAGE]: 'View Card Layout',
});

export default function ProductUpdater({
  product,
  onSubmit,
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

  return (
    <div className='content__wrapper--product-update'>
      <ProductForm product={product} onSubmit={onSubmit} bemBlock={bemBlock}>
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
  );
}
