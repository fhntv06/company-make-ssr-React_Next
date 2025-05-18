'use client';

import React, { Children, useState } from 'react';
import { Accordion } from '@/shared/ui';

interface Props {
  children: React.ReactNode;
  titles: string[];
  className?: string;
}

export default function AccordionList({ children, titles, className }: Props) {
  const [openedTab, setOpenedTab] = useState<number | null>(null);

  function handleOnClick(index: number) {
    if (openedTab === index) {
      setOpenedTab(null);
    } else {
      setOpenedTab(index);
    }
  }

  return (
    <div className={`col-span-full -mx-grid grid-cols-4 gap-x-4 ${className}`}>
      {Children.map(children, (child, index) => (
        <Accordion
          key={index}
          title={titles[index]}
          isOpened={openedTab === index}
          onClick={() => handleOnClick(index)}
        >
          {child}
        </Accordion>
      ))}
    </div>
  );
}
