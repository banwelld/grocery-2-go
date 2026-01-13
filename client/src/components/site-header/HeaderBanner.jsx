// /client/src/components/site-header/HeaderBanner.jsx

import { Link } from "react-router-dom";
import { toClassName } from "../../helpers/helpers";

export default function HeaderBanner({ bemBlock }) {
  const imageProps = {

  };

  return (
    <div className={toClassName({ bemBlock, bemElem: "section", bemMod: "banner" })}>
      <div className={toClassName({ bemBlock, bemElem: "container", bemMod: "banner" })}>
        <Link to={"/"} aria-label='Grocery2Go homepage'>
          <img src="/images/grocery2go-logo.webp" alt="Grocery2Go" />
        </Link>
      </div>
    </div>
  );
}
