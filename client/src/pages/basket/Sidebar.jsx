// /client/src/pages/basket/Sidebar.jsx

import { useNavigate } from "react-router-dom";
import SidebarSection from "../../components/SidebarSection";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleCheckoutNavigateClick = () =>
    navigate("/checkout", { state: { allowed: true } });

  return (
    <SidebarSection>
      <button onClick={handleCheckoutNavigateClick}>Checkout</button>
    </SidebarSection>
  );
}
