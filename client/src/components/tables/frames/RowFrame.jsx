// /client/src/components/tables/RowFrame.jsx

import { useNavigate } from "react-router-dom";
import { toClassName } from "../../../helpers/helpers";

export default function RowFrame({ buildPath, id, bemRoot, children }) {
  const navigate = useNavigate();

  const onClick = () => navigate(buildPath(id));

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(buildPath(id));
    }
  };

  const navProps = !!buildPath && !!id ?
    { role: "button", tabIndex: 0, onClick, onKeyDown } : {};

  const rowProps = { className: toClassName({ ...bemRoot }), ...navProps };

  return <tr {...rowProps}>{children}</tr>;
}
