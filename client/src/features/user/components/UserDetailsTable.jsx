import { useMemo } from 'react';
import { toDateIso, toPhoneNumFormat } from '../../../utils/helpers';
import DetailsTable from '../../../components/ui/tables/details-table/DetailsTable';
import { UserRole as Role } from '../../../config/enums';

const RoleDesc = Object.freeze({
  [Role.ADMIN]: 'Product Administrator',
  [Role.CUSTOMER]: 'Preferred Customer',
});

export default function UserDetailsTable({ user }) {
  const userDetails = useMemo(() => {
    if (!user) return null;

    const { nameFirst, nameLast, role, phone, email, createdAt } = user;

    return {
      member: `${nameFirst} ${nameLast}`,
      membership: RoleDesc[role],
      phone: toPhoneNumFormat(phone),
      email,
      'joined on': toDateIso(createdAt),
    };
  }, [user]);

  if (!user) return <p>Loading user info...</p>;

  return <DetailsTable data={userDetails} dataType='user' />;
}
