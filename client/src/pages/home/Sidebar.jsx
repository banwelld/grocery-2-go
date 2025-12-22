// /client/src/pages/home/Sidebar.jsx

import SidebarSection from "../../components/SidebarSection";
import ListSelector from "./ListSelector";
import { headings as h } from "../../strings";

export default function Sidebar({ sidebarConfig }) {
  return (
    <SidebarSection heading={h.HOME_HEAD} headingLevel={1} subHeading={h.HOME_SUBHEAD}>
      {sidebarConfig.map((sc) => (
        <SidebarSection key={sc.sectionProps.bemMod} {...sc.sectionProps}>
          <ListSelector {...sc.listProps} />
        </SidebarSection>
      ))}
    </SidebarSection>
  );
}
