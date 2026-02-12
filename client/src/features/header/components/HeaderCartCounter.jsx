import { Link } from 'react-router-dom';

import SvgIcon from '../../../components/ui/svg-icon/SvgIcon';

import { SvgPath } from '../../../components/ui/svg-icon/constants';
import { toBemClassName } from '../../../utils/helpers';
import './HeaderCartCounter.css';

export default function HeaderCartCounter({ itemCount, bemBlock }) {
  const containerBemProps = {
    bemBlock,
    bemElem: 'container',
    bemMod: 'tally',
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
          data-count={itemCount}
        >
          <SvgIcon path={SvgPath['CART_ICON']} />
        </div>
      </Link>
    </div>
  );
}
