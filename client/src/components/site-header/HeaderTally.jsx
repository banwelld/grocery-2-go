// /client/src/components/site-header/HeaderTally.jsx

import { Link } from "react-router-dom";
import useBasket from "../../hooks/useBasket";
import clsx from "clsx";
import "./header-tally.css";

export default function HeaderTally({ bemBlock }) {
  const { itemCount } = useBasket();
  const isVisible = !!itemCount;

  const className = clsx("tally__container", { "tally__container--hidden": !isVisible });

  // data-count attribute holds the count value for the ::after pseudoelement
  return (
    <div className={`${bemBlock}__tally`}>
      <Link to={"/my-basket"}>
        <div className={className} data-count={itemCount}>
          <img src='../../images/basket-yellow-lg.svg' alt='shopping basket' />
        </div>
      </Link>
    </div>
  );
}
