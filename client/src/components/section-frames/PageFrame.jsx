// /client/src/components/PageFrame.jsx

import { toClassName } from "../../helpers/helpers";
import "./content.css";
import "./sidebar.css";

export default function PageFrame({ sidebar, mainContent, pageName }) {
  return (
    <main className={toClassName({ bemBlock: "page", bemMod: pageName })}>
      <aside className={toClassName({ bemBlock: "sidebar", bemMod: pageName })}>
        {sidebar}
      </aside>
      <div className={toClassName({ bemBlock: "content", bemMod: pageName })}>
        {mainContent}
      </div>
    </main>
  );
}
