import ContentSection from '../../../../components/ui/frames/ContentSection';
import { Headings, UiText } from '../../../../config/constants';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm';
import { AUTH_VIEW } from './Auth';

export default function PageContent({ onSubmit, currentViewMode, bemBlock }) {
  const sectionProps = {
    isRoot: true,
    hasPageHeading: true,
    heading: Headings[currentViewMode],
    uiText: UiText[currentViewMode],
  };

  return (
    <ContentSection {...sectionProps}>
      {currentViewMode === AUTH_VIEW.LOGIN ? (
        <LoginForm bemBlock={bemBlock} onSubmit={onSubmit} />
      ) : (
        <RegistrationForm bemBlock={bemBlock} onSubmit={onSubmit} />
      )}
    </ContentSection>
  );
}
