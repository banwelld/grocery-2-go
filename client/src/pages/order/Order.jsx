// /client/src/pages/order/Order.jsx

import { OrderProvider } from "../../contexts/OrderContext";
import useUser from "../../hooks/useUser";
import PageFrame from "../../components/section-frames/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import ErrorPage from "../ErrorPage";
import { PageName } from "../enums";
import { headings, uiText } from "../../strings";


export default function Order() {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return (
      <ErrorPage
        heading={headings.WHOOPS}
        uiText={uiText.NOT_LOGGED_IN}
      />
    )
  }

  return (
    <OrderProvider>
      <PageFrame
        sidebar={<Sidebar />}
        mainContent={<MainContent pageName={PageName.ORDER} />}
        pageName={PageName.ORDER}
      />
    </OrderProvider>
  );
}
