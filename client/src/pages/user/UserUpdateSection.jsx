// /client/src/pages/user/UserUpdateSection.jsx

import MainContentSection from "../../components/MainContentSection";
import UserUpdateForm from "./UserUpdateForm";
import { headings as h } from "../../strings";

export default function UserUpdateSection({ user, setUser }) {
  const heading = `Update ${h.USER_INFO}`;
  return (
    <MainContentSection heading={heading} headingLevel={2} bemMod='update-user'>
      <UserUpdateForm user={user} setUser={setUser} />
    </MainContentSection>
  );
}
