// /client/src/pages/order/Sidebar.jsx

import SidebarSection from "../../components/section-frames/SidebarSection";



export default function Order({ handleCancel = null }) {
  return (
    <SidebarSection>
      <button onClick={handleCancel}>Cancel Order</button>
    </SidebarSection>
  );
}
