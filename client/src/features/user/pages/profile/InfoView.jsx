// import useUserOrders from '../../../../hooks/useUserOrders';
// import MappedTable from '../../../mapped-table/Components/MappedTable';
// import { Headings } from '../../../../config/constants';
// import ContentSection from '../../../../components/ui/frames/ContentSection';
// import UserDetailsTable from '../../components/UserDetailsTable';
// import tableConfig from './tableConfig';

// export default function InfoView({ user, isCustomer }) {
//   const { orders, ordersLoaded } = useUserOrders();

//   if (!ordersLoaded) return <p>Loading Orders...</p>;

//   const detailsSectionProps = {
//     heading: Headings.USER_INFO,
//     bemMod: 'user-info',
//   };

//   const ordersSectionProps = {
//     heading: Headings.USER_ORDERS,
//     bemMod: 'order-history',
//   };

//   const ordersTableProps = {
//     data: orders,
//     tableConfig,
//     parentBemBlock: 'user-orders',
//   };

//   return (
//     <>
//       <ContentSection {...detailsSectionProps}>
//         <UserDetailsTable user={user} />
//       </ContentSection>
//       {isCustomer && (
//         <ContentSection {...ordersSectionProps}>
//           {orders.length >= 1 ? (
//             <MappedTable {...ordersTableProps} />
//           ) : (
//             <p>You have no orders to display.</p>
//           )}
//         </ContentSection>
//       )}
//     </>
//   );
// }
