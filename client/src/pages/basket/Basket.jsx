// Basket.jsx

import { useState, useContext } from "react";
import { UserContext } from "../../contexts/contexts";
import useBasket from "../../hooks/useBasket";
import SplitPageWrapper from "../../components/SplitPageWrapper";
import OptionsSidebar, { SidebarBtn } from "../../components/OptionsSidebar";
import HeadingGroup from "../../components/HeadingGroup";
import ProductTable from "../../components/order-info/ProductTable";
import SubmissionForm from "../../components/order-info/SubmissionForm";
import InfoTable from "../../components/InfoTable";
import { toParagraphs, userToTableData } from "../../helpers/helpers";
import msg from "../../page-text.json";

export default function Basket() {
  const [isProductView, setIsProductView] = useState(true);
  const { basketEmpty, onCheckoutClick, basketProducts, basketQuantity, basketTotal } =
    useBasket();
  const { user } = useContext(UserContext);

  const headingText = "My Shopping Basket";

  if (basketEmpty) {
    return (
      <SplitPageWrapper className='basket-info'>
        <OptionsSidebar pageSubject='shopping basket' />
        <HeadingGroup>
          {headingText}
          <p>Your basket is empty.</p>
        </HeadingGroup>
      </SplitPageWrapper>
    );
  }

  console.log(user);

  const message = isProductView
    ? toParagraphs(msg.CART_INFO)
    : toParagraphs(msg.SUBMISSION_FORM);

  const toggleView = () => setIsProductView((prev) => !prev);

  const labels = { true: "Submit Order", false: "View Shopping Basket" };
  const label = labels[isProductView];

  return (
    <SplitPageWrapper className='basket-info'>
      <OptionsSidebar pageSubject='basket'>
        <SidebarBtn onClick={toggleView} label={label} />
      </OptionsSidebar>
      <>
        <HeadingGroup>
          {headingText}
          {message}
        </HeadingGroup>
        {isProductView ? (
          <ProductTable
            orderProducts={basketProducts}
            quantity={basketQuantity}
            total={basketTotal}
            isBasket={true}
          />
        ) : (
          <section className='order-submission'>
            <section className='user-info'>
              <HeadingGroup level={2}>Customer Details</HeadingGroup>
              <InfoTable data={user} normalizer={userToTableData} />
            </section>
            <section className='submission-form'>
              <HeadingGroup level={2}>Deliver To</HeadingGroup>
              <SubmissionForm onCheckoutClick={onCheckoutClick} />
            </section>
          </section>
        )}
      </>
    </SplitPageWrapper>
  );
}
