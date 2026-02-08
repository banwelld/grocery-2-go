import { toBemClassName } from '../../../../utils/helpers';
import ProductCard from '../../components/product-card/ProductCard';

export default function PageContent({ products, displayConfig, pageName }) {
  const bemProps = {
    bemBlock: 'content',
    bemElem: 'container',
    bemMod: pageName,
  };

  return (
    <div className={toBemClassName(bemProps)}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} displayConfig={displayConfig} />
      ))}
    </div>
  );
}
