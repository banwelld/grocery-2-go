// client/src/pages/home/ListSelector.jsx

import { toClassName } from "../../helpers/helpers";

export default function ListSelector({ items, selected, setterFn, bemBlock }) {
  const normalizedItems = items.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item
  );

  return (
    <ul className={toClassName({ bemBlock, bemElem: "list" })}>
      {normalizedItems.map(({ value, label }) => (
        <li
          key={value}
          className={toClassName({
            bemBlock,
            bemElem: "list-item",
            conditionalMod: "selected",
            showConditional: value === selected,
          })}
          onClick={() => setterFn(value)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
