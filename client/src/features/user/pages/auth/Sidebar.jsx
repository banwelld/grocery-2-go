import SidebarSection from '../../../../components/ui/frames/SidebarSection';

export default function Sidebar({ sidebarControls, pageName }) {
  return (
    <SidebarSection isRoot bemMod={pageName}>
      {sidebarControls}
    </SidebarSection>
  );
}
