// /client/src/components/tables/HeadFrame.jsx

export default function HeadFrame({ bemBlock, bemMod, children }) {
  return (
    <thead className={`${bemBlock}__head ${bemBlock}__head--${bemMod}`}>{children}</thead>
  );
}
