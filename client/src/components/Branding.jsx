// Branding.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function Branding() {
  return (
    <div className='branding wrapper'>
      <Link to={"/"} title={"Go to homepage"}>
        <img
          className='branding'
          src='../images/grocery2go-logo.webp'
          alt='Grocery2Go logo'
        />
      </Link>
    </div>
  );
}
