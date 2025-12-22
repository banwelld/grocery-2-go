// /client/src/components/tables/TableHeadFrame.jsx

export default function TableHeadFrame({ bemBlock, bemMod, children }) {
  return (
    <thead className={`${bemBlock}__head ${bemBlock}__head--${bemMod}`}>{children}</thead>
  );
}
