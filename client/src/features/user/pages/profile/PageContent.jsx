import { useSearchParams } from 'react-router-dom';

import useViewMode from '../../../../hooks/useViewMode';

import { Headings, UiText } from '../../../../config/constants';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import EditView from './EditView';
import InfoView from './InfoView';

export default function PageContent({ user, updateUser, onLoadOrders }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { toggleViewMode, isMode1: isReadMode } = useViewMode({
    state: searchParams,
    setState: setSearchParams,
    paramName: 'view',
  });

  const sectionProps = {
    heading: Headings.USER,
    uiText: isReadMode ? UiText.USER : null,
  };

  const infoViewProps = {
    user,
    onLoadOrders,
    toggleViewMode,
  };

  const editViewProps = {
    user,
    onSubmit: () => {
      return updateUser.then(toggleViewMode);
    },
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
