// /client/src/components/site-header/UserAuth.jsx

import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import Button from "../ui/Button";
import { modalText as mt } from "../../strings";

export default function UserAuth({ fName, logout, bemBlock }) {
  const navigate = useNavigate();
  const { openModal, resetModal } = useModal();

  const isGuest = fName === "Guest";

  const logoutModalPayload = {
    uiText: mt.LOGOUT_MODAL,
    proceedLabel: "Yes",
    closeLabel: "No",
    proceed: logout,
    onClose: resetModal,
  };

  const Login = (
    <Button
      label="Login"
      onClick={() => navigate("/user-auth")}
      displayAsText
      bemMod="user-auth"
    />
  )

  const Register = (
    <Button
      label="Register"
      onClick={() => navigate("/user-auth?view=REGISTER")}
      displayAsText
      bemMod="user-auth"
    />
  )

  const Logout = (
    <Button
      label="Logout"
      onClick={() => openModal(logoutModalPayload)}
      displayAsText
      bemMod="user-auth"
    />
  )

  return (
    <div className={`${bemBlock}__section--user-auth`}>
      <p className='user-auth__welcome'>
        Welcome {fName}!{" "}
        {isGuest && <span>{Login} or {Register} to start shopping.</span>}
        {!isGuest && Logout}
      </p>
    </div>
  );
}

