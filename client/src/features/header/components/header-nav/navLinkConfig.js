import { UserRole as Role } from '../../../../config/enums';

const ALL = Object.values(Role);
const AUTHENTICATED_USERS = ALL.filter((item) => item !== Role.GUEST);

export const Restriction = Object.freeze({
  NO_CART: 'NO_CART',
});

export const getLinkConfig = (user) => [
  {
    path: '/',
    label: 'Home',
    visibleTo: ALL,
    hiddenIf: [],
  },
  {
    path: `/my-profile?view=READ`,
    label: 'View my profile',
    visibleTo: AUTHENTICATED_USERS,
    hiddenIf: [],
  },
  {
    path: '/my-cart',
    label: 'View my cart',
    visibleTo: [Role.CUSTOMER],
    hiddenIf: [Restriction.NO_CART],
  },
  {
    path: '/auth?view=LOGIN',
    label: 'Login / Register',
    visibleTo: [Role.GUEST],
    hiddenIf: [],
  },
  {
    path: '/products/admin',
    label: 'Add/Update Products',
    visibleTo: [Role.ADMIN],
    hiddenIf: [],
  },
];
