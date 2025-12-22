// /client/src/pages/user-auth/SidebarSection.jsx

import SectionFrame from "./SectionFrame";

/**
 * @typedef SidebarProps
 * @property {string} [heading]
 * @property {number} [headingLevel]
 * @property {string} [subHeading]
 * @property {string} [bemBlock]
 * @property {string} [bemMod]
 * @property {React.ReactNode} children
 */

/** @param {SidebarProps} props */

export default function SidebarSection({ children, ...props }) {
  const {
    heading = "Options",
    headingLevel = 2,
    subHeading: uiText,
    bemBlock = "sidebar",
    bemMod = "root",
  } = props;

  return (
    <SectionFrame {...{ heading, headingLevel, uiText, bemBlock, bemMod }}>
      {children}
    </SectionFrame>
  );
}
