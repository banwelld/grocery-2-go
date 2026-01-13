// client/src/components/SectionFrame.jsx

import { toClassName } from "../../helpers/helpers";

export default function SectionFrame({
  heading = "HEADING_MISSING_OR_INVALID",
  isTopLevel = false,
  uiText = null,
  children,
  ...bemProps
}) {
  const headingLevel = isTopLevel ? 1 : 2;
  const Heading = `h${headingLevel}`;
  return (
    <section className={toClassName({ bemElem: "section", ...bemProps })}>
      <div className={toClassName({ bemElem: "intro", ...bemProps })}>
        <header className={toClassName({ bemElem: "header", ...bemProps })}>
          <Heading>{heading}</Heading>
        </header>
        {!!uiText && (
          <div className={toClassName({ bemElem: "ui-text", ...bemProps })}>
            {Array.isArray(uiText) ? uiText.map((text, i) => <p key={i}>{text}</p>) : uiText}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
