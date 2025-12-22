// /client/src/pages/user-auth/UserAuth.jsx

import { useSearchParams } from "react-router-dom";
import PageFrame from "../../components/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { PageName as pn } from "../page-enums";

export default function UserAuth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") ?? "login";

  const isLoginView = view === "login";

  return (
    <PageFrame
      sidebar={<Sidebar isLoginView={isLoginView} setSearchParams={setSearchParams} />}
      mainContent={<MainContent paramView={view} />}
      pageName={pn.USER_AUTH}
    />
  );
}
