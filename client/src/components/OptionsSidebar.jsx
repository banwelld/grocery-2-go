// OptionsSidebar.jsx

import HeadingGroup from "./HeadingGroup";
import { toTitleCase } from "../helpers/helpers";
import "../css/options-sidebar.css";

export default function OptionsSidebar({ children, pageSubject }) {
  return (
    <>
      <HeadingGroup level={2}>{`${toTitleCase(pageSubject)} Options`}</HeadingGroup>
      <div className='options-sidebar'>{children}</div>
    </>
  );
}

export const SidebarBtn = ({ onClick, label }) => {
  return (
    <button type='button' className='sidebar-btn' onClick={onClick}>
      {label}
    </button>
  );
};
