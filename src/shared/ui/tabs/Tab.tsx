import { PropsWithChildren, useContext } from 'react';
import TabIndexContext from './tabs-context/TabIndexContext';
import TabsApiContext from './tabs-context/TabsApiContext';

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: (() => void) | null;
}

export default function Tab({ className, onClick, children }: Props) {
  const { setActiveTab } = useContext(TabsApiContext);
  const index = useContext(TabIndexContext);

  const switchTabHandler = () => {
    setActiveTab(index);

    if (onClick) onClick();
  };

  return (
    <button className={`${className} base-link`} onClick={switchTabHandler}>
      {children}
    </button>
  );
}
