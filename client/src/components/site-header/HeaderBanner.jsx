// /client/src/components/site-header/HeaderBanner.jsx

import { Link } from "react-router-dom";

export default function HeaderBanner({ bemBlock }) {
  const imageProps = {
    src: "/images/grocery2go-logo.webp",
    alt: "Grocery2Go",
  };

  return (
    <div className={`${bemBlock}__banner`}>
      <Link to={"/"} aria-label='Grocery2Go homepage'>
        <img className='banner__image' {...imageProps} />
      </Link>
    </div>
  );
}
