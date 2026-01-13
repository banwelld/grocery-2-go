// /client/src/components/quantity-adjust/QuantityAdjust.jsx

import useCartAction from "../../hooks/useCartAction";
import SvgIcon from "../svg-icon/SvgIcon";
import StopPropagation from "../utility/StopPropagation";
import { toClassName } from "../../helpers/helpers";
import { ButtonStyle } from "./constants";
import "./quantity-adjust.css";

// This module comprises all of the quantity-adjust components
//   - QuantityAdjust
//   - TableQuantityAdjust
//   - TableResetQuantity
//   - AdjustButton


const labels = Object.freeze({
  [ButtonStyle.INCREMENT]: "Add one item",
  [ButtonStyle.ADD_INITIAL]: "Add first of an item",
  [ButtonStyle.DECREMENT]: "Decrement one item",
  [ButtonStyle.RESET]: "Reset quantity to zero",
});

const bemMods = Object.freeze({
  [ButtonStyle.INCREMENT]: "up",
  [ButtonStyle.ADD_INITIAL]: "new",
  [ButtonStyle.DECREMENT]: "down",
  [ButtonStyle.RESET]: "reset",
});

const BLOCK = "quantity-adjust";

export function QuantityAdjust({ productId, collapseAtZero, parentBemBlock }) {
  const { quantity, increment, decrement, hasProduct } = useCartAction(productId);

  const isShowAll = !(collapseAtZero && !hasProduct);
  const isCollapsed = collapseAtZero && !hasProduct;

  const decrementStyleKey = [
    !hasProduct && ButtonStyle.DISABLED,
    quantity === 1 && ButtonStyle.RESET,
    ButtonStyle.DECREMENT,
  ].find(Boolean);

  const incrementStyleKey = hasProduct ? ButtonStyle.INCREMENT : ButtonStyle.ADD_INITIAL;

  const decrementButtonProps = {
    onClick: decrement,
    styleKey: decrementStyleKey,
    isDisabled: !hasProduct,
    bemBlock: BLOCK,
    parentBemBlock,
  };

  const incrementButtonProps = {
    onClick: increment,
    styleKey: incrementStyleKey,
    bemBlock: BLOCK,
    parentBemBlock,
  };

  const wrapperBemProps = {
    bemBlock: BLOCK,
    bemMod: parentBemBlock,
    bemMod2: "collapsed",
    showMod2: isCollapsed,
  };

  const quantityBemProps = {
    bemBlock: BLOCK,
    bemElem: "quantity",
    bemMod: parentBemBlock,
  };

  return (
    <div className={toClassName(wrapperBemProps)}>
      {isShowAll && (
        <>
          <AdjustButton {...decrementButtonProps} />
          <div className={toClassName(quantityBemProps)}>
            {quantity || 0}
          </div>
        </>
      )}
      <AdjustButton {...incrementButtonProps} />
    </div>
  );
}

export function TableQuantityAdjust({ data }) {
  const { quantity, productId } = data ?? {};
  const { decrement, increment } = useCartAction(productId);

  const isOneLeft = quantity === 1;

  const decrementButtonStyle = isOneLeft ? ButtonStyle.DISABLED : ButtonStyle.DECREMENT;

  const bemRoot = { bemBlock: BLOCK, bemMod: "table" }

  const decrementButtonProps = {
    onClick: decrement,
    styleKey: decrementButtonStyle,
    isDisabled: isOneLeft,
    stopPropagation: true,
    bemBlock: BLOCK,
    parentBemBlock: "table",
  };

  const incrementButtonProps = {
    onClick: increment,
    styleKey: ButtonStyle.INCREMENT,
    stopPropagation: true,
    bemBlock: BLOCK,
    parentBemBlock: "table",
  };

  return (
    <div className={toClassName(bemRoot)}>
      <AdjustButton {...decrementButtonProps} />
      <div className={toClassName({ ...bemRoot, bemElem: "quantity" })}>
        {quantity}
      </div>
      <AdjustButton {...incrementButtonProps} />
    </div>
  )
};

export function TableResetQuantity({ data }) {
  const { productId } = data ?? {};
  const { resetQuantity } = useCartAction(productId);

  const bemRoot = { bemBlock: BLOCK, bemMod: "table" }

  const resetButtonProps = {
    onClick: resetQuantity,
    styleKey: ButtonStyle.RESET,
    stopPropagation: true,
    bemBlock: BLOCK,
    parentBemBlock: "table",
  };

  return (
    <div className={toClassName({ ...bemRoot, bemElem: "container" })}>
      <AdjustButton {...resetButtonProps} />
    </div>
  );
}

/**
 * Dedicated button component for quantity adjust functionality.  
 * 
 * **IMPORTANT**: Component discards children. Label is driven by styleKey prop.  
 */
export function AdjustButton({
  onClick,
  styleKey = "unknown",
  isDisabled = false,
  stopPropagation = false,
  parentBemBlock,
}) {
  const bemRoot = { bemBlock: BLOCK, bemMod: bemMods[styleKey], bemMod2: parentBemBlock, showMod2: true };

  const buttonProps = {
    onClick,
    type: "button",
    disabled: isDisabled,
    "aria-label": labels[styleKey],
    className: toClassName({ ...bemRoot, bemElem: "button" }),
  };

  const button = (
    <button {...buttonProps}>
      <SvgIcon pathName={styleKey} />
    </button>
  );

  return stopPropagation ? <StopPropagation>{button}</StopPropagation> : button;
}