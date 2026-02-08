import { useState, useContext, useMemo } from 'react';
import { PageName } from '../../../../config/enums';
import { ProductContext } from '../../context/ProductContext';
import { sortConfig } from './util/sortConfig';
import PageContent from './PageContent';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Sidebar from './Sidebar';
import { sortComparators } from './util/sortComparators';
import { displayConfig } from '../../components/product-display/displayConfig';

export default function GridView() {
  const { products, categories } = useContext(ProductContext);
  const [category, setCategory] = useState('all');
  const [sortName, setSortName] = useState('department');

  const pageName = PageName.LIST_VIEW;

  const displayProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (category !== 'all')
      result = result.filter((prod) => prod.category === category);

    if (sortName) result.sort(sortComparators[sortName]);

    return result;
  }, [products, category, sortName]);

  const filterLabels = useMemo(() => {
    return ['all', ...categories];
  }, [categories]);

  const sidebarConfig = useMemo(
    () => ({
      filter: {
        sectionProps: {
          heading: 'Filter by:',
          bemMod: 'filters',
        },
        listProps: {
          items: filterLabels,
          selected: category,
          setState: setCategory,
          bemBlock: 'sidebar',
        },
      },
      sort: {
        sectionProps: {
          heading: 'Sort by:',
          bemMod: 'sorts',
        },
        listProps: {
          items: sortConfig,
          selected: sortName,
          setState: setSortName,
          bemBlock: 'sidebar',
        },
      },
    }),
    [filterLabels, category, sortName],
  );

  if (!products) return <p>Loading products...</p>;

  return (
    <PageFrame
      sidebar={<Sidebar config={sidebarConfig} />}
      pageContent={
        <PageContent
          products={displayProducts}
          displayConfig={displayConfig}
          pageName={pageName}
        />
      }
      pageName={pageName}
    />
  );
}
