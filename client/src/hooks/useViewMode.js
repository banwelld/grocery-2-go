import { useState, useCallback } from 'react';

export const VIEW_MODES = Object.freeze({
  READ: 'READ',
  EDIT: 'EDIT',
});

export default function useViewMode({
  mode1 = VIEW_MODES.READ,
  mode2 = VIEW_MODES.EDIT,
  startsMode2 = false,
  state: externalState,
  setState: setExternalState,
  paramName = 'view',
} = {}) {
  const initialMode = startsMode2 ? mode2 : mode1;
  const [internalState, setInternalState] = useState(initialMode);

  const hasExternalState =
    externalState !== undefined && setExternalState !== undefined;
  const isUrlState =
    hasExternalState && typeof externalState?.get === 'function';

  let currentViewMode;
  if (!hasExternalState) {
    currentViewMode = internalState;
  } else if (isUrlState) {
    const paramValue = externalState.get(paramName);
    currentViewMode = [mode1, mode2].includes(paramValue)
      ? paramValue
      : initialMode;
  } else {
    currentViewMode = externalState;
  }

  const toggleViewMode = useCallback(() => {
    const nextMode = currentViewMode === mode1 ? mode2 : mode1;

    if (isUrlState) {
      setExternalState({ [paramName]: nextMode });
    } else if (hasExternalState) {
      setExternalState(nextMode);
    } else {
      setInternalState(nextMode);
    }
  }, [
    mode1,
    mode2,
    currentViewMode,
    setExternalState,
    isUrlState,
    hasExternalState,
    paramName,
  ]);

  return {
    currentViewMode,
    toggleViewMode,
    isMode1: currentViewMode === mode1,
    isMode2: currentViewMode === mode2,
  };
}
