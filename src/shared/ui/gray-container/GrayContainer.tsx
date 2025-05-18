import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  withoutSpacing?: boolean;
  className?: string;
}

export default function GrayContainer({ className, withoutSpacing, children }: Props) {
  return (
    <div className='col-span-full -mx-4 border-t border-black bg-black/[6%] md:-mx-6'>
      <div className={clsx('grid w-full grid-cols-4 lg:grid-cols-8', { 'px-4 md:px-6': !withoutSpacing }, className)}>
        {children}
      </div>
    </div>
  );
}
