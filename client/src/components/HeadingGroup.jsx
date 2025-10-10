// HeadingGroup.jsx

import React from "react";

export default function HeadingGroup({ level = 1, children }) {
  const [headingText, supportText] = React.Children.toArray(children);

  if (!headingText) return null;

  return (
    <div className='heading-group'>
      {level === 1 && <h1>{headingText}</h1>}
      {level === 2 && <h2>{headingText}</h2>}
      {level === 3 && <h3>{headingText}</h3>}
      {supportText && <div className='ancillary-text'>{supportText}</div>}
    </div>
  );
}
