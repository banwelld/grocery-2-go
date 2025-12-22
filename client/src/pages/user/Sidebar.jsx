// /client/src/pages/user/Sidebar.jsx

import SidebarSection from "../../components/SidebarSection";

export default function Sidebar({ isInfoView, setSearchParams }) {
  const toggleView = () => {
    setSearchParams({ view: isInfoView ? "update" : "info" });
  };

  const toggleBtnLabel = isInfoView ? "Update Info" : "View Customer Info";

  return (
    <SidebarSection>
      <button onClick={toggleView}>{toggleBtnLabel}</button>
    </SidebarSection>
  );
}
