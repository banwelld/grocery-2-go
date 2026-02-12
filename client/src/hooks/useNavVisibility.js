import { Restriction } from '../features/header/components/header-nav/navLinkConfig';
import useCart from './useCart';

export default function useNavVisibility(linkConfig, role) {
  const {
    cartDetails: { products },
  } = useCart();

  return linkConfig.filter((link) => {
    const hasRole = link.visibleTo?.includes(role) ?? false;
    const isRestricted = link.hiddenIf?.includes(Restriction.NO_CART) ?? true;
    if (!hasRole) return false;

    if (isRestricted && !products.length) return false;

    return true;
  });
}
