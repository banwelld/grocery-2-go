// /client/src/pages/order/Order.jsx

import PageFrame from "../../components/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { PageName as pn } from "../page-enums";

export default function Order({ handleCancelClick = null }) {
  return (
    <PageFrame
      sidebar={<Sidebar />}
      mainContent={<MainContent handleCancelClick={handleCancelClick} />}
      pageName={pn.ORDER}
    />
  );
}
