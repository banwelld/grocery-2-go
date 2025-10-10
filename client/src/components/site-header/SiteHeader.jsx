// SiteHeader.jsx

import HeaderLogo from "./HeaderLogo";
import HeaderBasket from "./HeaderBasket";
import NavBar from "./NavBar";
import "../../css/site-header.css";

export default function SiteHeader() {
  return (
    <div className='site-header'>
      <div className='upper'>
        <div className='header-logo'>
          <HeaderLogo />
        </div>
        <div className='header-basket'>
          <HeaderBasket />
        </div>
      </div>
      <NavBar />
    </div>
  );
}
