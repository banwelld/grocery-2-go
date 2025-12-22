// /client/src/pages/user/UserUpdateForm.jsx

import SubmissionForm from "../../components/forms/SubmissionForm";
import { postData } from "../../helpers/helpers";
import { userUpdateSchema } from "../../form-schemas/user/userUpdateSchema";
import "../../css/forms.css";

export default function UserUpdateForm({ user, setUser }) {
  const { id, email, fName, lName, phone } = user;

  const onSubmit = (data, { setSubmitting, setStatus }) => {
    postData(`/users/${id}`, data)
      .then((res) => {
        setUser(res);
        console.log("User update successful: ", res);
        setStatus({ success: true });
      })
      .catch((error) => {
        console.error("User update failed: ", error);
        setStatus({ error: error.message || "Update failed" });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const prefilledSchema = {
    ...userUpdateSchema,
    inputs: {
      ...userUpdateSchema.inputs,
      email: { ...userUpdateSchema.inputs.email, initial: email },
      f_name: { ...userUpdateSchema.inputs.f_name, initial: fName },
      l_name: { ...userUpdateSchema.inputs.l_name, initial: lName },
      phone: { ...userUpdateSchema.inputs.phone, initial: phone },
    },
  };

  return (
    <SubmissionForm
      formSchema={prefilledSchema}
      onSubmit={onSubmit}
      formBlockModifier='user-update'
    />
  );
}
