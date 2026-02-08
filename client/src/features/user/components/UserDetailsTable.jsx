import { useMemo } from 'react';
import { toDateIso, toPhoneNumFormat } from '../../../utils/helpers';
import DetailsTable from '../../../components/ui/tables/details-table/DetailsTable';

export default function UserDetailsTable({ user }) {
  const userDetails = useMemo(() => {
    if (!user) return null;

    const { nameFirst, nameLast, phone, email, createdAt } = user;

    return {
      customer: `${nameFirst} ${nameLast}`,
      phone: toPhoneNumFormat(phone),
      email,
      'joined on': toDateIso(createdAt),
    };
  }, [user]);

  if (!user) return <p>Loading user info...</p>;

  return <DetailsTable data={userDetails} dataType='user' />;
}
