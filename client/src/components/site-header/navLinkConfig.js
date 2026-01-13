// /client/src/components/site-header/navLinkConfig.js

export const Role = Object.freeze({
  GUEST: "guest",
  CUSTOMER: "customer",
});

export const Restriction = Object.freeze({
  NO_CART: "NO_CART",
});

export const getLinkConfig = (user) => [
  {
    path: "/",
    label: "Home",
    visibleTo: [Role.GUEST, Role.CUSTOMER],
    hiddenIf: [],
  },
  {
    path: `/users/${user.id}`,
    label: "View my profile",
    visibleTo: [Role.CUSTOMER],
    hiddenIf: [],
  },
  {
    path: "/my-cart",
    label: "View my cart",
    visibleTo: [Role.CUSTOMER],
    hiddenIf: [Restriction.NO_CART],
  },
  {
    path: "/user-auth",
    label: "Login / Register",
    visibleTo: [Role.GUEST],
    hiddenIf: [],
  },
];
