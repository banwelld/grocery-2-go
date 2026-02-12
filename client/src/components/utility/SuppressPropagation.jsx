import { toBemClassName } from '../../utils/helpers';

export default function SuppressPropagation({ bemMod = null, children }) {
  const preventLink = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className={toBemClassName({ bemBlock: 'propagation-suppressor', bemMod })}
      onClick={preventLink}
    >
      {children}
    </div>
  );
}
