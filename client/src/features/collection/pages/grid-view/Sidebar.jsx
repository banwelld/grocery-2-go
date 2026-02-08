import { Headings } from '../../../../config/constants';
import OptionSelect from './OptionSelect';
import SidebarSection from '../../../../components/ui/frames/SidebarSection';

export default function Sidebar({ config, pageName }) {
  const { filter, sort } = config;
  return (
    <SidebarSection
      isRoot
      hasPageHeading
      heading={Headings.PRODUCT_CATALOG_HEAD}
      subHeading={Headings.PRODUCT_CATALOG_SUBHEAD}
      bemMod={pageName}
    >
      <SidebarSection {...filter.sectionProps}>
        <OptionSelect {...filter.listProps} />
      </SidebarSection>
      <SidebarSection {...sort.sectionProps}>
        <OptionSelect {...sort.listProps} />
      </SidebarSection>
    </SidebarSection>
  );
}
