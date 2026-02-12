import { Headings } from '../../../../config/constants';
import SidebarSection from '../../../../components/ui/frames/SidebarSection';

export default function Sidebar({ sidebarControls, pageName }) {
  return (
    <SidebarSection
      isRoot
      heading={Headings.ADMIN_VIEW_SIDEBAR}
      bemMod={pageName}
    >
      {sidebarControls}
    </SidebarSection>
  );
}
