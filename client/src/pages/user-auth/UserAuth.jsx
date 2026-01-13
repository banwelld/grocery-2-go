// /client/src/pages/user-auth/UserAuth.jsx

import useUser from "../../hooks/useUser";
import { useSearchParams } from "react-router-dom";
import PageFrame from "../../components/section-frames/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Button from "../../components/ui/Button";
import { PageName } from "../enums";

const PARAM_KEY = "view";

const View = Object.freeze({
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
});

const ButtonLabel = Object.freeze({
  [View.LOGIN]: "Sign me up!",
  [View.REGISTER]: "Back to login",
})

const ToggleDestination = Object.freeze({
  [View.LOGIN]: View.REGISTER,
  [View.REGISTER]: View.LOGIN,
})

export default function UserAuth() {
  const { isLoggedIn, userAuth: { login, register } } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageView = searchParams.get(PARAM_KEY) ?? View.LOGIN;

  const toggleView = () => {
    const nextView = ToggleDestination[pageView];
    setSearchParams({ [PARAM_KEY]: nextView });
  };

  const ToggleViewButton = () =>
    <Button
      onClick={toggleView}
      label={ButtonLabel[pageView]}
      disabled={isLoggedIn}
    />

  const sidebarProps = { ToggleViewButton, isLoggedIn };
  const mainProps = { login, register, paramView: pageView, View, isLoggedIn };

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarProps} />}
      mainContent={<MainContent {...mainProps} />}
      pageName={PageName.USER_AUTH}
    />
  );
}
