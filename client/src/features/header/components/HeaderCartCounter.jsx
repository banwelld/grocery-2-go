import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../config/routePaths';

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

  // data-count attribute holds the count value for the ::after pseudo element
  return (
    <div
      className={toBemClassName({
        bemBlock,
        bemElem: 'section',
        bemMod: 'tally',
      })}
    >
      <Link to={ROUTE_PATHS.CART}>
        <div className={toBemClassName(containerBemProps)} data-count={itemCount}>
          <SvgIcon path={SvgPath['CART_ICON']} />
        </div>
      </Link>
    </div>
  );
}
