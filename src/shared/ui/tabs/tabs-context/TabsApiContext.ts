'use client';

import { Dispatch, SetStateAction, createContext } from 'react';

export default createContext<{
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>> | ((index: number) => void);
}>({
  activeTab: 0,
  setActiveTab: () => {},
});
