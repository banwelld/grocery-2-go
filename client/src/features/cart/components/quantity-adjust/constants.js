export const QaButtonStyle = Object.freeze({
  INCREMENT: 'INCREMENT',
  ADD_INITIAL: 'ADD_INITIAL',
  DEFAULT: 'DEFAULT',
  DISABLED: 'DISABLED',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  CART_ICON: 'CART_ICON',
  UNKNOWN: 'UNKNOWN',
});

export const QaButtonAriaLabels = Object.freeze({
  [QaButtonStyle.INCREMENT]: 'Add one item',
  [QaButtonStyle.ADD_INITIAL]: 'Add first of an item',
  [QaButtonStyle.DECREMENT]: 'Decrement one item',
  [QaButtonStyle.RESET]: 'Reset quantity to zero',
});

export const QaButtonBemMods = Object.freeze({
  [QaButtonStyle.INCREMENT]: 'qa-up',
  [QaButtonStyle.ADD_INITIAL]: 'qa-new',
  [QaButtonStyle.DECREMENT]: 'qa-down',
  [QaButtonStyle.RESET]: 'qa-reset',
  [QaButtonStyle.DISABLED]: 'qa-disabled',
});
