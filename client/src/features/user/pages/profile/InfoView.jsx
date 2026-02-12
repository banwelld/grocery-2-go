import { Headings } from '../../../../config/constants';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import UserDetailsTable from '../../components/UserDetailsTable';
import OrderHistory from './OrderHistory';

export default function InfoView({ user, isCustomer }) {
  const detailsSectionProps = {
    heading: Headings.USER_INFO,
    bemMod: 'user-info',
  };

  return (
    <>
      <ContentSection {...detailsSectionProps}>
        <UserDetailsTable user={user} />
      </ContentSection>
      {isCustomer && <OrderHistory />}
    </>
  );
}
