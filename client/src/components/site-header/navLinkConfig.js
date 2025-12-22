// /client/src/components/site-header/navLinkConfig.js

export const navLinkConfig = [
  {
    path: "/",
    label: "Home",
    visible: "all",
  },
  {
    path: "/users/:id",
    label: "View my profile",
    visible: "customer",
  },
  {
    path: "/my-basket",
    label: "View my basket",
    visible: "customer",
  },
  {
    path: "/user-auth",
    label: "Login / Register",
    visible: "guest",
  },
];
