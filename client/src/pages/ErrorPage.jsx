import { useRouteError } from 'react-router-dom';
import Header from '../features/header/components/Header';
import ContentSection from '../components/ui/frames/ContentSection';
import { Headings } from '../config/constants';

export default function ErrorPage({ heading, uiText }) {
  const error = useRouteError();
  const isRouteError = !!error;

  const displayHeading = heading || error?.statusText || Headings.WHOOPS;
  const displayText = uiText || error?.status || error?.message;

  const content = (
    <ContentSection isRoot heading={displayHeading} uiText={displayText} />
  );

  if (isRouteError)
    return (
      <div className='site-wrapper'>
        <Header />
        {content}
      </div>
    );

  return content;
}
