import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [allItems, setAllItems] = useState([]);

  return (
    <>
      <header></header>
      <main>
        <h1 color='blue'>IT WORKS!!</h1>
        {/* <Outlet context={[allItems, setAllItems]} /> */}
      </main>
    </>
  );
}

export default App;
