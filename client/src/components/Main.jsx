// Main.jsx

import React, {useState, useEffect} from "react";
import ItemList from "./ItemList";

export default function Main({orderItems, setOrderItems}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/items")
    .then((r) => r.json())
    .then((r) => setItems(r));
  }, []);

  console.log(items);

  return (
    <main>
      <div id='left-side' className='sidebar'></div>
      <div className='content'>
        <ItemList items={items} orderItems={orderItems} setOrderItems={setOrderItems} />
      </div>
      <div id='right-side' className='sidebar'></div>
    </main>
  );
}
