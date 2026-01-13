// /client/src/components/StopPropagation.jsx

import clsx from "clsx";

export default function StopPropagation({ bemMod = null, children }) {
  const preventLink = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const className = clsx("click-suppressor", {
    [`click-suppressor--${bemMod}`]: !!bemMod,
  });

  return (
    <div className={className} onClick={preventLink}>
      {children}
    </div>
  );
}
