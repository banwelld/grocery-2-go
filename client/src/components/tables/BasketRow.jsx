// /client/src/components/tables/mapped-table/BasketRow.jsx

import useQuantityAdjust from "../../hooks/use-quantity-adjust/useQuantityAdjust";
import MappedTableRow from "../../components/tables/mapped-table/MappedTableRow";

export default function BasketRow({ tableConfig, data, bemBlock, bemMod }) {
  const { getRowIdFn } = tableConfig;
  const productId = getRowIdFn(data);

  const { handleQuantityAdjust, itemCount } = useQuantityAdjust(productId);

  const enhancedData = { ...data, quantity: itemCount };

  return (
    <MappedTableRow
      tableConfig={tableConfig}
      data={enhancedData}
      quantityAdjustFn={handleQuantityAdjust}
      {...{ bemBlock, bemMod }}
    />
  );
}
