// /client/src/pages/user/UserUpdateForm.jsx

import { useMemo } from "react";
import SubmissionForm from "./submission-form/SubmissionForm";
import userFormSettings from "../../pages/user/userFormSettings";
import { Key } from "./enums";

export default function UserUpdateForm({ user, updateUser, viewUserInfo = null }) {
  const { email, fName, lName, phone } = user;

  const settings = useMemo(() => {
    return {
      ...userFormSettings,
      initialValues: {
        ...userFormSettings.initialValues,
        [Key.EMAIL]: email,
        [Key.NAME_FIRST]: fName,
        [Key.NAME_LAST]: lName,
        [Key.PHONE]: phone,
      },
    };
  }, [email, fName, lName, phone]);

  const onSubmit = (data) =>
    updateUser(data)
      .finally(() => !!viewUserInfo && viewUserInfo());

  const formProps = { onSubmit, ...settings };

  return <SubmissionForm {...formProps} />
}
