// /client/src/pages/user-auth/MainContent.jsx

import ContentSection from "../../components/section-frames/ContentSection";
import SubmissionForm from "../../components/forms/submission-form/SubmissionForm";
import ErrorPage from "../ErrorPage";
import registrationSettings from "../../form-schemas/registrationFormSettings";
import loginSettings from "../../form-schemas/loginFormSettings";
import { headings, uiText } from "../../strings";


export default function MainContent({ login, register, paramView, View, isLoggedIn }) {
    if (isLoggedIn) {
        return (
            <ErrorPage
                heading={headings.WHOOPS}
                uiText={uiText.ALREADY_LOGGED_IN}
            />
        );
    }

    const settings = {
        [View.LOGIN]: loginSettings,
        [View.REGISTER]: registrationSettings,
    };

    const submit = {
        [View.LOGIN]: login,
        [View.REGISTER]: register,
    }

    const formProps = {
        ...settings[paramView],
        onSubmit: (formData) => submit[paramView](formData),
    };

    return (
        <ContentSection isTopLevel heading={headings[paramView]} uiText={uiText[paramView]}>
            <SubmissionForm {...formProps} />
        </ContentSection>
    );
}