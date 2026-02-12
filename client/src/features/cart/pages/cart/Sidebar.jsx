import SidebarSection from '../../../../components/ui/frames/SidebarSection';

export default function Sidebar({ toggleViewModeButton, pageName }) {
  return (
    <SidebarSection isRoot bemRoot={{ bemMod: pageName }}>
      {toggleViewModeButton}
    </SidebarSection>
  );
}
