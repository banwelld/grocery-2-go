// /client/src/pages/user-auth/UserAuthForm.jsx

import { useContext } from "react";
import { UserContext } from "../../contexts/contexts";
import SubmissionForm from "../../components/forms/SubmissionForm";
import { registerSchema } from "../../form-schemas/user/registerSchema";
import { loginSchema } from "../../form-schemas/user/loginSchema";
import { postData } from "../../helpers/helpers";

export default function UserAuthForm({ paramView }) {
  const { onLogin } = useContext(UserContext);

  const loginUser = (formData) => {
    postData("/session", formData)
      .then((data) => onLogin(data))
      .catch((err) => console.error("Login failed: ", err));
  };

  const registerUser = (formData) => {
    postData("/users", formData)
      .then(() => postData("/session", formData))
      .then((data) => onLogin(data))
      .catch((err) => console.error("Registration failed: ", err));
  };

  const viewConfig = {
    login: { schema: loginSchema, onSubmit: loginUser, bemMod: "login" },
    register: {
      schema: registerSchema,
      onSubmit: registerUser,
      bemMod: "registration",
    },
  };

  const formSchema = viewConfig[paramView].schema;
  const onSubmit = viewConfig[paramView].onSubmit;
  const blockModifier = viewConfig[paramView].bemMod;

  return (
    <SubmissionForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      formBlockModifier={blockModifier}
    />
  );
}
