// client/src/components/SectionFrame.jsx

import { toClassName } from "../helpers/helpers";

export default function SectionFrame({
  heading = "missing_heading",
  headingLevel = 1,
  uiText = null,
  bemBlock,
  bemMod = null,
  children,
}) {
  const hasUIText = !!uiText;

  const Heading = `h${headingLevel}`;

  return (
    <section className={toClassName({ bemBlock, bemElem: "section", bemMod })}>
      <div className={toClassName({ bemBlock, bemElem: "intro", bemMod })}>
        <header className={toClassName({ bemBlock, bemElem: "header", bemMod })}>
          <Heading>{heading}</Heading>
        </header>
        {hasUIText && (
          <div className={toClassName({ bemBlock, bemElem: "ui-text", bemMod })}>
            {uiText}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
