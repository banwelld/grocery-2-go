import { Headings, UiText } from '../../../../config/constants';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import EditView from './EditView';
import InfoView from './InfoView';

export default function PageContent({
  user,
  updateUser,
  toggleViewMode,
  isReadMode,
  isCustomer,
}) {
  const sectionProps = {
    heading: Headings.USER_PROFILE,
    uiText: isReadMode && isCustomer ? UiText.USER_PROFILE : null,
  };

  const infoViewProps = {
    user,
    toggleViewMode,
    isCustomer,
  };

  const editViewProps = {
    user,
    onSubmit: (data) => updateUser(data).then(toggleViewMode),
  };

  return (
    <ContentSection isRoot hasPageHeading {...sectionProps}>
      {isReadMode ? (
        <InfoView {...infoViewProps} />
      ) : (
        <EditView {...editViewProps} />
      )}
    </ContentSection>
  );
}
