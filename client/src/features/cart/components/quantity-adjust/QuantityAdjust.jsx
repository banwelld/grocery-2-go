import { toBemClassName } from '../../../../utils/helpers';
import useCartAction from '../../../../hooks/useCartAction';
import SuppressPropagation from '../../../../components/utility/SuppressPropagation';
import Button from '../../../../components/ui/Button';
import SvgIcon from '../../../../components/ui/svg-icon/SvgIcon';
import { SvgPath } from '../../../../components/ui/svg-icon/constants';
import {
  QaButtonStyle as Style,
  QaButtonAriaLabels as Label,
  QaButtonBemMods as Mod,
} from './constants';
import './QuantityAdjust.css';

// This module comprises all of the quantity-adjust components
//   - QuantityAdjust
//   - TableQuantityAdjust
//   - TableResetQuantity
//   - AdjustButton

const BLOCK = 'quantity-adjust';

export function QuantityAdjust({ productId, collapseAtZero, parentBemBlock }) {
  const { quantity, increment, decrement, hasProduct } =
    useCartAction(productId);

  const isShowAll = !(collapseAtZero && !hasProduct);
  const isCollapsed = collapseAtZero && !hasProduct;

  const decrementStyleKey = [
    !hasProduct && Style.DISABLED,
    quantity === 1 && Style.RESET,
    Style.DECREMENT,
  ].find(Boolean);

  const incrementStyleKey = hasProduct ? Style.INCREMENT : Style.ADD_INITIAL;

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
    bemMod2: 'collapsed',
    showMod2: isCollapsed,
  };

  const quantityBemProps = {
    bemBlock: BLOCK,
    bemElem: 'quantity',
    bemMod: parentBemBlock,
  };

  return (
    <div className={toBemClassName(wrapperBemProps)}>
      {isShowAll && (
        <>
          <AdjustButton {...decrementButtonProps} />
          <div className={toBemClassName(quantityBemProps)}>
            <p>{quantity || 0}</p>
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

  const bemRoot = { bemBlock: BLOCK, bemMod: 'table' };

  const decrementButtonProps = {
    onClick: decrement,
    styleKey: Style.DECREMENT,
    isDisabled: isOneLeft,
    suppressPropagation: true,
    bemBlock: BLOCK,
    parentBemBlock: 'table',
  };

  const incrementButtonProps = {
    onClick: increment,
    styleKey: Style.INCREMENT,
    suppressPropagation: true,
    bemBlock: BLOCK,
    parentBemBlock: 'table',
  };

  return (
    <div className={toBemClassName(bemRoot)}>
      <AdjustButton {...decrementButtonProps} />
      <div className={toBemClassName({ ...bemRoot, bemElem: 'quantity' })}>
        {quantity}
      </div>
      <AdjustButton {...incrementButtonProps} />
    </div>
  );
}

export function TableResetQuantity({ data }) {
  const { productId } = data ?? {};
  const { resetQuantity } = useCartAction(productId);

  const bemRoot = { bemBlock: BLOCK, bemMod: 'table' };

  const resetButtonProps = {
    onClick: resetQuantity,
    styleKey: Style.RESET,
    suppressPropagation: true,
    bemBlock: BLOCK,
    parentBemBlock: 'table',
  };

  return (
    <div className={toBemClassName({ ...bemRoot, bemElem: 'container' })}>
      <AdjustButton {...resetButtonProps} />
    </div>
  );
}

/**
 * Dedicated button component for quantity adjust functionality.
 *
 * **IMPORTANT**: Component discards children. Pass label prop.
 */
export function AdjustButton({
  onClick,
  styleKey = 'UNKNOWN',
  isDisabled = false,
  suppressPropagation = false,
  parentBemBlock = 'UNKNOWN',
}) {
  const buttonProps = {
    label: <SvgIcon path={SvgPath[styleKey]} />,
    onClick,
    disabled: isDisabled,
    bemMod: `${parentBemBlock}-${Mod[styleKey]}`,
    'aria-label': Label[styleKey],
  };

  const adjustButton = <Button {...buttonProps} />;

  return suppressPropagation ? (
    <SuppressPropagation>{adjustButton}</SuppressPropagation>
  ) : (
    adjustButton
  );
}
