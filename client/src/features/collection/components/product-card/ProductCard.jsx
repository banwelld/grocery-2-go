import { useNavigate } from 'react-router-dom';
import { QuantityAdjust } from '../../../cart/components/quantity-adjust/QuantityAdjust';
import { toBemClassName } from '../../../../utils/helpers';
import ProductDisplay from '../product-display/ProductDisplay';
import SuppressPropagation from '../../../../components/utility/SuppressPropagation';
import './ProductCard.css';

const BLOCK = 'product-card';

export default function ProductCard({
  product,
  displayConfig,
  isDisplayOnly = false,
}) {
  const navigate = useNavigate();

  if (!isDisplayOnly && !product.id)
    return (
      <div className={toBemClassName({ bemBlock: BLOCK })}>Loading...</div>
    );

  const onClick = () => navigate(`products/${product?.id}`);
  const onKeyDown = (e) =>
    e.key === 'Enter' || e.key === ' ' ? onClick() : null;

  const articleProps = isDisplayOnly
    ? {}
    : { role: 'button', tabIndex: 0, onClick, onKeyDown };

  const quantityAdjustProps = {
    productId: product?.id,
    parentBemBlock: BLOCK,
    collapseAtZero: true,
  };

  return (
    <article className={toBemClassName({ bemBlock: BLOCK })} {...articleProps}>
      <ProductDisplay
        product={product}
        displayConfig={displayConfig}
        bemBlock={BLOCK}
      />
      {!isDisplayOnly && (
        <SuppressPropagation>
          <QuantityAdjust {...quantityAdjustProps} />
        </SuppressPropagation>
      )}
    </article>
  );
}
