// /client/src/pages/checkout/UserInfoDisplay.jsx

import { useContext } from "react";
import { UserContext } from "../../../contexts/contexts";
import { Link } from "react-router-dom";
import UserDetailsTable from "../../../components/tables/shared-tables/UserDetailsTable";

export default function UserInfoDisplay() {
  const { user } = useContext(UserContext);
  const userPagePath = `/users/${user.id}`;

  return (
    <div className='table--user-details'>
      <UserDetailsTable user={user} />
      <Link to={userPagePath}>Click to update customer info</Link>
    </div>
  );
}
