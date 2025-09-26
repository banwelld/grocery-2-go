// SplitPageWrapper.jsx

import React from "react";
import "../../css/info-page.css";

export default function SplitPageWrapper({ children }) {
  const [sidebar, mainContent] = React.Children.toArray(children);

  return (
    <main className='split-page'>
      <section className='side-bar'>{sidebar}</section>
      <section className='main-content'>{mainContent}</section>
    </main>
  );
}
