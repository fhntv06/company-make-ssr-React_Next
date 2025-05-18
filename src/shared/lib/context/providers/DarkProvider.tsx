'use client';

import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import DarkContext from '../dark-context';
import { darkPages } from '../../constants';

export default function DarkProvider({ children }: PropsWithChildren) {
  const [dark, setDark] = useState<boolean>(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    if (pathname && darkPages.includes(pathname)) {
      setDark(true);
      document.body.classList.add('dark');
    } else {
      setDark(false);
      document.body.classList.remove('dark');
    }
  }, [pathname]);

  return <DarkContext.Provider value={dark}>{children}</DarkContext.Provider>;
}
