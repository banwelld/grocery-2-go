// client/src/pages/home/ListSelector.jsx

import { toClassName } from "../../helpers/helpers";

export default function ListSelector({ items, selected, setState, bemBlock }) {
  const normalizeItems = (item) =>
    typeof item === "string" ? { value: item, label: item } : item;

  const normalItems = items.map(normalizeItems);

  return (
    <ul className={toClassName({ bemBlock, bemElem: "list" })}>
      {normalItems.map(({ value, label }) => (
        <li
          key={value}
          className={toClassName({
            bemBlock,
            bemElem: "list-item",
            bemMod2: "selected",
            showMod2: value === selected,
          })}
          onClick={() => setState(value)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
