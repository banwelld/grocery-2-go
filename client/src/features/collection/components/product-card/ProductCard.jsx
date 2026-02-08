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

  const { id } = product;

  if (!id)
    return (
      <div className={toBemClassName({ bemBlock: BLOCK })}>Loading...</div>
    );

  const onClick = () => navigate(`products/${id}`);
  const onKeyDown = (e) =>
    e.key === 'Enter' || e.key === ' ' ? onClick() : null;

  const articleProps = isDisplayOnly
    ? {}
    : { role: 'button', tabIndex: 0, onClick, onKeyDown };

  const quantityAdjustProps = {
    productId: id,
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
