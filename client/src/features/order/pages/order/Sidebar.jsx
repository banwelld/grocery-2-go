import SidebarSection from '../../../../components/ui/frames/SidebarSection';

export default function Order({ sidebarControls, pageName }) {
  return <SidebarSection bemMod={pageName}>{sidebarControls}</SidebarSection>;
}
