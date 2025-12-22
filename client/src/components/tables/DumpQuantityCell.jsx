// /client/src/components/tables/DumpQuantityCell.jsx

import QuantityAdjustButton from "../../hooks/use-quantity-adjust/QuantityAdjustButton";
import StopPropagation from "../StopPropagation";
import { quantityAction as qa } from "../../hooks/constants";

export default function DumpQuantityCell({ quantityAdjustFn }) {
  return (
    <StopPropagation>
      <QuantityAdjustButton
        adjustFn={quantityAdjustFn}
        action={qa.REMOVE_ALL}
        bemBlock='quantity-adjust'
      />
    </StopPropagation>
  );
}
