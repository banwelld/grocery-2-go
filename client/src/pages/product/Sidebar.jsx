// client/src/pages/product/Sidebar.jsx

import SidebarSection from "../../components/section-frames/SidebarSection";
import { QuantityAdjust } from "../../components/quantity-adjust/QuantityAdjust";
import { headings } from "../../strings";



export default function Sidebar({ productId, productName }) {
  return (
    <SidebarSection heading={headings.PROD_SIDEBAR} subHeading={productName}>
      <QuantityAdjust productId={productId} parentBemBlock="product-page" />
    </SidebarSection>
  );
}
