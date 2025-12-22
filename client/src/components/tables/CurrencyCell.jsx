// /client/src/components/tables/CurrencyCellContents.jsx

import { intToDecimalPrice } from "../../helpers/helpers";

export default function CurrencyCellContents({ cellData }) {
  const decimalPrice = intToDecimalPrice(cellData, false);
  return (
    <div className='price__wrapper'>
      <span>$</span>
      <span>{decimalPrice}</span>
    </div>
  );
}
