// TitleBar.jsx

import React from "react";
import {Link} from "react-router-dom";

export default function TitleBar() {
  return (
    <Link to={"/"} className='flex row hov brighten scale-up-lg' title='Go to homepage'>
      <img
        src='../images/strawberry02.png'
        aria-hidden='true'
        alt='perfectly ripe produce'
      ></img>
      <hgroup className='flex'>
        <h1>Grocery2Go</h1>
        <p>Gourmet foods right to your home!</p>
      </hgroup>
    </Link>
  );
}
