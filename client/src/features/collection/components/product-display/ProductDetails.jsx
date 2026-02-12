import {
  priceCentsToDollars,
  isInteger,
  toBemClassName,
} from '../../../../utils/helpers';
import ProductOrigin from './ProductOrigin';
import SectionFrame from '../../../../components/ui/frames/SectionFrame';
import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../../config/enums';

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

  const normalized = {
    name: name ? name : '#Name',
    originCountry: originCountry === DEFAULT ? '#Country' : originCountry,
    description: description ? description : '#Description',
    priceCents: priceCents,
    packageType: packageType ? packageType : 'container',
    packageQuantity: packageQuantity && packageQuantity,
  };

  const sectionProps = {
    hasPageHeading,
    heading: normalized.name,
    isRoot: true,
    bemRoot: { bemBlock, bemMod: bemElem },
  };

  const bemRoot = { bemBlock, bemElem };

  return (
    <SectionFrame {...sectionProps}>
      <ProductOrigin
        originCountry={normalized.originCountry}
        bemRoot={bemRoot}
      />
      {showDescription && (
        <p className={toBemClassName({ bemMod: 'description', ...bemRoot })}>
          {normalized.description}
        </p>
      )}
      <p className={toBemClassName({ bemMod: 'price', ...bemRoot })}>
        <span className={toBemClassName({ bemMod: 'amount', ...bemRoot })}>
          $ {decimalPrice}{' '}
        </span>
        <span
          className={toBemClassName({ bemMod: 'package-type', ...bemRoot })}
        >
          / {normalized.packageType}{' '}
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
