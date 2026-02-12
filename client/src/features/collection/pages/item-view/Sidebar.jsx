import { Headings } from '../../../../config/constants';
import SidebarSection from '../../../../components/ui/frames/SidebarSection';

export default function Sidebar({ sidebarControls, productName, pageName }) {
  return (
    <SidebarSection
      isRoot
      heading={Headings.PRODUCT_SIDEBAR}
      subHeading={productName}
      bemMod={pageName}
    >
      {sidebarControls}
    </SidebarSection>
  );
}
