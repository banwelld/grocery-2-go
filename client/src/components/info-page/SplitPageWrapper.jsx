// SplitPageWrapper.jsx

import React from "react";
import "../../css/info-page.css";

export default function SplitPageWrapper({ className, children }) {
  const [sidebar, mainInfo] = React.Children.toArray(children);

  return (
    <main className={`split-page ${className}`}>
      <aside className='side-bar'>{sidebar}</aside>
      <div className='main-info'>{mainInfo}</div>
    </main>
  );
}
