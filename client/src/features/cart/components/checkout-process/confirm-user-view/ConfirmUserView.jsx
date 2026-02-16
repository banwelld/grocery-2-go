import useViewMode, {
  VIEW_MODES as MODE,
} from '../../../../../hooks/useViewMode';
import { Headings } from '../../../../../config/constants';
import ConfirmationCheck from './ConfirmationCheck';
import ContentSection from '../../../../../components/ui/frames/ContentSection';
import UserDetailsTable from '../../../../user/components/UserDetailsTable';
import UserUpdateForm from '../../../../user/components/UserUpdateForm';
import ClickHere from '../../../../../components/ui/ClickHere';
import useUser from '../../../../user/hooks/useUser';

const actionDescription = Object.freeze({
  [MODE.READ]: 'edit your info',
  [MODE.EDIT]: 'exit edit mode wtihout saving',
});

export default function ConfirmUserView({ children, ...stepProps }) {
  const { toggleViewMode, isMode1: isReadMode } = useViewMode();
  const { user, userActions } = useUser();

  if (!user) return <p>Loading user info...</p>;

  const bemRoot = {
    bemBlock: 'checkout',
    bemMod: 'confirm-user',
  };

  const sectionProps = {
    heading: Headings.USER_INFO,
    bemMod: 'confirm-user',
  };

  const updateFormProps = {
    user,
    onSubmit: (data) => {
      userActions.updateUser(data);
      toggleViewMode();
    },
  };

  return (
    <ContentSection {...sectionProps}>
      {isReadMode ? (
        <>
          <UserDetailsTable user={user} />
          <ClickHere
            actionDescription={actionDescription[MODE.READ]}
            onClick={toggleViewMode}
          />
          <ConfirmationCheck {...{ ...stepProps, bemRoot }} />
        </>
      ) : (
        <>
          <UserUpdateForm {...updateFormProps} />
          <ClickHere
            actionDescription={actionDescription[MODE.EDIT]}
            onClick={toggleViewMode}
          />
        </>
      )}
      {children}
    </ContentSection>
  );
}
