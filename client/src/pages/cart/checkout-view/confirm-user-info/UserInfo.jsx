// /client/src/pages/checkout/UserInfo.jsx

import UserDetailsTable from "../../../../components/tables/UserDetailsTable";
import Button from "../../../../components/ui/Button";
import { toClassName } from "../../../../helpers/helpers";

export default function UserInfo({ user, toEditMode, bemRoot }) {
  const buttonProps = {
    label: "Click here ",
    onClick: toEditMode,
    className: toClassName({ ...bemRoot, bemElem: "button" })
  }
  return (
    <>
      <UserDetailsTable user={user} />
      <Button displayAsText {...buttonProps} />to edit your info.
    </>
  );
}
