import { toBemClassName } from '../../../../utils/helpers';
import './ProductOrigin.css';

export default function ProductOrigin({ originCountry, bemRoot }) {
  if (!originCountry) return null;

  const { bemBlock } = bemRoot;
  const isCanada = originCountry.toLowerCase() === 'canada';

  const originBemProps = {
    bemBlock,
    bemElem: 'origin',
    bemMod2: 'canada',
    showMod2: isCanada,
  };

  return (
    <p className={toBemClassName({ bemMod: 'origin', ...bemRoot })}>
      Made in{' '}
      <span className={toBemClassName(originBemProps)}>{originCountry}</span>
      {isCanada && (
        <span className={toBemClassName({ bemBlock, bemElem: 'flag' })}>
          {' '}
          🇨🇦
        </span>
      )}
    </p>
  );
}
