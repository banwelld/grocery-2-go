import { Link } from 'react-router-dom';
import { toBemClassName } from '../../../utils/helpers';
import SvgIcon from '../../../components/ui/svg-icon/SvgIcon';
import { SvgPath } from '../../../components/ui/svg-icon/constants';
import useCart from '../../../hooks/useCart';
import './HeaderCartCounter.css';

export default function HeaderCartCounter({ bemBlock }) {
  const {
    cartDetails: { orderItemCount },
  } = useCart();
  const isVisible = !!orderItemCount;

  const containerBemProps = {
    bemBlock,
    bemElem: 'container',
    bemMod: 'tally',
    bemMod2: 'hidden',
    showMod2: !isVisible,
  };

  // data-count attribute holds the count value for the ::after pseudoelement
  return (
    <div
      className={toBemClassName({
        bemBlock,
        bemElem: 'section',
        bemMod: 'tally',
      })}
    >
      <Link to={'/my-cart'}>
        <div
          className={toBemClassName(containerBemProps)}
          data-count={orderItemCount}
        >
          <SvgIcon path={SvgPath['CART_ICON']} />
        </div>
      </Link>
    </div>
  );
}
