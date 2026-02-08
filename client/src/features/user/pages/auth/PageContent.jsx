import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm';
import ContentSection from '../../../../components/ui/frames/ContentSection';

import { AuthViewMode as Mode } from '../../../../config/enums';
import { Headings, UiText } from '../../../../config/constants';

export default function PageContent({ onSubmit, currentViewMode, bemBlock }) {
  const sectionProps = {
    isRoot: true,
    hasPageHeading: true,
    heading: Headings[currentViewMode],
    uiText: UiText[currentViewMode],
  };

  return (
    <ContentSection {...sectionProps}>
      {currentViewMode === Mode.LOGIN ? (
        <LoginForm bemBlock={bemBlock} onSubmit={onSubmit} />
      ) : (
        <RegistrationForm bemBlock={bemBlock} onSubmit={onSubmit} />
      )}
    </ContentSection>
  );
}
