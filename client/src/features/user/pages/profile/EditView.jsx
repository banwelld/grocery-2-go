// import useViewMode from '../../../../hooks/useViewMode';
// import UserUpdateForm from '../../components/UserUpdateForm';
// import PasswordUpdateForm from '../../components/PasswordUpdateForm';
// import ContentSection from '../../../../components/ui/frames/ContentSection';
// import ClickHere from '../../../../components/ui/ClickHere';

// import { UserUpdateMode as Mode } from '../../../../config/enums';
// import { Headings } from '../../../../config/constants';

// const actionDescription = Object.freeze({
//   [Mode.USER_INFO]: 'update your password',
//   [Mode.PASSWORD]: 'update your user info',
// });

// const SectionHeading = Object.freeze({
//   [Mode.USER_INFO]: Headings.UPDATE_USER_INFO,
//   [Mode.PASSWORD]: Headings.UPDATE_PASSWORD,
// });

// export default function EditView({ user, onSubmit }) {
//   const {
//     currentViewMode,
//     toggleViewMode,
//     isMode1: isInfoMode,
//   } = useViewMode({
//     mode1: Mode.USER_INFO,
//     mode2: Mode.PASSWORD,
//   });

//   return (
//     <ContentSection heading={SectionHeading[currentViewMode]}>
//       {isInfoMode ? (
//         <UserUpdateForm user={user} onSubmit={onSubmit} />
//       ) : (
//         <PasswordUpdateForm onSubmit={onSubmit} />
//       )}
//       <ClickHere
//         actionDescription={actionDescription[currentViewMode]}
//         onClick={toggleViewMode}
//       />
//     </ContentSection>
//   );
// }
