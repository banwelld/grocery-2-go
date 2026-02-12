import { useState, useCallback } from 'react';

import toast from 'react-hot-toast';

import Feedback from '../config/feedback';

const { Toasts } = Feedback;

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
  disableMode1 = false,
  disableMode2 = false,
  disableMessage = 'Toggle disabled',
} = {}) {
  const initialMode = startsMode2 && !disableMode2 ? mode2 : mode1;
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

  // force legal modal if one is disabled
  if (disableMode2 && currentViewMode === mode2) currentViewMode = mode1;
  if (disableMode1 && currentViewMode === mode1) currentViewMode = mode2;

  const toggleViewMode = useCallback(() => {
    const nextMode = currentViewMode === mode1 ? mode2 : mode1;

    const isBlocked =
      (nextMode === mode2 && disableMode2)
      || (nextMode === mode1 && disableMode1);

    if (isBlocked) {
      toast.error(disableMessage);
      return;
    }

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
    disableMode1,
    disableMode2,
    disableMessage,
  ]);

  return {
    currentViewMode,
    toggleViewMode,
    isMode1: currentViewMode === mode1,
    isMode2: currentViewMode === mode2,
  };
}
