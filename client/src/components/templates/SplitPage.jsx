// SplitPage.jsx

import React from "react";

export default function SplitPage({ sidebar, children }) {
  return (
    <main className='split-page'>
      <section className='side-bar'>{sidebar}</section>
      <section className='main-content'>{children}</section>
    </main>
  );
}
