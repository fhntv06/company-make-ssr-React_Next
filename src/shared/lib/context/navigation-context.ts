import React, { createContext } from 'react';

const NavigationContext = createContext<{
  navigationViaClick: boolean;
  applyUrlChangeDelay: boolean;
  setApplyUrlChangeDelay: React.Dispatch<React.SetStateAction<boolean>>;
}>({ navigationViaClick: false, applyUrlChangeDelay: false, setApplyUrlChangeDelay: () => {} });

export default NavigationContext;
