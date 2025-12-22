// /client/src/components/tables/TableRowFrame.jsx

import { useNavigate } from "react-router-dom";

export default function TableRowFrame({
  getPathFn = null,
  id = null,
  bemBlock,
  bemMod,
  children,
}) {
  const navigate = useNavigate();

  const isLink = !!getPathFn && !!id;

  const handleClick = () => navigate(getPathFn(id));

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      navigate(getPathFn(id));
    }
  };

  const rowProps = {
    className: `${bemBlock}__row ${bemBlock}__row--${bemMod}`,
    ...(isLink && {
      role: "button",
      tabIndex: 0,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    }),
  };

  return <tr {...rowProps}>{children}</tr>;
}
