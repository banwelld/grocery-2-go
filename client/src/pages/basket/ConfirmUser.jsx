// /client/src/pages/checkout/ConfirmUser.jsx

import MainContentSection from "../../components/MainContentSection";
import UserInfoDisplay from "./confirm-user-info/UserInfoDisplay";
import ConfirmationCheck from "./confirm-user-info/ConfirmationCheck";
import { headings as h } from "../../strings";

export default function ConfirmUser({ children, ...stepProps }) {
  return (
    <MainContentSection heading={h.USER_INFO} headingLevel={2} bemMod='confirm-user'>
      <UserInfoDisplay />
      <ConfirmationCheck {...stepProps} />
      {children}
    </MainContentSection>
  );
}
