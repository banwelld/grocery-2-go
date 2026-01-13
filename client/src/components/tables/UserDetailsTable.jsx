// /client/src/components/tables/user-info-table/UserDetailsTable.jsx

import { useMemo } from "react";
import DetailsTable from "./details-table/DetailsTable";
import { tsToDate, formatPhoneString } from "../../helpers/helpers";

export default function UserDetailsTable({ user }) {
  const userDetails = useMemo(() => {
    if (!user) return null;

    const { fName, lName, phone, email, registrationTs } = user;

    return {
      customer: `${fName} ${lName}`,
      phone: formatPhoneString(phone),
      email,
      "joined on": tsToDate(registrationTs),
    };
  }, [user]);

  if (!user) return <p>Loading user info...</p>;

  return <DetailsTable data={userDetails} dataType='user' />;
}
