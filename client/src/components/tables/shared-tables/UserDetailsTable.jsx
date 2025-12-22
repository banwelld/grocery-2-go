// /client/src/components/tables/user-info-table/UserDetailsTable.jsx

import DetailsTable from "../details-table/DetailsTable";
import { tsToDate, formatPhoneString } from "../../../helpers/helpers";

export default function UserDetailsTable({ user }) {
  const userFullName = `${user.fName} ${user.lName}`;
  const formattedPhone = formatPhoneString(user.phone);
  const formattedRegDate = tsToDate(user.registrationTs);

  const userDetails = {
    customer: userFullName,
    phone: formattedPhone,
    email: user.email,
    "joined on": formattedRegDate,
  };

  return <DetailsTable data={userDetails} dataType='user' />;
}
