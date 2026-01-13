// /client/src/pages/user-auth/ContentSection.jsx

import SectionFrame from "./SectionFrame";

/**
 * @typedef ContentProps
 * @property {string} [heading]
 * @property {boolean} [isTopLevel]
 * @property {string | string[]} [uiText]
 * @property {string} [bemBlock]
 * @property {string} [bemMod]
 * @property {React.ReactNode} children
 */

/** @param {ContentProps} props */

export default function ContentSection({ children, ...props }) {
  const { bemBlock = "content", bemMod, ...sectionProps } = props;

  const effectiveMod = (!bemMod && sectionProps.isTopLevel) ? "root" : bemMod;
  const bemRoot = { bemBlock, bemMod: effectiveMod };

  return (
    <SectionFrame {...sectionProps} {...bemRoot}>
      {children}
    </SectionFrame>
  );
}
