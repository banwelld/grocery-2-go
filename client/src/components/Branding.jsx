// Branding.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function Branding() {
  return (
    <Link to={"/"} title={"Go to homepage"}>
      <div className='wrapper'>
        <img
          src='../images/strawberry02.png'
          aria-hidden='true'
          alt='perfectly ripe strawberies'
        ></img>
        <hgroup>
          <h1>Grocery2Go</h1>
          <p>Gourmet foods right to your home!</p>
        </hgroup>
      </div>
    </Link>
  );
}
