// /client/src/pages/basket/ViewBasket.jsx

import MainContentSection from "../../components/MainContentSection";
import { paragraphsFromArray } from "../../helpers/helpers";
import { headings as h, sectionText as st } from "../../strings";
import BasketTable from "./BasketTable";

export default function ViewBasket({ products, children }) {
  const uiText = paragraphsFromArray(st.BASKET);

  const sectionProps = {
    heading: h.BASKET_LIST,
    headingLevel: 2,
    uiText: uiText,
    bemMod: "view-basket",
  };

  return (
    <MainContentSection {...sectionProps}>
      <BasketTable products={products} />
      {children}
    </MainContentSection>
  );
}
