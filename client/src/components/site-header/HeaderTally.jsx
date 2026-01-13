// /client/src/components/site-header/HeaderTally.jsx

import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import SvgIcon from "../svg-icon/SvgIcon";
import { toClassName } from "../../helpers/helpers";

import "./header-tally.css";

export default function HeaderTally({ bemBlock }) {
  const { orderItemCount } = useCart();
  const isVisible = !!orderItemCount;

  const containerBemProps = {
    bemBlock,
    bemElem: "container",
    bemMod: "tally",
    bemMod2: "hidden",
    showMod2: !isVisible
  };

  // data-count attribute holds the count value for the ::after pseudoelement
  return (
    <div className={toClassName({ bemBlock, bemElem: "section", bemMod: "tally" })}>
      <Link to={"/my-cart"}>
        <div className={toClassName(containerBemProps)} data-count={orderItemCount}>
          <SvgIcon pathName="CART_ICON" iconSizePx={72} />
        </div>
      </Link>
    </div>
  );
}
