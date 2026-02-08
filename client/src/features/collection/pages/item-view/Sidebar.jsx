import { Headings } from '../../../../config/constants';
import SidebarSection from '../../../../components/ui/frames/SidebarSection';

export default function Sidebar({
  isManager,
  sidebarControls,
  productName,
  pageName,
}) {
  return (
    <SidebarSection
      isRoot
      heading={isManager && Headings.PRODUCT_SIDEBAR}
      subHeading={productName}
      bemMod={pageName}
    >
      {sidebarControls}
    </SidebarSection>
  );
}
