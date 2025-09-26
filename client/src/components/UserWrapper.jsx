// UserWrapper.jsx

import React, { useEffect, useState } from "react";
import { getData } from "../helpers";

export default function UserWrapper({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData("/users", (data) => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  const formatPhoneString = (phoneNum) => {
    if (typeof phoneNum !== "string" || phoneNum.length !== 10) return "Unknown";
    return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, -4)} - ${phoneNum.slice(-4)}`;
  };

  const formattedUser = { ...user, phone: formatPhoneString(user.phone) };

  const childrenWithUser = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user: formattedUser });
    }
    return child;
  });

  return <>{childrenWithUser}</>;
}
