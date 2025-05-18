'use client';

import { Children, PropsWithChildren, useContext, useState } from 'react';
import clsx from 'clsx';
import TabIndexContext from './tabs-context/TabIndexContext';
import TabsApiContext from './tabs-context/TabsApiContext';

interface Props extends PropsWithChildren {
  className?: string;
  itemClassName?: string;
  row?: boolean;
}

export default function TabList({ row = true, className, itemClassName, children }: Props) {
  const [hoveredItem, setHoveredItem] = useState<number | undefined>(undefined);
  const { activeTab } = useContext(TabsApiContext);

  return (
    <ul
      className={clsx(
        'relative flex pb-[calc(theme(spacing.i16)+theme(spacing.i16))] md:pb-i32',
        `${row ? 'flex-row space-x-6' : 'flex-col'}`,
        className,
      )}
    >
      {Children.map(children, (child, index) => (
        <li
          key={index}
          className={clsx(
            'cursor-pointer transition-all',
            `${hoveredItem === index || activeTab === index ? 'opacity-100' : 'opacity-64'}`,
            { 'opacity-64': hoveredItem !== undefined && hoveredItem !== index },
            itemClassName,
          )}
          onMouseEnter={() => {
            setHoveredItem(index);
          }}
          onMouseLeave={() => {
            setHoveredItem(undefined);
          }}
        >
          <TabIndexContext.Provider value={index}>{child}</TabIndexContext.Provider>
        </li>
      ))}
    </ul>
  );
}
