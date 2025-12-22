// /client/src/pages/basket/Basket.jsx

import PageFrame from "../../components/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { PageName as pn } from "../page-enums";

export default function Basket() {
  return (
    <PageFrame sidebar={<Sidebar />} mainContent={<MainContent />} pageName={pn.BASKET} />
  );
}
