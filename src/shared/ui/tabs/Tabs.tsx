'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import TabsApiContext from './tabs-context/TabsApiContext';

interface Props extends PropsWithChildren {
  defaultTabIndex?: number;
}

export default function Tabs({ defaultTabIndex = 0, children }: Props) {
  const [activeTab, setActiveTab] = useState<number>(defaultTabIndex);

  useEffect(() => {
    setActiveTab(defaultTabIndex);
  }, [defaultTabIndex]);

  const contextApi = {
    activeTab,
    setActiveTab,
  };

  return <TabsApiContext.Provider value={contextApi}>{children}</TabsApiContext.Provider>;
}
