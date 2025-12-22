// /client/src/pages/user-auth/MainContent.jsx

import MainContentSection from "../../components/MainContentSection";
import UserAuthForm from "./UserAuthForm";
import { paragraphsFromArray } from "../../helpers/helpers";
import { headings as h, sectionText as st } from "../../strings";

export default function MainContent({ paramView }) {
  const viewConfig = {
    login: {
      heading: h.LOGIN,
      text: st.LOGIN,
    },
    register: {
      heading: h.REGISTER,
      text: st.REGISTER,
    },
  };

  const pageHeading = viewConfig[paramView].heading;
  const uiText = paragraphsFromArray(viewConfig[paramView].text);

  return (
    <MainContentSection heading={pageHeading} uiText={uiText}>
      <UserAuthForm paramView={paramView} />
    </MainContentSection>
  );
}
