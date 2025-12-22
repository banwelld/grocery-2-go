// /client/src/components/tables/QuantityAdjustCell.jsx

import QuantityAdjustButton from "../../hooks/use-quantity-adjust/QuantityAdjustButton";
import StopPropagation from "../StopPropagation";
import { quantityAction as qa } from "../../hooks/constants";

const BLOCK = "quantity-adjust";

export default function QuantityAdjustCell({ cellData, quantityAdjustFn }) {
  return (
    <div className={`${BLOCK}__container--table`}>
      <StopPropagation>
        <QuantityAdjustButton
          adjustFn={quantityAdjustFn}
          action={qa.REMOVE}
          bemBlock={BLOCK}
        />
      </StopPropagation>
      <div className={`${BLOCK}__tally`}>{cellData}</div>
      <StopPropagation>
        <QuantityAdjustButton
          adjustFn={quantityAdjustFn}
          action={qa.ADD}
          bemBlock={BLOCK}
        />
      </StopPropagation>
    </div>
  );
}
