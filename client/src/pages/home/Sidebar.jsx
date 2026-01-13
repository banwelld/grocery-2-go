// /client/src/pages/home/Sidebar.jsx

import SidebarSection from "../../components/section-frames/SidebarSection";
import ListSelector from "./ListSelector";
import { headings as h } from "../../strings";



export default function Sidebar({ config }) {
  return (
    <SidebarSection heading={h.HOME_HEAD} headingLevel={1} subHeading={h.HOME_SUBHEAD}>
      {config.map((cfg) => (
        <SidebarSection key={cfg.sectionProps.bemMod} {...cfg.sectionProps}>
          <ListSelector {...cfg.listProps} />
        </SidebarSection>
      ))}
    </SidebarSection>
  );
}
