// ShowUser.jsx

import { useState, useContext } from "react";
import { UserContext } from "../contexts/contexts";
import SplitPageWrapper from "../components/SplitPageWrapper";
import OptionsSidebar, { SidebarBtn } from "../components/OptionsSidebar";
import HeadingGroup from "../components/HeadingGroup";
import InfoTable from "./InfoTable";
import { toParagraphs, userToTableData, toTitleCase } from "../helpers/helpers";
import msg from "../page-text.json";

export default function ShowUser() {
  const { user } = useContext(UserContext);
  const [isInfoView, setIsInfoView] = useState(true);

  const userType = user.role;

  const headingText = `${toTitleCase(userType)} Profile`;
  const message = toParagraphs(msg.LOGIN);

  const secondaryHeadingText = `${toTitleCase(userType)} Details`;

  const onClick = () => setIsInfoView((prev) => !prev);
  const btnLabel = isInfoView ? "Update Info" : "View Profile";

  return (
    <SplitPageWrapper className='basket-info'>
      <OptionsSidebar pageSubject='Profile'>
        <SidebarBtn onClick={onClick} label={btnLabel} />
      </OptionsSidebar>

      <>
        <HeadingGroup>
          {headingText}
          {message}
        </HeadingGroup>
        {isInfoView ? (
          <section className='user-details'>
            <HeadingGroup level={2}>{secondaryHeadingText}</HeadingGroup>
            <InfoTable data={user} normalizer={userToTableData} />
          </section>
        ) : (
          <section className='update-user-info'>
            <HeadingGroup level={2}>{`Update ${secondaryHeadingText}`}</HeadingGroup>
            <InfoTable data={user} normalizer={userToTableData} />
          </section>
        )}
      </>
    </SplitPageWrapper>
  );
}
