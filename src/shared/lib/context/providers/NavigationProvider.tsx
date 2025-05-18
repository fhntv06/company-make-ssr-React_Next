'use client';

import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import NavigationContext from '../navigation-context';

export default function NavigationProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const previosPathname = useRef(pathname);
  const [navigationViaClick, setNavigationViaClick] = useState(false);
  const [applyUrlChangeDelay, setApplyUrlChangeDelay] = useState(false);

  useEffect(() => {
    setNavigationViaClick(previosPathname.current !== pathname);

    if (previosPathname.current !== pathname) {
      previosPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider
      value={{
        navigationViaClick,
        applyUrlChangeDelay,
        setApplyUrlChangeDelay,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
