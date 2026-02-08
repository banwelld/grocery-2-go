import { toBemClassName } from '../../../../utils/helpers';
import ProductDetails from './ProductDetails';
import ProductImage from './ProductImage';

const bemBlock = 'product-display';

export default function ProductDisplay({
  product,
  displayConfig,
  displayVariant = 'card',
}) {
  const { name, imageFilename } = product;
  const { imageLoadMethod } = displayConfig[displayVariant];

  const isURL = imageFilename.length >= 20;

  const imageProps = {
    alt: name,
    src: isURL ? imageFilename : `/images/products/${imageFilename}`,
    loading: imageLoadMethod,
    bemBlock,
  };

  const detailsProps = { product, displayConfig, displayVariant };

  return (
    <div
      className={toBemClassName({
        bemBlock,
        bemElem: 'container',
        bemMod: displayVariant,
      })}
    >
      <ProductImage {...imageProps} />
      <ProductDetails {...detailsProps} />
    </div>
  );
}
