// /client/src/pages/checkout/UserInfoView.jsx

import { useState } from "react";
import useUser from "../../../hooks/useUser";
import ContentSection from "../../../components/section-frames/ContentSection";
import ConfirmationCheck from "./confirm-user-info/ConfirmationCheck";
import UserInfo from "./confirm-user-info/UserInfo";
import UserUpdateForm from "../../../components/forms/UserUpdateForm";
import { headings } from "../../../strings";

const View = Object.freeze({
  READ_VIEW: "read-view",
  EDIT_VIEW: "edit-view",
})

export default function UserInfoView({ children, ...stepProps }) {
  const { user, userActions: { updateUser } } = useUser();
  const [viewMode, setViewMode] = useState(View.READ_VIEW)

  const isViewMode = viewMode === View.READ_VIEW

  if (!user) return <p>Loading user info...</p>;

  const toEditMode = () => setViewMode(View.EDIT_VIEW)
  const toViewMode = () => setViewMode(View.READ_VIEW)

  const bemRoot = {
    bemBlock: "checkout",
    bemMod: "user-info"
  }

  const sectionProps = {
    heading: headings.USER_INFO,
    headingLevel: 2,
    bemMod: "user-info",
  }

  const userInfoProps = {
    user,
    toEditMode,
    bemRoot
  }

  const updateFormProps = {
    user,
    updateUser,
    viewUserInfo: toViewMode,
  }

  return (
    <ContentSection {...sectionProps}>
      {isViewMode ? (
        <>
          <UserInfo {...userInfoProps} />
          <ConfirmationCheck {...{ ...stepProps, bemRoot }} />
          {children}
        </>
      ) : (
        <UserUpdateForm {...updateFormProps} />
      )}
    </ContentSection>
  );
}
