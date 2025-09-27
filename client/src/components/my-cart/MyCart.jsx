// MyCart.jsx

import React, { useState } from "react";
import SplitPageWrapper from "../info-page/SplitPageWrapper";
import MyCartSidebar from "./MyCartSidebar";
import MyCatGrid from "./MyCartGrid";
import MyCartSubmit from "./MyCartSubmit";
import CartMgmtWrapper from "../cart-management/CartMgmtWrapper";
import "../../css/my-cart.css";

export default function MyCart() {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <SplitPageWrapper className='my-cart-wrapper'>
      <MyCartSidebar formVisible={formVisible} setFormVisible={setFormVisible} />
      {/* inject cart management function into grid and submition form */}
      <CartMgmtWrapper>
        <MyCatGrid formVisible={formVisible} />
        <MyCartSubmit formVisible={formVisible} />
      </CartMgmtWrapper>
    </SplitPageWrapper>
  );
}
