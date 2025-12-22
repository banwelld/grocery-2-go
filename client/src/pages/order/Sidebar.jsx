// /client/src/pages/order/Sidebar.jsx

import SidebarSection from "../../components/SidebarSection";

export default function Order({ handleCancelClick = null }) {
  return (
    <SidebarSection>
      <button onClick={handleCancelClick}>Cancel Order</button>
    </SidebarSection>
  );
}
