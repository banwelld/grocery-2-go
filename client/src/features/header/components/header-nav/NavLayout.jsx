import { toBemClassName } from '../../../../utils/helpers';
import LinkItem from './LinkItem';

export default function NavLayout({ linkConfig, bemBlock }) {
  return (
    <ul className={toBemClassName({ bemBlock, bemElem: 'list' })}>
      {linkConfig.map((link) => (
        <LinkItem
          label={link.label}
          path={link.path}
          bemBlock={bemBlock}
          key={link.path}
        />
      ))}
    </ul>
  );
}
