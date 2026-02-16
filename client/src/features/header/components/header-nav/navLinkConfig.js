import { UserRole as Role } from '../../../../config/enums';
import PATHS from '../../../../config/paths';

const ALL = Object.values(Role);
const AUTHENTICATED_USERS = ALL.filter((item) => item !== Role.GUEST);

export const Restriction = Object.freeze({
  NO_CART: 'NO_CART',
});

export const getLinkConfig = (user) => [
  {
    path: PATHS.FRONT.HOME,
    label: 'Home',
    visibleTo: ALL,
    hiddenIf: [],
  },
  {
    path: PATHS.FRONT.USER_PROFILE,
    label: 'View my profile',
    visibleTo: AUTHENTICATED_USERS,
    hiddenIf: [],
  },
  {
    path: PATHS.FRONT.CART,
    label: 'View my cart',
    visibleTo: [Role.CUSTOMER],
    hiddenIf: [Restriction.NO_CART],
  },
  {
    path: PATHS.FRONT.AUTH_LOGIN,
    label: 'Login / Register',
    visibleTo: [Role.GUEST],
    hiddenIf: [],
  },
  {
    path: PATHS.FRONT.PRODUCT_ADMIN,
    label: 'Add/Update Products',
    visibleTo: [Role.ADMIN],
    hiddenIf: [],
  },
];
