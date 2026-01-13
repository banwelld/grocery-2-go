// /client/src/hooks/useNavVisibility.js

import useCart from "./useCart";
import { Restriction } from "../components/site-header/navLinkConfig";

export default function useNavVisibility(linkConfig, role) {
  const { products } = useCart();

  return linkConfig.filter((link) => {
    const hasRole = link.visibleTo?.includes(role) ?? false;
    const isRestricted = link.hiddenIf?.includes(Restriction.NO_CART) ?? true;
    if (!hasRole) return false;

    if (isRestricted && !products.length) return false;

    return true;
  });
}
