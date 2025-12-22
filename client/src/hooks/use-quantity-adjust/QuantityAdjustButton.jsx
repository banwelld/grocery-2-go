// /client/src/hooks/QuantityAdjustButton.jsx

import QuantityAdjustIcon from "./QuantityAdjustIcon";
import { toClassName } from "../../helpers/helpers";
import { quantityAction as qa } from "../constants";

const labels = Object.freeze({
  [qa.ADD]: "Add one item",
  [qa.ADD_NEW]: "Add first of an item",
  [qa.REMOVE]: "Remove one item",
  [qa.REMOVE_ALL]: "Remove all of an item",
});

const bemMods = Object.freeze({
  [qa.ADD]: "up",
  [qa.ADD_NEW]: "new",
  [qa.REMOVE]: "down",
  [qa.REMOVE_ALL]: "dump",
});

export default function QuantityAdjustButton({
  adjustFn,
  action = "unknown",
  isDisabled = false,
  bemBlock,
}) {
  const isValidAction = Object.values(qa).includes(action);
  if (!isValidAction)
    console.error(
      `Invalid quantityAction "${action}". Expected one of: ` +
        `${Object.values(qa).join(", ")}`
    );

  const buttonProps = {
    "aria-label": labels[action],
    onClick: (e) => adjustFn(e, { action }),
    disabled: isDisabled,
    className: toClassName({ bemBlock, bemElem: "button", bemMod: bemMods[action] }),
  };

  return (
    <div
      className={toClassName({
        bemBlock,
        bemElem: "button-wrapper",
        bemMod: bemMods[action],
      })}
    >
      <button {...buttonProps}>
        <QuantityAdjustIcon action={action} />
      </button>
    </div>
  );
}
