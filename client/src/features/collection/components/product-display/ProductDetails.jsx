import {
  priceCentsToDollars,
  isInteger,
  toBemClassName,
} from '../../../../utils/helpers';
import ProductOrigin from './ProductOrigin';
import SectionFrame from '../../../../components/ui/frames/SectionFrame';

export default function ProductDetails({
  product,
  displayVariant = 'card',
  displayConfig,
  bemBlock = 'product-display',
  bemElem = 'product-info',
}) {
  const {
    description,
    name,
    originCountry,
    packageQuantity,
    priceCents,
    saleUnit,
  } = product;

  const { hasPageHeading, showDescription, showPackageSize } =
    displayConfig[displayVariant];

  const decimalPrice = priceCentsToDollars(priceCents);
  const packageType = isInteger({ value: saleUnit, positiveOnly: true })
    ? `${saleUnit}-pack`
    : saleUnit;

  const sectionProps = {
    hasPageHeading,
    heading: name,
    isRoot: true,
    bemRoot: { bemBlock, bemMod: bemElem },
  };

  const bemRoot = { bemBlock, bemElem };

  return (
    <SectionFrame {...sectionProps}>
      <ProductOrigin originCountry={originCountry} bemRoot={bemRoot} />
      {showDescription && (
        <p className={toBemClassName({ bemMod: 'description', ...bemRoot })}>
          {description}
        </p>
      )}
      <p className={toBemClassName({ bemMod: 'price', ...bemRoot })}>
        <span className={toBemClassName({ bemMod: 'amount', ...bemRoot })}>
          $ {decimalPrice}{' '}
        </span>
        <span
          className={toBemClassName({ bemMod: 'package-type', ...bemRoot })}
        >
          / {packageType}{' '}
        </span>
        {showPackageSize && !!packageQuantity && (
          <span
            className={toBemClassName({ bemMod: 'package-size', ...bemRoot })}
          >
            ({packageQuantity})
          </span>
        )}
      </p>
    </SectionFrame>
  );
}
