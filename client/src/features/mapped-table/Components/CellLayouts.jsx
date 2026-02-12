import { priceCentsToDollars } from '../../../utils/helpers';
import ProductImage from '../../collection/components/product-display/ProductImage';

export function Currency({ data }) {
  const decimalPrice = priceCentsToDollars(data, false);
  return (
    <div className='price__wrapper'>
      <span>$</span>
      <span>{decimalPrice}</span>
    </div>
  );
}

export function Image({ data }) {
  const imageProps = {
    src: data.imageFilename,
    alt: data.name,
    loading: 'eager',
    bemBlock: 'table',
  };
  return <ProductImage {...imageProps} />;
}
