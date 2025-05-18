import React, { Children, PropsWithChildren } from 'react';
import TabIndexContext from './tabs-context/TabIndexContext';

export default function TabPanels({ children }: PropsWithChildren) {
  return (
    <>
      {Children.map(children, (child, index) => (
        <TabIndexContext.Provider value={index}>{child}</TabIndexContext.Provider>
      ))}
    </>
  );
}
