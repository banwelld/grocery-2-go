// /client/src/pages/user/MainContent.jsx

import ContentSection from "../../components/section-frames/ContentSection";
import UserInfoAndOrders from "./UserInfoAndOrders";
import UpdateUser from "./UpdateUser";
import { headings, uiText } from "../../strings";

export default function MainContent({ user, updateUser, isReadView }) {
  return (
    <ContentSection isTopLevel heading={headings.USER} uiText={uiText.USER}>
      {isReadView ? (
        <UserInfoAndOrders user={user} />
      ) : (
        <UpdateUser user={user} updateUser={updateUser} />
      )}
    </ContentSection>
  );
}
