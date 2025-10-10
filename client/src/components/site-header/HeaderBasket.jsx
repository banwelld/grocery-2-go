// HeaderBasket.jsx

import { Link } from "react-router-dom";
import useBasket from "../../hooks/useBasket";

export default function HeaderBasket() {
  const { basketQuantity } = useBasket();

  if (!basketQuantity) return null;

  // data-count attribute holds the count value for the ::after pseudoelement
  return (
    <div className='header-basket'>
      <Link to={"/my-basket"}>
        <div className='count-wrapper' data-count={basketQuantity}>
          <img src='../../images/shopping-basket-yellow.svg' alt='shopping basket' />
        </div>
      </Link>
    </div>
  );
}
