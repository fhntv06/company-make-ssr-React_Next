import { FunctionComponentElement } from 'react';
import { type Client } from '@/shared/lib/types';
import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  data: Client;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Client({ data, size = 'small', className }: Props): FunctionComponentElement<Props> {
  return (
    <div
      className={clsx(
        'relative bg-transparent',
        {
          'size-12 rounded-2xl': size === 'small',
          'size-12 rounded-2xl md:size-16 md:rounded-[24px]': size === 'medium',
          'size-12 rounded-2xl md:size-16 md:rounded-[24px] lg:size-20 lg:rounded-[28px]': size === 'large',
        },
        className,
      )}
    >
      <Image src={data.icon} alt={data.name} fill className='bg-transparent' />
    </div>
  );
}
