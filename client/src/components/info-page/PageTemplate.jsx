// StandardPg.jsx

import React from "react";

export default function StandardPg({ sidebarContent, mainContent }) {
  return (
    <main className='standard-page'>
      <section className='side-bar'>{sidebarContent}</section>
      <section className='main-content'>{mainContent}</section>
    </main>
  );
}
