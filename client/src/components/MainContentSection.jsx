// /client/src/pages/user-auth/MainContentSection.jsx

import SectionFrame from "./SectionFrame";

/**
 * @typedef ContentProps
 * @property {string} [heading]
 * @property {number} [headingLevel]
 * @property {string} [uiText]
 * @property {string} [bemBlock]
 * @property {string} [bemMod]
 * @property {React.ReactNode} children
 */

/** @param {ContentProps} props */

export default function MainContentSection({ children, ...props }) {
  const { bemBlock = "content", bemMod = "root", ...rest } = props;

  return <SectionFrame {...{ bemBlock, bemMod, ...rest }}>{children}</SectionFrame>;
}
