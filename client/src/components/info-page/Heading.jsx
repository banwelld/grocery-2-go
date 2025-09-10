// Heading.jsx

import React from "react";

export default function Heading({ text, isPgHead = true, subText = "" }) {
  return (
    <div className='heading'>
      {isPgHead === true ? <h1>{text}</h1> : <h2>{text}</h2>}
      {subText && <p>{subText}</p>}
    </div>
  );
}
