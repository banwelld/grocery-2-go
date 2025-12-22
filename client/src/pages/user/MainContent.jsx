// /client/src/pages/user/MainContent.jsx

import { useContext } from "react";
import { UserContext } from "../../contexts/contexts";
import MainContentSection from "../../components/MainContentSection";
import UserInfoAndOrders from "./UserInfoAndOrders";
import UserUpdateSection from "./UserUpdateSection";
import { paragraphsFromArray } from "../../helpers/helpers";
import { headings as h, sectionText as st } from "../../strings";

export default function MainContent({ isInfoView }) {
  const { user, setUser } = useContext(UserContext);

  const uiText = paragraphsFromArray(st.USER);

  return (
    <MainContentSection heading={h.USER} uiText={uiText}>
      {isInfoView ? (
        <UserInfoAndOrders user={user} />
      ) : (
        <UserUpdateSection user={user} setUser={setUser} />
      )}
    </MainContentSection>
  );
}
