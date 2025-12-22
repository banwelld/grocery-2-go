// /client/src/components/QuantityAdjust.jsx

import useQuantityAdjust from "../hooks/use-quantity-adjust/useQuantityAdjust";
import QuantityAdjustButton from "../hooks/use-quantity-adjust/QuantityAdjustButton";
import { toClassName } from "../helpers/helpers";
import { quantityAction as qa } from "../hooks/constants";

const BLOCK = "quantity-adjust";

export default function QuantityAdjust({ productId, collapseAtZero }) {
  const { handleQuantityAdjust, itemCount, hasProduct, isLast } =
    useQuantityAdjust(productId);

  const showExpanded = !(collapseAtZero && !hasProduct);
  const isCollapsed = collapseAtZero && !hasProduct;

  const removeAction = [
    !hasProduct && qa.DISABLED,
    isLast && qa.REMOVE_ALL,
    qa.REMOVE,
  ].find(Boolean);

  const addAction = hasProduct ? qa.ADD : qa.ADD_NEW;

  return (
    <div
      className={toClassName({
        bemBlock: BLOCK,
        bemElem: "container",
        conditionalMod: "collapsed",
        showConditional: isCollapsed,
      })}
    >
      {showExpanded && (
        <>
          <QuantityAdjustButton
            adjustFn={handleQuantityAdjust}
            action={removeAction}
            isDisabled={!hasProduct}
            bemBlock={BLOCK}
          />
          <div className={toClassName({ bemBlock: BLOCK, bemElem: "tally" })}>
            <p>{itemCount}</p>
          </div>
        </>
      )}
      <QuantityAdjustButton
        adjustFn={handleQuantityAdjust}
        action={addAction}
        bemBlock={BLOCK}
      />
    </div>
  );
}
