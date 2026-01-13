// client/src/components/tables/product-table/BodyFrame.jsx

import { toClassName } from "../../../helpers/helpers";

export default function BodyFrame({ bemRoot, children }) {

  return (
    <tbody className={toClassName({ ...bemRoot, bemElem: "body" })}>{children}</tbody>
  );
}
