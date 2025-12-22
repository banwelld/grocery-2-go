// client/src/pages/product/Sidebar.jsx

import SidebarSection from "../../components/SidebarSection";
import QuantityAdjust from "../../components/QuantityAdjust";
import { headings as h } from "../../strings";

export default function Sidebar({ productId, productName }) {
  return (
    <SidebarSection heading={h.PROD_SIDEBAR} subHeading={productName}>
      <QuantityAdjust productId={productId} />
    </SidebarSection>
  );
}
