// client/src/components/tables/product-table/TableBodyFrame.jsx

export default function TableBodyFrame({ bemBlock, bemMod, children }) {
  return (
    <tbody className={`${bemBlock}__body ${bemBlock}__body--${bemMod}`}>{children}</tbody>
  );
}
