import ContentSection from '../../../../components/ui/frames/ContentSection';

import { Headings, UiText } from '../../../../config/constants';

export default function PageContent({
  contentElements,
  isReadMode,
  isCustomer,
  editSectionHeading,
}) {
  const {
    userDetailsTable,
    userOrdersTable,
    updateForm,
    infoPasswordClickHere,
  } = contentElements;

  const rootSectionProps = {
    heading: Headings.USER_PROFILE,
    uiText: isReadMode && isCustomer ? UiText.USER_PROFILE : null,
  };

  const detailsSectionProps = {
    heading: Headings.USER_INFO,
    bemMod: 'user-info',
  };

  const ordersSectionProps = {
    heading: Headings.USER_ORDERS,
    bemMod: 'order-history',
  };

  return (
    <ContentSection isRoot hasPageHeading {...rootSectionProps}>
      {isReadMode ? (
        <>
          <ContentSection {...detailsSectionProps}>
            {userDetailsTable}
          </ContentSection>
          {isCustomer && (
            <ContentSection {...ordersSectionProps}>
              {userOrdersTable}
            </ContentSection>
          )}
        </>
      ) : (
        <ContentSection heading={editSectionHeading}>
          {updateForm}
          {infoPasswordClickHere}
        </ContentSection>
      )}
    </ContentSection>
  );
}
