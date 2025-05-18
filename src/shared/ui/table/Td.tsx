import clsx from 'clsx';
import React, { MouseEventHandler, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: MouseEventHandler;
}

export default function Td({ className, onClick, children }: Props) {
  return (
    <div className={clsx(className)} onClick={onClick} role='presentation'>
      {children}
    </div>
  );
}
