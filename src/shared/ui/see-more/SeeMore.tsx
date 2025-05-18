import { Button, Cord } from '@/shared/ui';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title?: string;
  buttonTitle?: string;
  className?: string;
}

export default function SeeMore({ children, title = 'смотрите также', buttonTitle, className }: Props) {
  return (
    <div className={clsx('col-span-full grid-subcontainer', className)}>
      <h2 className='col-span-full font-medium'>{title}</h2>
      <Cord className='col-span-full -mx-grid my-[calc(theme(spacing.i16)+theme(spacing.i16))]' />
      {children}
      {buttonTitle && (
        <div className='col-span-full mb-i168 mt-i120 flex md:justify-center'>
          <Button iconRight='arrow-right' className='w-full md:w-auto' theme='gray'>
            {buttonTitle}
          </Button>
        </div>
      )}
    </div>
  );
}
