// Main.jsx

import React, {useState} from "react";

export default function Main() {
  const [items, setItems] = useState(null);

  items && setItems(0);

  return <h1>This is where the Main component goes</h1>;
}
