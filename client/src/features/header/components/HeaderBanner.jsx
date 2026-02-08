import { Link } from 'react-router-dom';
import { toBemClassName } from '../../../utils/helpers';
import logo from '../assets/grocery2go-logo.webp';

export default function HeaderBanner({ bemBlock }) {
  return (
    <div
      className={toBemClassName({
        bemBlock,
        bemElem: 'section',
        bemMod: 'banner',
      })}
    >
      <Link to={'/'} aria-label='Grocery2Go homepage'>
        <div
          className={toBemClassName({
            bemBlock,
            bemElem: 'container',
            bemMod: 'banner',
          })}
        >
          <img src={logo} alt='Grocery2Go' />
        </div>
      </Link>
    </div>
  );
}
