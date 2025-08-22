// TitleBar.jsx

import React from "react";
import {Link} from "react-router-dom";

export default function TitleBar() {
  return (
    <div id='site-title' class='full-width'>
      <Link to={"/"} class='flex row'>
        <img src='../images/strawberry02.png' alt='perfectly ripe produce'></img>
        <hgroup class='flex col'>
          <h1>Grocery2Go</h1>
          <p>Gourmet foods right to your home!</p>
        </hgroup>
      </Link>
    </div>
  );
}
