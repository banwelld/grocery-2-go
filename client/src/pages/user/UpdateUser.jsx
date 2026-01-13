// /client/src/pages/user/UpdateUser.jsx

import ContentSection from "../../components/section-frames/ContentSection";
import UserUpdateForm from "../../components/forms/UserUpdateForm";
import { headings as h } from "../../strings";

export default function UpdateUser({ user, updateUser }) {
  const sectionProps = {
    heading: `Update ${h.USER_INFO}`,
    headingLevel: 2,
    bemMod: "update-user"
  };

  return (
    <ContentSection {...sectionProps}>
      <UserUpdateForm user={user} updateUser={updateUser} />
    </ContentSection>
  );
}
