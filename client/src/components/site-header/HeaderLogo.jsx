// HeaderLogo.jsx

import { Link } from "react-router-dom";

export default function HeaderLogo() {
  return (
    <div className='header-logo'>
      <Link to={"/"} aria-label='Grocery2Go homepage'>
        <img
          className='header-logo'
          src='/images/grocery2go-logo.webp'
          alt='Grocery2Go'
        />
      </Link>
    </div>
  );
}
