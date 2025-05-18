import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
  withoutNegativeMargins?: boolean;
}

export default function Table({ className, withoutNegativeMargins = false, children }: Props) {
  return <div className={clsx('col-span-full', { '-mx-grid': !withoutNegativeMargins }, className)}>{children}</div>;
}
