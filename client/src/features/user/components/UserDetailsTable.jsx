import { useMemo } from 'react';
import DetailsTable from '../../../components/ui/tables/details-table/DetailsTable';
import { UserRole as Role } from '../../../config/enums';
import { formatDateIso, formatPhone } from '../../../utils/helpers';

const RoleDesc = Object.freeze({
  [Role.ADMIN]: 'Product Administrator',
  [Role.CUSTOMER]: 'Preferred Customer',
});

export default function UserDetailsTable({ user }) {
  const { nameFirst, nameLast, role, phone, email, createdAt } = user;

  const userDetails = useMemo(() => {
    return {
      member: `${nameFirst} ${nameLast}`,
      membership: RoleDesc[role],
      phone: formatPhone(phone),
      email,
      'joined on': formatDateIso(createdAt),
    };
  }, [nameFirst, nameLast, role, email, phone, createdAt]);

  return <DetailsTable data={userDetails} dataType='user' />;
}
