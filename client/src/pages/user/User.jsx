// /client/src/pages/user/User.jsx

import { useSearchParams } from "react-router-dom";
import PageFrame from "../../components/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { PageName as pn } from "../page-enums";

export default function User() {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = searchParams.get("view") ?? "info";
  const isInfoView = view === "info";

  return (
    <PageFrame
      sidebar={<Sidebar isInfoView={isInfoView} setSearchParams={setSearchParams} />}
      mainContent={<MainContent isInfoView={isInfoView} />}
      pageName={pn.USER}
    />
  );
}
