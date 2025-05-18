import React, { PropsWithChildren, useContext } from 'react';
import TabIndexContext from './tabs-context/TabIndexContext';
import TabsApiContext from './tabs-context/TabsApiContext';

interface Props extends PropsWithChildren {
  className?: string;
}

export default function TabPanel({ className = '', children }: Props) {
  const index = useContext(TabIndexContext);
  const { activeTab } = useContext(TabsApiContext);

  return <>{index === activeTab && <div className={className}>{children}</div>}</>;
}
