// /client/src/pages/user/User.jsx

import { useParams, useSearchParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import PageFrame from "../../components/section-frames/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Button from "../../components/ui/Button";
import ErrorPage from "../ErrorPage";
import { PageName } from "../enums";
import { headings, uiText } from "../../strings";


const PARAM_KEY = "VIEW"

const View = Object.freeze({
  READ: "READ",
  EDIT: "EDIT",
})

const ButtonLabel = Object.freeze({
  [View.READ]: "Update Customer",
  [View.EDIT]: "View Info",
})

const ToggleDestination = Object.freeze({
  [View.READ]: View.EDIT,
  [View.EDIT]: View.READ,
})

export default function User() {
  const { user, isLoggedIn, userActions: { updateUser } } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();

  if (!isLoggedIn) {
    return (
      <ErrorPage
        heading={headings.WHOOPS}
        uiText={uiText.NOT_LOGGED_IN}
      />
    );
  }

  if (Number(id) !== user.id) {
    return (
      <ErrorPage
        heading={headings.WHOOPS}
        uiText={uiText.NOT_YOUR_USER}
      />
    );
  }

  const currentView = searchParams.get(PARAM_KEY) ?? View.READ;
  const isReadView = currentView === View.READ;

  const toggleView = () => {
    const nextView = ToggleDestination[currentView];
    setSearchParams({ [PARAM_KEY]: nextView });
  };

  const ToggleViewButton = () => (
    <Button onClick={toggleView} label={ButtonLabel[currentView]} />
  )

  const sidebarProps = { ToggleViewButton };
  const mainProps = { user, updateUser, isReadView };

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarProps} />}
      mainContent={<MainContent {...mainProps} />}
      pageName={PageName.USER}
    />
  );
}